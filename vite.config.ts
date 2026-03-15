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
      if (process.env.STORYBOOK === "true") {
        return;
      }

      // Use process.cwd() for reliable path resolution (dirname can be wrong when vite compiles config to temp dir)
      const projectRoot = process.cwd();
      const filesToCopy = [
        { src: "src/theme.css", dest: "dist/theme.css", name: "theme.css" },
        { src: "src/fonts.css", dest: "dist/fonts.css", name: "fonts.css" },
        {
          src: "src/recipes.css",
          dest: "dist/recipes.css",
          name: "recipes.css",
        },
      ];

      filesToCopy.forEach(({ src, dest, name }) => {
        const srcPath = resolve(projectRoot, src);
        const destPath = resolve(projectRoot, dest);
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`✓ Copied ${name} to dist/`);
        }
      });
    },
  };
}

// Check if we're building the library (not Storybook dev)
const isLibBuild = process.env.npm_lifecycle_event === "build";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    // Only include Tailwind plugin for dev/Storybook, NOT for library builds
    // Library consumers will use their own Tailwind build
    ...(isLibBuild ? [] : [tailwindcss()]),
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
        "lucide-react",
        "recharts",
        "sonner",
        "vaul",
        "cmdk",
        "embla-carousel-react",
        "react-day-picker",
        "date-fns",
        "input-otp",
        "react-hook-form",
        "@hookform/resolvers",
        "zod",
        "@moveindustries/wallet-adapter-react",
        /^@moveindustries\//,
        "tailwindcss",
        "next-themes",
        "react-resizable-panels",
      ],
    },
  },
});
