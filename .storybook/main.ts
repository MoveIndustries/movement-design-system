import type { StorybookConfig } from '@storybook/react-vite';
import fs from 'node:fs';
import path from 'node:path';

/**
 * The mobile deeplink adapter is not a dependency of this library — it belongs
 * to the consuming app — but the MobileDeeplinkLive story drives the real one.
 * Alias it to the linked package when present, and to a stub that throws a
 * useful message when not, so the build succeeds on a fresh clone and the
 * failure stays inside the one story that needs it.
 */
const DEEPLINK_ADAPTER = '@moveindustries/wallet-adapter-deeplink';

function resolveDeeplinkAdapter(): string {
  const linked = path.resolve(
    process.cwd(),
    'node_modules',
    DEEPLINK_ADAPTER,
    'dist/index.js',
  );
  return fs.existsSync(linked)
    ? linked
    : path.resolve(process.cwd(), '.storybook/deeplink-stub.ts');
}

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.dedupe = ['react', 'react-dom', '@mdx-js/react'];
    // Vite accepts either form for resolve.alias. Spreading the array form
    // into an object yields {0: …, 1: …} and the alias stops applying with no
    // error, so keep whichever form Storybook handed over.
    const alias = config.resolve.alias;
    config.resolve.alias = Array.isArray(alias)
      ? [...alias, { find: DEEPLINK_ADAPTER, replacement: resolveDeeplinkAdapter() }]
      : {
          ...(alias as Record<string, string> | undefined),
          [DEEPLINK_ADAPTER]: resolveDeeplinkAdapter(),
        };

    // Polyfill process.env for wallet adapter dependencies that use Node.js globals
    config.define = {
      ...config.define,
      'process.env': {},
    };

    return config;
  }
};
export default config;