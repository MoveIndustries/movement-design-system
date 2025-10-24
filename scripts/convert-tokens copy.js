#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Helper function to convert kebab-case to camelCase
function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

// Helper function to convert snake_case to camelCase
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

// Helper function to normalize key names
function normalizeKey(key) {
  return snakeToCamel(kebabToCamel(key));
}

// Helper function to convert token value to TypeScript format
function convertTokenValue(value, type) {
  if (typeof value === 'string') {
    // Handle references like "{colors.neutrals.black}"
    if (value.startsWith('{') && value.endsWith('}')) {
      return value;
    }
    // Handle expressions like "{dimension.xs} * 2"
    if (value.includes('*')) {
      return value;
    }
    // Handle simple values
    return `"${value}"`;
  }
  return JSON.stringify(value);
}

// Helper function to convert token object to TypeScript
function convertTokenToTS(token, key) {
  const normalizedKey = normalizeKey(key);
  
  if (token.$type && token.$value !== undefined) {
    // Semantic token format
    return `  ${normalizedKey}: { value: ${convertTokenValue(token.$value, token.$type)} }`;
  } else if (token.type && token.value !== undefined) {
    // Core token format
    return `  ${normalizedKey}: { value: ${convertTokenValue(token.value, token.type)} }`;
  } else if (typeof token === 'object' && token !== null) {
    // Nested object
    const nestedTokens = Object.entries(token)
      .map(([nestedKey, nestedToken]) => convertTokenToTS(nestedToken, nestedKey))
      .join(',\n');
    return `  ${normalizedKey}: {\n${nestedTokens}\n  }`;
  }
  
  return `  ${normalizedKey}: ${JSON.stringify(token)}`;
}

// Function to convert colors to TypeScript
function convertColorsToTS(colorsData) {
  const colorEntries = Object.entries(colorsData)
    .map(([key, value]) => {
      const normalizedKey = kebabToCamel(key);
      if (typeof value === 'object' && value !== null) {
        const colorShades = Object.entries(value)
          .map(([shade, shadeValue]) => {
            if (shadeValue.$value) {
              return `    ${shade}: { value: "${shadeValue.$value}" }`;
            }
            return `    ${shade}: { value: "${shadeValue}" }`;
          })
          .join(',\n');
        return `  ${normalizedKey}: {\n${colorShades}\n  }`;
      }
      return `  ${normalizedKey}: { value: "${value}" }`;
    })
    .join(',\n');

  return `import { Tokens } from "@pandacss/dev";

export const colors = {
${colorEntries}
} satisfies Tokens["colors"];`;
}

// Function to convert scales to TypeScript
function convertScalesToTS(scalesData) {
  const scaleEntries = Object.entries(scalesData)
    .map(([key, value]) => {
      const normalizedKey = kebabToCamel(key);
      if (typeof value === 'object' && value !== null) {
        const scaleValues = Object.entries(value)
          .map(([scaleKey, scaleValue]) => {
            if (scaleValue.value) {
              return `    ${scaleKey}: { value: ${convertTokenValue(scaleValue.value, scaleValue.type)} }`;
            } else if (scaleValue.$value) {
              return `    ${scaleKey}: { value: ${convertTokenValue(scaleValue.$value, scaleValue.$type)} }`;
            }
            return `    ${scaleKey}: { value: "${scaleValue}" }`;
          })
          .join(',\n');
        return `  ${normalizedKey}: {\n${scaleValues}\n  }`;
      }
      return `  ${normalizedKey}: { value: "${value}" }`;
    })
    .join(',\n');

  return `import { Tokens } from "@pandacss/dev";

export const spacing = {
${scaleEntries}
} satisfies Tokens["spacing"];

export const sizes = {
  ...spacing,
  prose: { value: "65ch" },
  full: { value: "100%" },
  min: { value: "min-content" },
  max: { value: "max-content" },
  fit: { value: "fit-content" },
} satisfies Tokens["sizes"];

export const radii = {
  0: { value: "0px" },
  50: { value: "2px" },
  100: { value: "4px" },
  200: { value: "6px" },
  300: { value: "8px" },
  400: { value: "12px" },
  full: { value: "9999px" },
} satisfies Tokens["radii"];

export const borderWidths = {
  0: { value: "0px" },
  1: { value: "1px" },
  2: { value: "2px" },
  4: { value: "4px" },
  8: { value: "8px" },
} satisfies Tokens["borderWidths"];

export const zIndex = {
  hide: { value: -1 },
  auto: { value: "auto" },
  base: { value: 0 },
  docked: { value: 10 },
  dropdown: { value: 1000 },
  sticky: { value: 1100 },
  banner: { value: 1200 },
  overlay: { value: 1300 },
  modal: { value: 1400 },
  popover: { value: 1500 },
  skipLink: { value: 1600 },
  toast: { value: 1700 },
  tooltip: { value: 1800 },
} satisfies Tokens["zIndex"];`;
}

// Function to convert text tokens to TypeScript
function convertTextToTS(coreData) {
  // Extract typography-related tokens
  const typographyTokens = {};
  
  // Look for typography, font, or text related tokens
  Object.entries(coreData).forEach(([key, value]) => {
    if (key.includes('typography') || key.includes('font') || key.includes('text')) {
      typographyTokens[key] = value;
    }
  });

  if (Object.keys(typographyTokens).length === 0) {
    // Create default typography tokens if none found
    return `import { Tokens } from "@pandacss/dev";

export const fonts = {
  sans: { value: "var(--font-sans), system-ui, sans-serif" },
  mono: { value: "var(--font-mono), monospace" },
} satisfies Tokens["fonts"];

export const fontSizes = {
  xs: { value: "0.75rem" },
  sm: { value: "0.875rem" },
  base: { value: "1rem" },
  lg: { value: "1.125rem" },
  xl: { value: "1.25rem" },
  "2xl": { value: "1.5rem" },
  "3xl": { value: "1.875rem" },
  "4xl": { value: "2.25rem" },
  "5xl": { value: "3rem" },
  "6xl": { value: "3.75rem" },
  "7xl": { value: "4.5rem" },
  "8xl": { value: "6rem" },
  "9xl": { value: "8rem" },
} satisfies Tokens["fontSizes"];

export const fontWeights = {
  thin: { value: "100" },
  extralight: { value: "200" },
  light: { value: "300" },
  normal: { value: "400" },
  medium: { value: "500" },
  semibold: { value: "600" },
  bold: { value: "700" },
  extrabold: { value: "800" },
  black: { value: "900" },
} satisfies Tokens["fontWeights"];

export const lineHeights = {
  none: { value: "1" },
  tight: { value: "1.25" },
  snug: { value: "1.375" },
  normal: { value: "1.5" },
  relaxed: { value: "1.625" },
  loose: { value: "2" },
} satisfies Tokens["lineHeights"];`;
  }

  const textEntries = Object.entries(typographyTokens)
    .map(([key, value]) => convertTokenToTS(value, key))
    .join(',\n');

  return `import { Tokens } from "@pandacss/dev";

export const ${Object.keys(typographyTokens)[0]} = {
${textEntries}
} satisfies Tokens["${Object.keys(typographyTokens)[0]}"];`;
}

// Function to convert semantic tokens to TypeScript
function convertSemanticToTS(semanticData, name) {
  const semanticEntries = Object.entries(semanticData)
    .map(([key, value]) => convertTokenToTS(value, key))
    .join(',\n');

  return `import { SemanticTokens } from "@pandacss/dev";

export const semantic${name.charAt(0).toUpperCase() + name.slice(1)} = {
${semanticEntries}
} satisfies SemanticTokens["colors"];`;
}

// Main conversion function
function convertTokens() {
  try {
    const tokensDir = join(__dirname, '../src/movement-preset/tokens');
    const outputDir = join(__dirname, '../src/movement-preset');
    
    // Read JSON files
    const coreData = JSON.parse(readFileSync(join(tokensDir, 'core.json'), 'utf8'));
    const semanticLabsData = JSON.parse(readFileSync(join(tokensDir, 'semantic_labs.json'), 'utf8'));
    const semanticIndustriesData = JSON.parse(readFileSync(join(tokensDir, 'semantic_industries.json'), 'utf8'));
    
    // Convert colors
    if (coreData.colors) {
      const colorsTS = convertColorsToTS(coreData.colors);
      writeFileSync(join(outputDir, 'colors.ts'), colorsTS);
      console.log('✅ Generated colors.ts');
    }
    
    // Convert scales (spacing, sizes, radii, etc.)
    const scalesData = {};
    ['spacing', 'sizes', 'radii', 'borderWidths', 'zIndex', 'dimension'].forEach(category => {
      if (coreData[category]) {
        scalesData[category] = coreData[category];
      }
    });
    
    if (Object.keys(scalesData).length > 0) {
      const scalesTS = convertScalesToTS(scalesData);
      writeFileSync(join(outputDir, 'scales.ts'), scalesTS);
      console.log('✅ Generated scales.ts');
    }
    
    // Convert text tokens
    const textTS = convertTextToTS(coreData);
    writeFileSync(join(outputDir, 'text.ts'), textTS);
    console.log('✅ Generated text.ts');
    
    // Convert semantic tokens
    const semanticLabsTS = convertSemanticToTS(semanticLabsData, 'labs');
    writeFileSync(join(outputDir, 'semantic-labs.ts'), semanticLabsTS);
    console.log('✅ Generated semantic-labs.ts');
    
    const semanticIndustriesTS = convertSemanticToTS(semanticIndustriesData, 'industries');
    writeFileSync(join(outputDir, 'semantic-industries.ts'), semanticIndustriesTS);
    console.log('✅ Generated semantic-industries.ts');
    
    console.log('\n🎉 Token conversion completed successfully!');
    console.log('\n📁 Generated files:');
    console.log('  - src/movement-preset/colors.ts');
    console.log('  - src/movement-preset/scales.ts');
    console.log('  - src/movement-preset/text.ts');
    console.log('  - src/movement-preset/semantic-labs.ts');
    console.log('  - src/movement-preset/semantic-industries.ts');
    
  } catch (error) {
    console.error('❌ Error converting tokens:', error.message);
    process.exit(1);
  }
}

// Run the conversion
convertTokens(); 