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

// Helper function to extract numeric value from string
function extractNumericValue(value) {
  const match = value.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

// Helper function to extract unit from string
function extractUnit(value) {
  const match = value.match(/[a-z%]+$/i);
  return match ? match[0] : 'px';
}

// Helper function to resolve dimension references and compute literal values
function resolveDimensionValue(value, dimensionTokens) {
  if (typeof value !== 'string') return value;
  
  // Handle direct pixel values
  if (value.match(/^\d+px$/)) {
    return value;
  }
  
  // Handle references like "{dimension.xs}"
  const refMatch = value.match(/\{dimension\.(\w+)\}/);
  if (refMatch) {
    const refKey = refMatch[1];
    const refToken = dimensionTokens[refKey];
    if (refToken && refToken.value) {
      return resolveDimensionValue(refToken.value, dimensionTokens);
    }
  }
  
  // Handle expressions like "{dimension.xs} * 2"
  const exprMatch = value.match(/\{dimension\.(\w+)\}\s*\*\s*(\d+)/);
  if (exprMatch) {
    const refKey = exprMatch[1];
    const multiplier = parseInt(exprMatch[2]);
    const refToken = dimensionTokens[refKey];
    if (refToken && refToken.value) {
      const resolvedValue = resolveDimensionValue(refToken.value, dimensionTokens);
      const numericValue = extractNumericValue(resolvedValue);
      const unit = extractUnit(resolvedValue);
      return `${numericValue * multiplier}${unit}`;
    }
  }
  
  // Handle expressions like "{dimension.xs} * {dimension.scale}"
  const scaleMatch = value.match(/\{dimension\.(\w+)\}\s*\*\s*\{dimension\.(\w+)\}/);
  if (scaleMatch) {
    const refKey = scaleMatch[1];
    const scaleKey = scaleMatch[2];
    const refToken = dimensionTokens[refKey];
    const scaleToken = dimensionTokens[scaleKey];
    
    if (refToken && refToken.value && scaleToken && scaleToken.value) {
      const resolvedRef = resolveDimensionValue(refToken.value, dimensionTokens);
      const resolvedScale = resolveDimensionValue(scaleToken.value, dimensionTokens);
      const refNumeric = extractNumericValue(resolvedRef);
      const scaleNumeric = extractNumericValue(resolvedScale);
      const unit = extractUnit(resolvedRef);
      return `${refNumeric * scaleNumeric}${unit}`;
    }
  }
  
  return value;
}

// Helper function to compute all dimension values
function computeDimensionValues(dimensionTokens) {
  const computed = {};
  
  // First, find the base scale value
  let baseScale = 2; // default
  if (dimensionTokens.scale && dimensionTokens.scale.value) {
    const scaleValue = dimensionTokens.scale.value;
    const scaleMatch = scaleValue.match(/(\d+)px/);
    if (scaleMatch) {
      baseScale = parseInt(scaleMatch[1]);
    }
  }
  
  // Compute xs first (it's the base unit)
  if (dimensionTokens.xs && dimensionTokens.xs.value) {
    const xsValue = dimensionTokens.xs.value;
    if (xsValue.includes('{dimension.scale} * 2')) {
      computed.xs = `${baseScale * 2}px`;
    } else if (xsValue.includes('{dimension.scale}')) {
      computed.xs = `${baseScale}px`;
    } else {
      computed.xs = xsValue;
    }
  }
  
  // Compute other dimension values based on the scale system
  Object.entries(dimensionTokens).forEach(([key, token]) => {
    if (key === 'scale' || key === 'xs') return; // already handled
    
    if (token.value) {
      let resolvedValue = token.value;
      
      // Replace scale reference
      resolvedValue = resolvedValue.replace(/\{dimension\.scale\}/g, `${baseScale}px`);
      
      // Replace xs reference
      if (computed.xs) {
        resolvedValue = resolvedValue.replace(/\{dimension\.xs\}/g, computed.xs);
      }
      
      // Handle expressions like "{dimension.xs} * 3"
      const exprMatch = resolvedValue.match(/(\d+px)\s*\*\s*(\d+)/);
      if (exprMatch) {
        const baseValue = parseInt(exprMatch[1]);
        const multiplier = parseInt(exprMatch[2]);
        computed[key] = `${baseValue * multiplier}px`;
      } else if (resolvedValue.includes('{dimension.sm}')) {
        // sm = xs * scale
        const xsValue = parseInt(computed.xs);
        computed[key] = `${xsValue * baseScale}px`;
      } else if (resolvedValue.includes('{dimension.md}')) {
        // md = sm * scale
        const smValue = parseInt(computed.xs) * baseScale;
        computed[key] = `${smValue * baseScale}px`;
      } else if (resolvedValue.includes('{dimension.lg}')) {
        // lg = md * scale
        const mdValue = parseInt(computed.xs) * baseScale * baseScale;
        computed[key] = `${mdValue * baseScale}px`;
      } else if (resolvedValue.includes('{dimension.xl}')) {
        // xl = lg * scale
        const lgValue = parseInt(computed.xs) * baseScale * baseScale * baseScale;
        computed[key] = `${lgValue * baseScale}px`;
      } else if (resolvedValue.match(/^\d+px$/)) {
        // Direct pixel value
        computed[key] = resolvedValue;
      } else if (resolvedValue.match(/^\d+$/)) {
        // Just a number, assume pixels
        computed[key] = `${resolvedValue}px`;
      } else {
        // Fallback
        computed[key] = resolvedValue;
      }
    }
  });
  
  return computed;
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
            if (shadeValue && typeof shadeValue === 'object' && shadeValue.$value) {
              return `    ${shade}: { value: "${shadeValue.$value}" }`;
            } else if (shadeValue && typeof shadeValue === 'object' && shadeValue.value) {
              return `    ${shade}: { value: "${shadeValue.value}" }`;
            } else if (typeof shadeValue === 'string') {
              return `    ${shade}: { value: "${shadeValue}" }`;
            } else if (typeof shadeValue === 'object' && shadeValue !== null) {
              // Handle nested objects like whiteAlpha, blackAlpha
              const nestedEntries = Object.entries(shadeValue)
                .map(([nestedKey, nestedValue]) => {
                  if (nestedValue && typeof nestedValue === 'object' && nestedValue.$value) {
                    return `      ${nestedKey}: { value: "${nestedValue.$value}" }`;
                  } else if (nestedValue && typeof nestedValue === 'object' && nestedValue.value) {
                    return `      ${nestedKey}: { value: "${nestedValue.value}" }`;
                  } else if (typeof nestedValue === 'string') {
                    return `      ${nestedKey}: { value: "${nestedValue}" }`;
                  }
                  return `      ${nestedKey}: { value: "${nestedValue}" }`;
                })
                .join(',\n');
              return `    ${shade}: {\n${nestedEntries}\n    }`;
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

// Function to convert scales to TypeScript with computed values
function convertScalesToTS(scalesData, coreData) {
  // Compute dimension values first
  const computedDimensions = computeDimensionValues(coreData.dimension || {});
  
  // Merge dimension and spacing into a single spacing object
  const mergedSpacing = { ...computedDimensions };
  
  // Add spacing tokens (which reference dimension tokens)
  if (scalesData.spacing) {
    Object.entries(scalesData.spacing).forEach(([key, token]) => {
      if (token.value) {
        // Resolve spacing references to dimension values
        let resolvedValue = token.value;
        Object.entries(computedDimensions).forEach(([dimKey, dimValue]) => {
          const refPattern = new RegExp(`\\{dimension\\.${dimKey}\\}`, 'g');
          resolvedValue = resolvedValue.replace(refPattern, dimValue);
        });
        mergedSpacing[key] = resolvedValue;
      }
    });
  }
  
  // Convert to TypeScript format
  const spacingEntries = Object.entries(mergedSpacing)
    .map(([key, value]) => {
      const normalizedKey = normalizeKey(key);
      return `  ${normalizedKey}: { value: "${value}" }`;
    })
    .join(',\n');

  // Handle border radius
  const borderRadiusEntries = scalesData.borderRadius ? 
    Object.entries(scalesData.borderRadius)
      .map(([key, token]) => {
        const normalizedKey = normalizeKey(key);
        if (token.value) {
          // Add 'px' unit if it's just a number
          const value = token.value.match(/^\d+$/) ? `${token.value}px` : token.value;
          return `  ${normalizedKey}: { value: "${value}" }`;
        }
        return `  ${normalizedKey}: { value: "0px" }`;
      })
      .join(',\n') : '';

  return `import { Tokens } from "@pandacss/dev";

export const spacing = {
${spacingEntries}
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
${borderRadiusEntries || `  0: { value: "0px" },
  50: { value: "2px" },
  100: { value: "4px" },
  200: { value: "6px" },
  300: { value: "8px" },
  400: { value: "12px" },
  full: { value: "9999px" }`}
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
  // Extract all text-related tokens
  const textTokens = {};
  
  // Look for all typography-related tokens
  const typographyCategories = [
    'fontFamilies', 'fontSizes', 'fontStyle', 'lineHeights', 'fontWeights',
    'letterSpacing', 'paragraphSpacing', 'textCase', 'textDecoration', 
    'paragraphIndent', 'Heading', 'Body', 'Mono'
  ];
  
  typographyCategories.forEach(category => {
    if (coreData[category]) {
      textTokens[category] = coreData[category];
    }
  });

  if (Object.keys(textTokens).length === 0) {
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

  // Convert each text token category
  const textExports = [];
  
  Object.entries(textTokens).forEach(([category, tokens]) => {
    const normalizedCategory = kebabToCamel(category);
    const tokenEntries = Object.entries(tokens)
      .map(([key, token]) => {
        const normalizedKey = normalizeKey(key);
        if (token && typeof token === 'object') {
          if (token.$value) {
            return `  ${normalizedKey}: { value: ${convertTokenValue(token.$value, token.$type)} }`;
          } else if (token.value) {
            return `  ${normalizedKey}: { value: ${convertTokenValue(token.value, token.type)} }`;
          } else if (Object.keys(token).length > 0) {
            // Handle nested objects like Heading, Body, Mono
            const nestedEntries = Object.entries(token)
              .map(([nestedKey, nestedToken]) => {
                const normalizedNestedKey = normalizeKey(nestedKey);
                if (nestedToken && typeof nestedToken === 'object' && nestedToken.$value) {
                  return `    ${normalizedNestedKey}: { value: ${convertTokenValue(nestedToken.$value, nestedToken.$type)} }`;
                } else if (nestedToken && typeof nestedToken === 'object' && nestedToken.value) {
                  return `    ${normalizedNestedKey}: { value: ${convertTokenValue(nestedToken.value, nestedToken.type)} }`;
                } else if (typeof nestedToken === 'string') {
                  return `    ${normalizedNestedKey}: { value: "${nestedToken}" }`;
                }
                return `    ${normalizedNestedKey}: { value: "${nestedToken}" }`;
              })
              .join(',\n');
            return `  ${normalizedKey}: {\n${nestedEntries}\n  }`;
          }
        }
        return `  ${normalizedKey}: { value: "${token}" }`;
      })
      .join(',\n');
    
    textExports.push(`export const ${normalizedCategory} = {
${tokenEntries}
} satisfies Tokens["${normalizedCategory}"];`);
  });

  return `import { Tokens } from "@pandacss/dev";

${textExports.join('\n\n')}`;
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
    
    // Convert scales (spacing, sizes, radii, etc.) with computed values
    const scalesData = {};
    ['dimension', 'spacing', 'borderRadius'].forEach(category => {
      if (coreData[category]) {
        scalesData[category] = coreData[category];
      }
    });
    
    if (Object.keys(scalesData).length > 0) {
      const scalesTS = convertScalesToTS(scalesData, coreData);
      writeFileSync(join(outputDir, 'scales.ts'), scalesTS);
      console.log('✅ Generated scales.ts with computed values');
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
    console.log('  - src/movement-preset/scales.ts (with computed values)');
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