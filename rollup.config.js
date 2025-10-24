import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
import alias from "@rollup/plugin-alias";
import packageJson from "./package.json" with { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      alias({
        entries: [
          { find: 'styled-system/css', replacement: './styled-system/css/index.mjs' },
          { find: 'styled-system/patterns', replacement: './styled-system/patterns/index.mjs' },
          { find: 'styled-system/tokens', replacement: './styled-system/tokens/index.mjs' }
        ]
      }),
      resolve({
        preferBuiltins: false,
        browser: true
      }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      postcss({
        extensions: ['.css']
      }),
      copy({
        targets: [
          { src: 'styled-system/**/*', dest: 'dist/styled-system' }
        ]
      })
    ]
  },
  {
    input: "src/movement-preset/index.ts",
    output: [
      {
        file: "dist/movement-preset/index.js",
        format: "cjs",
        sourcemap: true
      },
      {
        file: "dist/movement-preset/index.esm.js",
        format: "esm",
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      alias({
        entries: [
          { find: 'styled-system/css', replacement: './styled-system/css/index.mjs' },
          { find: 'styled-system/patterns', replacement: './styled-system/patterns/index.mjs' },
          { find: 'styled-system/tokens', replacement: './styled-system/tokens/index.mjs' }
        ]
      }),
      resolve({
        preferBuiltins: false,
        browser: true
      }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
      copy({
        targets: [
          { src: 'styled-system/**/*', dest: 'dist/styled-system' },
          { src: 'src/components', dest: 'dist/src' }
        ]
      })
    ]
  }
];
