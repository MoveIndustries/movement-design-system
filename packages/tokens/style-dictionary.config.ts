/**
 * Style Dictionary Config (TypeScript)
 * 
 * This configuration file sets up Style Dictionary to:
 * 1. Read design tokens from alltokens.json
 * 2. Transform them into a format that can be used by Style Dictionary
 * 3. Generate CSS variables and semantic HTML element styles
 */

import StyleDictionary from 'style-dictionary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types for token structure
interface TokenValue {
  value: string;
  type?: string;
  description?: string;
}

interface TokenSet {
  core?: {
    color?: Record<string, Record<string, TokenValue>>;
    space?: Record<string, TokenValue>;
    dimension?: Record<string, TokenValue>;
    typography?: {
      font?: {
        family?: Record<string, TokenValue>;
        size?: Record<string, TokenValue>;
        weight?: Record<string, TokenValue>;
      }
    }
  };
  semantic?: {
    color?: Record<string, Record<string, TokenValue>>;
    space?: Record<string, TokenValue>;
  };
  components?: Record<string, Record<string, TokenValue | Record<string, TokenValue>>>;
}

interface StyleDictionaryTokens {
  color?: Record<string, Record<string, string>>;
  spacing?: Record<string, string>;
  font?: {
    family?: Record<string, string>;
    size?: Record<string, string>;
    weight?: Record<string, string>;
  };
  semantic?: {
    color?: Record<string, Record<string, string>>;
    spacing?: Record<string, string>;
  };
  component?: Record<string, Record<string, string | Record<string, string>>>;
}

// Custom format for CSS that includes semantic HTML elements
StyleDictionary.registerFormat({
  name: 'css/variables-with-semantic-elements',
  format: function({ dictionary, platform, options }) {
    // Start with CSS variables
    let cssString = ':root {\n';
    
    // Add all token variables
    dictionary.allTokens.forEach(prop => {
      cssString += `  ${prop.name}: ${prop.value};\n`;
    });
    
    cssString += '}\n\n';
    
    // Add semantic HTML element styles
    cssString += '/* Semantic HTML Element Styles */\n\n';
    
    // Typography styles for headings
    const fontFamilies = dictionary.allTokens.filter(prop => prop.name.includes('font-family'));
    const fontSizes = dictionary.allTokens.filter(prop => prop.name.includes('font-size'));
    const fontWeights = dictionary.allTokens.filter(prop => prop.name.includes('font-weight'));
    const colors = dictionary.allTokens.filter(prop => prop.name.includes('color'));
    const spacing = dictionary.allTokens.filter(prop => prop.name.includes('space'));
    
    // Base text color and font family
    const baseTextColor = colors.find(c => c.name.includes('foreground') || c.name.includes('text-primary')) || 
                          colors.find(c => c.name.includes('black')) || 
                          { name: '--semantic-foreground-base' };
    
    const baseFontFamily = fontFamilies.find(f => f.name.includes('base') || f.name.includes('primary')) || 
                           fontFamilies[0] || 
                           { name: '--font-family-base' };
    
    // Body styles
    cssString += `body {\n`;
    cssString += `  font-family: var(${baseFontFamily.name});\n`;
    cssString += `  color: var(${baseTextColor.name});\n`;
    cssString += `  line-height: 1.5;\n`;
    cssString += `  margin: 0;\n`;
    cssString += `  padding: 0;\n`;
    cssString += `}\n\n`;
    
    // Heading styles (h1-h6)
    const headingSizes = fontSizes
      .filter(s => s.name.includes('heading') || s.name.includes('title') || s.name.includes('display'))
      .sort((a, b) => {
        // Extract numbers from names to sort by size
        const aNum = parseInt(a.name.match(/\\d+/)?.[0] || '0');
        const bNum = parseInt(b.name.match(/\\d+/)?.[0] || '0');
        return bNum - aNum; // Descending order
      });
    
    // If we don't have specific heading sizes, use the largest font sizes
    const sortedSizes = headingSizes.length >= 6 ? 
      headingSizes : 
      fontSizes.sort((a, b) => {
        // Try to extract numeric values from the font size values
        const aValue = parseFloat(a.value.replace(/[^0-9.]/g, ''));
        const bValue = parseFloat(b.value.replace(/[^0-9.]/g, ''));
        return bValue - aValue; // Descending order
      });
    
    // Get heading font family if available
    const headingFontFamily = fontFamilies.find(f => f.name.includes('heading') || f.name.includes('display')) || baseFontFamily;
    
    // Get heading font weight if available
    const headingFontWeight = fontWeights.find(w => w.name.includes('bold') || w.name.includes('heading')) || 
                             fontWeights.find(w => parseInt(w.value) >= 600) || 
                             { name: '--font-weight-bold' };
    
    // Heading color
    const headingColor = colors.find(c => c.name.includes('heading')) || baseTextColor;
    
    // Generate styles for h1-h6
    for (let i = 1; i <= 6; i++) {
      const fontSize = sortedSizes[i - 1] || sortedSizes[0];
      
      cssString += `h${i} {\n`;
      cssString += `  font-family: var(${headingFontFamily.name});\n`;
      cssString += `  font-weight: var(${headingFontWeight.name});\n`;
      cssString += `  color: var(${headingColor.name});\n`;
      
      if (fontSize) {
        cssString += `  font-size: var(${fontSize.name});\n`;
      }
      
      // Add appropriate margins based on heading level
      const marginBottom = spacing.find(s => s.name.includes(`${i}`) || s.name.includes('md')) || 
                          spacing.find(s => s.name.includes('medium')) || 
                          { name: '--space-4' };
      
      cssString += `  margin-top: 0;\n`;
      cssString += `  margin-bottom: var(${marginBottom.name});\n`;
      cssString += `}\n\n`;
    }
    
    // Paragraph styles
    const bodyFontSize = fontSizes.find(s => s.name.includes('body') || s.name.includes('paragraph') || s.name.includes('text')) || 
                         fontSizes.find(s => s.name.includes('base') || s.name.includes('medium')) || 
                         { name: '--font-size-base' };
    
    cssString += `p {\n`;
    cssString += `  font-size: var(${bodyFontSize.name});\n`;
    cssString += `  margin-top: 0;\n`;
    
    const paragraphMargin = spacing.find(s => s.name.includes('paragraph') || s.name.includes('text')) || 
                           spacing.find(s => s.name.includes('md')) || 
                           { name: '--space-4' };
    
    cssString += `  margin-bottom: var(${paragraphMargin.name});\n`;
    cssString += `}\n\n`;
    
    // Link styles
    const primaryColor = colors.find(c => c.name.includes('primary')) || 
                         colors.find(c => c.name.includes('link')) || 
                         { name: '--semantic-primary-base' };
    
    const primaryHoverColor = colors.find(c => c.name.includes('primary') && c.name.includes('hover')) || 
                             colors.find(c => c.name.includes('primary') && c.name.includes('dark')) || 
                             { name: '--semantic-primary-darken' };
    
    cssString += `a {\n`;
    cssString += `  color: var(${primaryColor.name});\n`;
    cssString += `  text-decoration: none;\n`;
    cssString += `}\n\n`;
    
    cssString += `a:hover, a:focus {\n`;
    cssString += `  color: var(${primaryHoverColor.name});\n`;
    cssString += `  text-decoration: underline;\n`;
    cssString += `}\n\n`;
    
    // Button styles
    const buttonBg = colors.find(c => c.name.includes('button') && c.name.includes('bg')) || 
                    colors.find(c => c.name.includes('primary')) || 
                    { name: '--semantic-primary-base' };
    
    const buttonText = colors.find(c => c.name.includes('button') && c.name.includes('text')) || 
                      colors.find(c => c.name.includes('white') || c.name.includes('light')) || 
                      { name: '--color-white' };
    
    const buttonHoverBg = colors.find(c => c.name.includes('button') && c.name.includes('hover')) || 
                         colors.find(c => c.name.includes('primary') && c.name.includes('dark')) || 
                         { name: '--semantic-primary-darken' };
    
    const buttonPadding = spacing.find(s => s.name.includes('button')) || 
                         { name: '--space-2' };
    
    const buttonBorderRadius = dictionary.allTokens.find(p => p.name.includes('radius') && p.name.includes('button')) || 
                              dictionary.allTokens.find(p => p.name.includes('radius')) || 
                              { name: '--border-radius-md', value: '4px' };
    
    cssString += `button, .button, input[type="button"], input[type="submit"] {\n`;
    cssString += `  font-family: var(${baseFontFamily.name});\n`;
    cssString += `  background-color: var(${buttonBg.name});\n`;
    cssString += `  color: var(${buttonText.name});\n`;
    cssString += `  border: none;\n`;
    cssString += `  padding: var(${buttonPadding.name});\n`;
    cssString += `  border-radius: ${buttonBorderRadius.value};\n`;
    cssString += `  cursor: pointer;\n`;
    cssString += `  font-weight: var(${headingFontWeight.name});\n`;
    cssString += `  transition: background-color 0.2s ease-in-out;\n`;
    cssString += `}\n\n`;
    
    cssString += `button:hover, .button:hover, input[type="button"]:hover, input[type="submit"]:hover {\n`;
    cssString += `  background-color: var(${buttonHoverBg.name});\n`;
    cssString += `}\n\n`;
    
    // Input styles
    const inputBorder = colors.find(c => c.name.includes('input') && c.name.includes('border')) || 
                       colors.find(c => c.name.includes('border')) || 
                       { name: '--semantic-border-base' };
    
    const inputBg = colors.find(c => c.name.includes('input') && c.name.includes('bg')) || 
                   colors.find(c => c.name.includes('background')) || 
                   { name: '--semantic-background-base' };
    
    cssString += `input, select, textarea {\n`;
    cssString += `  font-family: var(${baseFontFamily.name});\n`;
    cssString += `  font-size: var(${bodyFontSize.name});\n`;
    cssString += `  padding: var(${buttonPadding.name});\n`;
    cssString += `  border: 1px solid var(${inputBorder.name});\n`;
    cssString += `  background-color: var(${inputBg.name});\n`;
    cssString += `  border-radius: ${buttonBorderRadius.value};\n`;
    cssString += `}\n\n`;
    
    // Strong, em, code styles
    cssString += `strong, b {\n`;
    cssString += `  font-weight: var(${headingFontWeight.name});\n`;
    cssString += `}\n\n`;
    
    const emphasisFontStyle = dictionary.allTokens.find(p => p.name.includes('font-style') && p.name.includes('italic')) || 
                             { name: '--font-style-italic', value: 'italic' };
    
    cssString += `em, i {\n`;
    cssString += `  font-style: ${emphasisFontStyle.value};\n`;
    cssString += `}\n\n`;
    
    const codeBg = colors.find(c => c.name.includes('code') && c.name.includes('bg')) || 
                  colors.find(c => c.name.includes('gray') && c.name.includes('100')) || 
                  { name: '--semantic-background-alt' };
    
    const codeFontFamily = fontFamilies.find(f => f.name.includes('mono') || f.name.includes('code')) || 
                          { name: '--font-family-mono', value: 'monospace' };
    
    cssString += `code, pre {\n`;
    cssString += `  font-family: ${codeFontFamily.value};\n`;
    cssString += `  background-color: var(${codeBg.name});\n`;
    cssString += `  padding: 0.2em 0.4em;\n`;
    cssString += `  border-radius: 3px;\n`;
    cssString += `  font-size: 0.9em;\n`;
    cssString += `}\n\n`;
    
    cssString += `pre {\n`;
    cssString += `  padding: var(${buttonPadding.name});\n`;
    cssString += `  overflow: auto;\n`;
    cssString += `}\n\n`;
    
    // Table styles
    const tableBorder = colors.find(c => c.name.includes('table') && c.name.includes('border')) || 
                       inputBorder;
    
    const tableHeaderBg = colors.find(c => c.name.includes('table') && c.name.includes('header')) || 
                         colors.find(c => c.name.includes('gray') && c.name.includes('100')) || 
                         { name: '--semantic-background-alt' };
    
    cssString += `table {\n`;
    cssString += `  border-collapse: collapse;\n`;
    cssString += `  width: 100%;\n`;
    cssString += `  margin-bottom: var(${paragraphMargin.name});\n`;
    cssString += `}\n\n`;
    
    cssString += `th, td {\n`;
    cssString += `  padding: var(${buttonPadding.name});\n`;
    cssString += `  text-align: left;\n`;
    cssString += `  border: 1px solid var(${tableBorder.name});\n`;
    cssString += `}\n\n`;
    
    cssString += `th {\n`;
    cssString += `  background-color: var(${tableHeaderBg.name});\n`;
    cssString += `  font-weight: var(${headingFontWeight.name});\n`;
    cssString += `}\n\n`;
    
    // List styles
    cssString += `ul, ol {\n`;
    cssString += `  margin-top: 0;\n`;
    cssString += `  margin-bottom: var(${paragraphMargin.name});\n`;
    cssString += `  padding-left: 2em;\n`;
    cssString += `}\n\n`;
    
    cssString += `li {\n`;
    cssString += `  margin-bottom: calc(var(${paragraphMargin.name}) / 2);\n`;
    cssString += `}\n\n`;
    
    // Blockquote styles
    const blockquoteBg = colors.find(c => c.name.includes('blockquote')) || 
                        colors.find(c => c.name.includes('gray') && c.name.includes('50')) || 
                        { name: '--semantic-background-alt' };
    
    const blockquoteBorder = colors.find(c => c.name.includes('blockquote') && c.name.includes('border')) || 
                            primaryColor;
    
    cssString += `blockquote {\n`;
    cssString += `  margin: var(${paragraphMargin.name}) 0;\n`;
    cssString += `  padding: var(${buttonPadding.name}) var(${paragraphMargin.name});\n`;
    cssString += `  border-left: 4px solid var(${blockquoteBorder.name});\n`;
    cssString += `  background-color: var(${blockquoteBg.name});\n`;
    cssString += `}\n\n`;
    
    // HR styles
    const hrColor = colors.find(c => c.name.includes('hr') || c.name.includes('divider')) || 
                   colors.find(c => c.name.includes('border')) || 
                   { name: '--semantic-border-base' };
    
    cssString += `hr {\n`;
    cssString += `  border: 0;\n`;
    cssString += `  height: 1px;\n`;
    cssString += `  background-color: var(${hrColor.name});\n`;
    cssString += `  margin: var(${paragraphMargin.name}) 0;\n`;
    cssString += `}\n\n`;
    
    // Add utility classes
    cssString += '/* Utility Classes */\n';
    
    // Add color utility classes
    colors.forEach(color => {
      const className = color.name.replace('--', '').replace(/\-/g, '-');
      cssString += `.bg-${className} { background-color: var(${color.name}); }\n`;
      cssString += `.text-${className} { color: var(${color.name}); }\n`;
      cssString += `.border-${className} { border-color: var(${color.name}); }\n`;
    });
    
    cssString += '\n';
    
    // Add spacing utility classes
    spacing.forEach(space => {
      const className = space.name.replace('--', '').replace(/\-/g, '-');
      cssString += `.p-${className} { padding: var(${space.name}); }\n`;
      cssString += `.pt-${className} { padding-top: var(${space.name}); }\n`;
      cssString += `.pr-${className} { padding-right: var(${space.name}); }\n`;
      cssString += `.pb-${className} { padding-bottom: var(${space.name}); }\n`;
      cssString += `.pl-${className} { padding-left: var(${space.name}); }\n`;
      cssString += `.px-${className} { padding-left: var(${space.name}); padding-right: var(${space.name}); }\n`;
      cssString += `.py-${className} { padding-top: var(${space.name}); padding-bottom: var(${space.name}); }\n`;
      
      cssString += `.m-${className} { margin: var(${space.name}); }\n`;
      cssString += `.mt-${className} { margin-top: var(${space.name}); }\n`;
      cssString += `.mr-${className} { margin-right: var(${space.name}); }\n`;
      cssString += `.mb-${className} { margin-bottom: var(${space.name}); }\n`;
      cssString += `.ml-${className} { margin-left: var(${space.name}); }\n`;
      cssString += `.mx-${className} { margin-left: var(${space.name}); margin-right: var(${space.name}); }\n`;
      cssString += `.my-${className} { margin-top: var(${space.name}); margin-bottom: var(${space.name}); }\n`;
      
      cssString += `.gap-${className} { gap: var(${space.name}); }\n`;
    });
    
    return cssString;
  }
});

// Custom transform to convert the alltokens.json format to Style Dictionary format
function convertTokensToStyleDictionary(tokens: TokenSet): StyleDictionaryTokens {
  const result: StyleDictionaryTokens = {
    color: {},
    spacing: {},
    font: {
      family: {},
      size: {},
      weight: {}
    }
  };
  
  // Process core tokens
  if (tokens.core) {
    // Process colors
    if (tokens.core.color) {
      result.color = {};
      
      Object.entries(tokens.core.color).forEach(([colorName, colorValues]) => {
        result.color![colorName] = {};
        
        Object.entries(colorValues).forEach(([shade, value]) => {
          if (value && value.value) {
            result.color![colorName][shade] = value.value;
          }
        });
      });
    }
    
    // Process spacing
    if (tokens.core.space) {
      result.spacing = {};
      
      Object.entries(tokens.core.space).forEach(([size, value]) => {
        if (value && value.value) {
          // Resolve references like {dimension.4}
          const resolvedValue = value.value.replace(/\{dimension\.(\d+)\}/, (_, num) => {
            const dimension = tokens.core?.dimension?.[num]?.value;
            return dimension || `${parseInt(num) * 4}px`;
          });
          
          result.spacing[size] = resolvedValue;
        }
      });
    }
    
    // Process typography
    if (tokens.core.typography && tokens.core.typography.font) {
      const font = tokens.core.typography.font;
      
      // Font families
      if (font.family) {
        result.font!.family = {};
        
        Object.entries(font.family).forEach(([name, value]) => {
          if (value && value.value) {
            result.font!.family![name] = value.value;
          }
        });
      }
      
      // Font sizes
      if (font.size) {
        result.font!.size = {};
        
        Object.entries(font.size).forEach(([name, value]) => {
          if (value && value.value) {
            result.font!.size![name] = value.value;
          }
        });
      }
      
      // Font weights
      if (font.weight) {
        result.font!.weight = {};
        
        Object.entries(font.weight).forEach(([name, value]) => {
          if (value && value.value) {
            result.font!.weight![name] = value.value;
          }
        });
      }
    }
  }
  
  // Process semantic tokens
  if (tokens.semantic) {
    // Process semantic colors
    if (tokens.semantic.color) {
      result.semantic = { color: {} };
      
      Object.entries(tokens.semantic.color).forEach(([name, values]) => {
        result.semantic!.color![name] = {};
        
        Object.entries(values).forEach(([state, value]) => {
          if (value && value.value) {
            // Resolve references like {color.moveus-marigold.400}
            const match = value.value.match(/\{color\.(.+)\.(.+)\}/);
            let resolvedValue = value.value;
            
            if (match) {
              const [_, colorName, shade] = match;
              resolvedValue = tokens.core?.color?.[colorName]?.[shade]?.value || '#000000';
            }
            
            result.semantic!.color![name][state] = resolvedValue;
          }
        });
      });
    }
    
    // Process semantic spacing
    if (tokens.semantic.space) {
      if (!result.semantic) result.semantic = {};
      result.semantic.spacing = {};
      
      Object.entries(tokens.semantic.space).forEach(([name, value]) => {
        if (value && value.value) {
          // Resolve references like {dimension.4}
          const resolvedValue = value.value.replace(/\{dimension\.(\d+)\}/, (_, num) => {
            const dimension = tokens.core?.dimension?.[num]?.value;
            return dimension || `${parseInt(num) * 4}px`;
          });
          
          result.semantic.spacing![name] = resolvedValue;
        }
      });
    }
  }
  
  // Process component tokens
  if (tokens.components) {
    result.component = {};
    
    Object.entries(tokens.components).forEach(([componentName, componentValues]) => {
      result.component![componentName] = {};
      
      Object.entries(componentValues).forEach(([propName, value]) => {
        if (value && typeof value === 'object') {
          if ('value' in value && typeof value.value === 'string') {
            // Resolve references
            const resolvedValue = value.value.replace(/\{(.+)\.(.+)\.(.+)\}/, (match, category, name, prop) => {
              if (category === 'color') {
                return tokens.core?.color?.[name]?.[prop]?.value || '#000000';
              }
              return match;
            });
            
            result.component![componentName][propName] = resolvedValue;
          } else {
            // Handle nested component properties
            result.component![componentName][propName] = {};
            
            Object.entries(value as Record<string, TokenValue>).forEach(([stateName, stateValue]) => {
              if (stateName !== 'value' && typeof stateValue === 'object' && 'value' in stateValue) {
                const resolvedValue = stateValue.value.replace(/\{(.+)\.(.+)\.(.+)\}/, (match, category, name, prop) => {
                  if (category === 'color') {
                    return tokens.core?.color?.[name]?.[prop]?.value || '#000000';
                  }
                  return match;
                });
                
                (result.component![componentName][propName] as Record<string, string>)[stateName] = resolvedValue;
              }
            });
          }
        }
      });
    });
  }
  
  return result;
}

// Read the alltokens.json file
const allTokensPath = path.join(__dirname, 'movement-tokens', 'alltokens.json');
const allTokens = JSON.parse(fs.readFileSync(allTokensPath, 'utf8')) as TokenSet[];

// Convert to Style Dictionary format
const sdTokens: StyleDictionaryTokens = {};

// Process each token set in the array
allTokens.forEach((tokenSet, index) => {
  const convertedTokens = convertTokensToStyleDictionary(tokenSet);
  
  // Merge with existing tokens
  Object.entries(convertedTokens).forEach(([category, values]) => {
    if (!sdTokens[category as keyof StyleDictionaryTokens]) {
      sdTokens[category as keyof StyleDictionaryTokens] = {};
    }
    
    Object.entries(values as Record<string, any>).forEach(([key, value]) => {
      if (typeof value === 'object') {
        if (!sdTokens[category as keyof StyleDictionaryTokens][key]) {
          (sdTokens[category as keyof StyleDictionaryTokens] as any)[key] = {};
        }
        
        Object.entries(value).forEach(([subKey, subValue]) => {
          (sdTokens[category as keyof StyleDictionaryTokens] as any)[key][subKey] = subValue;
        });
      } else {
        (sdTokens[category as keyof StyleDictionaryTokens] as any)[key] = value;
      }
    });
  });
});

// Write the converted tokens to a temporary file
const tempTokensPath = path.join(__dirname, 'sd-tokens.json');
fs.writeFileSync(tempTokensPath, JSON.stringify(sdTokens, null, 2));

// Configure Style Dictionary
const config = {
  source: [tempTokensPath],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: './',
      files: [
        {
          destination: 'movement-tokens.css',
          format: 'css/variables-with-semantic-elements',
          options: {
            showFileHeader: false
          }
        }
      ]
    },
    js: {
      transformGroup: 'js',
      buildPath: './',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/es6'
        }
      ]
    }
  }
};

export default config;
