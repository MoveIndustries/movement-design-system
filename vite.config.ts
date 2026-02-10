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
});
