/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import dts from "vite-plugin-dts";
import fs from "fs";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Plugin to copy theme files to dist (only runs during library build, not Storybook)
function copyThemePlugin() {
  return {
    name: "copy-theme",
    closeBundle() {
      // Skip during Storybook builds - these files are only needed for the npm package
      // Check multiple indicators since STORYBOOK env var may not always be set
      if (
        process.env.STORYBOOK === "true" ||
        process.env.npm_lifecycle_event === "build-storybook" ||
        process.env.npm_lifecycle_script?.includes("storybook")
      ) {
        return;
      }

      // Use process.cwd() for reliable path resolution (dirname can be wrong when vite compiles config to temp dir)
      const projectRoot = process.cwd();
      const filesToCopy = [
        { src: "src/theme.css", dest: "dist/theme.css", name: "theme.css" },
        {
          src: "src/recipes.css",
          dest: "dist/recipes.css",
          name: "recipes.css",
        },
        {
          src: "src/brand-faces.css",
          dest: "dist/brand-faces.css",
          name: "brand-faces.css",
        },
      ];

      filesToCopy.forEach(({ src, dest, name }) => {
        const srcPath = resolve(projectRoot, src);
        const destPath = resolve(projectRoot, dest);
        try {
          if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`✓ Copied ${name} to dist/`);
          }
        } catch {
          // Silently ignore copy failures (e.g., during Storybook builds)
        }
      });

      // Ship dist/fonts.css with the @font-face inlined (not the nested @import
      // src uses), so the /fonts entry resolves without a relative import.
      try {
        const facesPath = resolve(projectRoot, "src/brand-faces.css");
        const fontsSrcPath = resolve(projectRoot, "src/fonts.css");
        const fontsDest = resolve(projectRoot, "dist/fonts.css");
        if (fs.existsSync(facesPath) && fs.existsSync(fontsSrcPath)) {
          const faces = fs.readFileSync(facesPath, "utf8");
          const fontsSrc = fs
            .readFileSync(fontsSrcPath, "utf8")
            .replace(/@import\s+["']\.\/brand-faces\.css["'];?[^\n]*\n?/g, "");
          fs.writeFileSync(fontsDest, `${faces}\n${fontsSrc}`);
          console.log("✓ Generated flat dist/fonts.css (inlined @font-face)");
        }
      } catch {
        // Silently ignore (e.g., during Storybook builds)
      }

      // Append the brand @font-face to the bundle so consumers get the faces
      // without a separate /fonts import. Appended raw (not @import-ed from
      // index.css) to keep url()s external instead of base64-inlined.
      try {
        const facesPath = resolve(projectRoot, "src/brand-faces.css");
        const bundlePath = resolve(
          projectRoot,
          "dist/movement-design-system.css",
        );
        if (fs.existsSync(facesPath) && fs.existsSync(bundlePath)) {
          const faces = fs.readFileSync(facesPath, "utf8");
          const bundle = fs.readFileSync(bundlePath, "utf8");
          if (!bundle.includes("Movement brand @font-face")) {
            fs.writeFileSync(bundlePath, `${bundle}\n${faces}`);
            console.log("✓ Appended brand @font-face to component-styles bundle");
          }
        }
      } catch {
        // Silently ignore (e.g., during Storybook builds)
      }

      // Copy brand font assets so dist/fonts.css url('./assets/fonts/...') resolves
      try {
        const fontsSrc = resolve(projectRoot, "src/assets/fonts");
        const fontsDest = resolve(projectRoot, "dist/assets/fonts");
        if (fs.existsSync(fontsSrc)) {
          fs.cpSync(fontsSrc, fontsDest, { recursive: true });
          console.log("✓ Copied font assets to dist/assets/fonts");
        }
      } catch {
        // Silently ignore copy failures (e.g., during Storybook builds)
      }
    },
  };
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    // Include Tailwind for all builds - CSS must be pre-compiled for consumers
    tailwindcss(),
    dts({
      tsconfigPath: "tsconfig.build.json",
    }),
    copyThemePlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
  build: {
    // Don't inline any assets (especially fonts) as base64
    assetsInlineLimit: 0,
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        carousel: resolve(__dirname, "src/carousel.ts"),
        drawer: resolve(__dirname, "src/drawer.ts"),
        wallet: resolve(__dirname, "src/wallet.ts"),
      },
      name: "movement-design-system",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        /^@radix-ui\//,
        /^@phosphor-icons\//,
        // lucide-react is intentionally NOT external: it's a stateless leaf
        // icon lib, so we bundle the handful of icons we use (tree-shaken via
        // its `sideEffects:false`). This makes the DS self-contained for icons
        // — consumers never hit a lucide-react peer/version conflict.
        "sonner",
        "tailwindcss",
        "next-themes",
        "@moveindustries/wallet-adapter-react",
      ],
    },
  },
});
