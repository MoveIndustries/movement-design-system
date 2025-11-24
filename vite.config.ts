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

// Plugin to copy theme files to dist
function copyThemePlugin() {
  return {
    name: "copy-theme",
    closeBundle() {
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
        const srcPath = resolve(dirname, src);
        const destPath = resolve(dirname, dest);
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath);
          console.log(`✓ Copied ${name} to dist/`);
        }
      });
    },
  };
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
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
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "movement-design-system",
      formats: ["es", "cjs"],
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "@aptos-labs/wallet-adapter-react",
        /^@aptos-labs\//,
        /^@radix-ui\//,
        "tailwindcss",
      ],
    },
  },
  // build: {
  //   lib: {
  //     entry: resolve(dirname, "src/index.ts"),
  //     name: "MovementDesignSystem",
  //     formats: ["es", "cjs"],
  //     fileName: (format) => `index.${format === "es" ? "js" : "cjs"}`,
  //   },
  // rollupOptions: {
  //   external: [
  //     "react",
  //     "react-dom",
  //     "react/jsx-runtime",
  //     "tailwindcss",
  //     "@radix-ui/react-accordion",
  //     "@radix-ui/react-alert-dialog",
  //     "@radix-ui/react-aspect-ratio",
  //     "@radix-ui/react-avatar",
  //     "@radix-ui/react-checkbox",
  //     "@radix-ui/react-collapsible",
  //     "@radix-ui/react-context-menu",
  //     "@radix-ui/react-dialog",
  //     "@radix-ui/react-dropdown-menu",
  //     "@radix-ui/react-hover-card",
  //     "@radix-ui/react-label",
  //     "@radix-ui/react-menubar",
  //     "@radix-ui/react-navigation-menu",
  //     "@radix-ui/react-popover",
  //     "@radix-ui/react-progress",
  //     "@radix-ui/react-radio-group",
  //     "@radix-ui/react-scroll-area",
  //     "@radix-ui/react-select",
  //     "@radix-ui/react-separator",
  //     "@radix-ui/react-slider",
  //     "@radix-ui/react-slot",
  //     "@radix-ui/react-switch",
  //     "@radix-ui/react-tabs",
  //     "@radix-ui/react-toggle",
  //     "@radix-ui/react-toggle-group",
  //     "@radix-ui/react-tooltip",
  //     "class-variance-authority",
  //     "clsx",
  //     "tailwind-merge",
  //     "lucide-react",
  //     "cmdk",
  //     "date-fns",
  //     "embla-carousel-react",
  //     "input-otp",
  //     "next-themes",
  //     "react-day-picker",
  //     "react-hook-form",
  //     "react-resizable-panels",
  //     "recharts",
  //     "sonner",
  //     "vaul",
  //     "zod",
  //     "@hookform/resolvers",
  //   ],
  //   output: {
  //     globals: {
  //       react: "React",
  //       "react-dom": "ReactDOM",
  //       "react/jsx-runtime": "jsxRuntime",
  //     },
  //     assetFileNames: (assetInfo) => {
  //       if (assetInfo.name === "style.css") return "style.css";
  //       return assetInfo.name || "";
  //     },
  //   },
  // },
  // sourcemap: true,
  // emptyOutDir: true,
  // },
});
