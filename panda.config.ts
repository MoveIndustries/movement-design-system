import { defineConfig } from "@pandacss/dev";
import * as tokens from "./packages/tokens/tokens.json";

export default defineConfig({
  preflight: true,
  include: ["./packages/components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      tokens: {
        ...tokens,
        fontSizes: {
          h1: { value: '48px' },
          h2: { value: '40px' },
          h3: { value: '32px' },
          h4: { value: '24px' },
          h5: { value: '20px' },
          h6: { value: '18px' },
          body: { value: '16px' },
          sm: { value: '14px' },
          xs: { value: '12px' }
        }
      }
    }
  },
  jsxFramework: "react",
  outdir: "styled-system",
});
