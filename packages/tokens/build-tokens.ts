#!/usr/bin/env node

/**
 * Build Tokens Script (TypeScript)
 * 
 * This script runs Style Dictionary to generate CSS with semantic HTML elements
 * based on your design tokens.
 */

import StyleDictionary from 'style-dictionary';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main build function
const buildTokens = async () => {
  try {
    console.log('🎨 Building design tokens...');
    
    // Read the individual token files
    const tokensDir = path.join(__dirname, 'movement-tokens');
    const coreTokensPath = path.join(tokensDir, 'core.json');
    const semanticTokensPath = path.join(tokensDir, 'semantic.json');
    const componentsTokensPath = path.join(tokensDir, 'components.json');
    const interactionsTokensPath = path.join(tokensDir, 'interactions.json');
    
    // Create a combined tokens object
    const combinedTokens: { tokens: Record<string, any> } = {
      tokens: {}
    };
    
    // First, load all the raw tokens
    const rawTokens: Record<string, any> = {};
    
    // Add each token file if it exists
    if (fs.existsSync(coreTokensPath)) {
      const coreTokens = JSON.parse(fs.readFileSync(coreTokensPath, 'utf8'));
      if (coreTokens.core) {
        rawTokens.core = coreTokens.core;
      }
    }
    
    if (fs.existsSync(semanticTokensPath)) {
      const semanticTokens = JSON.parse(fs.readFileSync(semanticTokensPath, 'utf8'));
      if (semanticTokens.semantic) {
        rawTokens.semantic = semanticTokens.semantic;
      }
    }
    
    if (fs.existsSync(componentsTokensPath)) {
      const componentsTokens = JSON.parse(fs.readFileSync(componentsTokensPath, 'utf8'));
      if (componentsTokens.components) {
        rawTokens.components = componentsTokens.components;
      }
    }
    
    if (fs.existsSync(interactionsTokensPath)) {
      const interactionsTokens = JSON.parse(fs.readFileSync(interactionsTokensPath, 'utf8'));
      if (interactionsTokens.interactions) {
        rawTokens.interactions = interactionsTokens.interactions;
      }
    }
    
    // Now process and flatten the tokens
    // First add core tokens
    if (rawTokens.core) {
      Object.entries(rawTokens.core).forEach(([key, value]) => {
        combinedTokens.tokens[key] = value;
      });
    }
    
    // Then add semantic tokens
    if (rawTokens.semantic) {
      Object.entries(rawTokens.semantic).forEach(([key, value]) => {
        combinedTokens.tokens[key] = value;
      });
    }
    
    // Then add component tokens
    if (rawTokens.components) {
      Object.entries(rawTokens.components).forEach(([key, value]) => {
        combinedTokens.tokens[key] = value;
      });
    }
    
    // Then add interaction tokens
    if (rawTokens.interactions) {
      Object.entries(rawTokens.interactions).forEach(([key, value]) => {
        combinedTokens.tokens[key] = value;
      });
    }
    
    // Ensure the dist directory exists
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Write the combined tokens to a temporary file
    const tempTokensPath = path.join(distDir, 'sd-tokens.json');
    fs.writeFileSync(tempTokensPath, JSON.stringify(combinedTokens, null, 2));
    
    // Resolve all token references
    const resolvedTokens = resolveReferences(rawTokens);
    
    // Create a simple CSS file with variables directly
    const cssContent = generateCssVariables(resolvedTokens);
    fs.writeFileSync(path.join(distDir, 'movement-tokens.css'), cssContent);
    
    // Also write to the root directory for backward compatibility
    fs.writeFileSync(path.join(__dirname, 'movement-tokens.css'), cssContent);
    
    // Create a simple JS file with the tokens
    const jsContent = `export default ${JSON.stringify(resolvedTokens, null, 2)};`;
    fs.writeFileSync(path.join(distDir, 'tokens.js'), jsContent);
    
    console.log('✅ Design tokens built successfully!');
    console.log('📄 Generated files:');
    console.log('  - dist/movement-tokens.css (CSS variables and semantic HTML elements)');
    console.log('  - movement-tokens.css (CSS variables and semantic HTML elements - root directory)');
    console.log('  - dist/tokens.js (JavaScript tokens for use in JS/TS applications)');
    
    // Generate token documentation
    generateTokenDocumentation();
  } catch (error) {
    console.error('❌ Error building tokens:', error);
    process.exit(1);
  }
};

// Function to resolve token references
const resolveReferences = (tokens: any) => {
  const flattenedTokens: Record<string, any> = {};
  
  // First, flatten the token structure for easier reference resolution
  const flattenTokens = (obj: any, path: string[] = []) => {
    if (!obj || typeof obj !== 'object') return;
    
    Object.entries(obj).forEach(([key, value]: [string, any]) => {
      const currentPath = [...path, key];
      const flatKey = currentPath.join('.');
      
      if (typeof value === 'object' && value !== null) {
        if ('value' in value) {
          // This is a token with a value
          flattenedTokens[flatKey] = value.value;
          
          // Add simplified paths for cross-category references
          if (currentPath.length > 1) {
            // Create simplified paths without the category prefix
            const simplifiedPath = currentPath.slice(1).join('.');
            flattenedTokens[simplifiedPath] = value.value;
            
            // Special case for color tokens
            if (simplifiedPath.startsWith('color.')) {
              // Also add with hyphens instead of dots for color references
              const hyphenPath = simplifiedPath.replace(/\./g, '-');
              flattenedTokens[hyphenPath] = value.value;
            }
          }
        }
        // Continue flattening nested objects
        flattenTokens(value, currentPath);
      }
    });
  };
  
  // Flatten all token categories
  if (tokens.core) flattenTokens(tokens.core, ['core']);
  if (tokens.semantic) flattenTokens(tokens.semantic, ['semantic']);
  if (tokens.components) flattenTokens(tokens.components, ['components']);
  if (tokens.interactions) flattenTokens(tokens.interactions, ['interactions']);
  
  // Add case-insensitive aliases for common paths
  // This helps resolve references that might have different casing
  Object.keys(flattenedTokens).forEach(key => {
    // Create case-insensitive aliases for color.neutrals paths
    if (key.toLowerCase().includes('neutrals.whitealpha')) {
      const newKey = key.replace(/neutrals\.whitealpha/i, 'neutrals.whiteAlpha');
      flattenedTokens[newKey] = flattenedTokens[key];
    }
    if (key.toLowerCase().includes('neutrals.blackalpha')) {
      const newKey = key.replace(/neutrals\.blackalpha/i, 'neutrals.blackAlpha');
      flattenedTokens[newKey] = flattenedTokens[key];
    }
  });
  
  // Add special mappings for common references
  flattenedTokens['background.bg'] = flattenedTokens['semantic.color.background.base'] || '#000000';
  flattenedTokens['navigation.bg'] = flattenedTokens['components.navigation.bg'] || '#000000';
  flattenedTokens['MoveETH'] = 'MoveETH';
  flattenedTokens['MOVE'] = 'MOVE';
  
  // Add direct mappings for color references
  if (tokens.core && tokens.core.color) {
    // Map color.moveus-marigold references
    for (const [shade, value] of Object.entries(tokens.core.color['moveus-marigold'] || {})) {
      if (value && (value as any).value) {
        flattenedTokens[`color.moveus-marigold.${shade}`] = (value as any).value;
      }
    }
    
    // Map color.byzantine-blue references
    for (const [shade, value] of Object.entries(tokens.core.color['byzantine-blue'] || {})) {
      if (value && (value as any).value) {
        flattenedTokens[`color.byzantine-blue.${shade}`] = (value as any).value;
      }
    }
    
    // Map color.protocol-pink references
    for (const [shade, value] of Object.entries(tokens.core.color['protocol-pink'] || {})) {
      if (value && (value as any).value) {
        flattenedTokens[`color.protocol-pink.${shade}`] = (value as any).value;
      }
    }
    
    // Map color.guild-green references
    for (const [shade, value] of Object.entries(tokens.core.color['guild-green'] || {})) {
      if (value && (value as any).value) {
        flattenedTokens[`color.guild-green.${shade}`] = (value as any).value;
      }
    }
    
    // Map color.oracle-orange references
    for (const [shade, value] of Object.entries(tokens.core.color['oracle-orange'] || {})) {
      if (value && (value as any).value) {
        flattenedTokens[`color.oracle-orange.${shade}`] = (value as any).value;
      }
    }
    
    // Map color.neutrals references
    if (tokens.core.color.neutrals) {
      flattenedTokens['color.neutrals.white'] = tokens.core.color.neutrals.white?.value || '#ffffff';
      flattenedTokens['color.neutrals.black'] = tokens.core.color.neutrals.black?.value || '#000000';
      
      // Map whiteAlpha and blackAlpha
      const alphaTypes = ['whitealpha', 'blackalpha'];
      alphaTypes.forEach(alphaType => {
        const camelCaseType = alphaType === 'whitealpha' ? 'whiteAlpha' : 'blackAlpha';
        
        if (tokens.core.color.neutrals[alphaType]) {
          for (const [shade, value] of Object.entries(tokens.core.color.neutrals[alphaType])) {
            if (value && (value as any).value) {
              flattenedTokens[`color.neutrals.${camelCaseType}.${shade}`] = (value as any).value;
            }
          }
        }
      });
    }
  }
  
  // Add direct mappings for feedback colors to break circular references
  flattenedTokens['color.feedback.success'] = '#28cf98'; // guild-green.500
  flattenedTokens['color.feedback.error'] = '#d82c2d';
  flattenedTokens['color.feedback.warning'] = '#ea5330'; // oracle-orange.500
  
  // Function to resolve a single reference
  const resolveReference = (value: string, visited: Set<string> = new Set()): string => {
    if (!value.startsWith('{') || !value.endsWith('}')) {
      return value; // Not a reference
    }
    
    const refPath = value.slice(1, -1); // Remove { and }
    
    if (visited.has(refPath)) {
      console.error(`Circular reference detected: ${refPath}`);
      return value; // Return original value to break the cycle
    }
    
    // Try exact match first
    if (flattenedTokens[refPath]) {
      const resolvedValue = flattenedTokens[refPath];
      
      // If the resolved value is also a reference, resolve it recursively
      if (typeof resolvedValue === 'string' && resolvedValue.startsWith('{') && resolvedValue.endsWith('}')) {
        visited.add(refPath);
        return resolveReference(resolvedValue, visited);
      }
      
      return resolvedValue;
    }
    
    // Try case-insensitive match
    const lowerRefPath = refPath.toLowerCase();
    const matchingKey = Object.keys(flattenedTokens).find(key => key.toLowerCase() === lowerRefPath);
    
    if (matchingKey) {
      const resolvedValue = flattenedTokens[matchingKey];
      
      // If the resolved value is also a reference, resolve it recursively
      if (typeof resolvedValue === 'string' && resolvedValue.startsWith('{') && resolvedValue.endsWith('}')) {
        visited.add(refPath);
        return resolveReference(resolvedValue, visited);
      }
      
      return resolvedValue;
    }
    
    // Handle special cases for common patterns
    // For example, if a reference like {color.primary.base} isn't found directly,
    // try looking for it in semantic.color.primary.base
    if (refPath.startsWith('color.') && !refPath.startsWith('color.neutrals')) {
      const semanticPath = `semantic.${refPath}`;
      if (flattenedTokens[semanticPath]) {
        return resolveReference(`{${semanticPath}}`, visited);
      }
    }
    
    // Handle references to navigation, button, etc. in components
    if (refPath.startsWith('navigation.') || refPath.startsWith('button.') || 
        refPath.startsWith('feedback.') || refPath.startsWith('table.') || 
        refPath.startsWith('modal.') || refPath.startsWith('input.')) {
      const componentsPath = `components.${refPath}`;
      if (flattenedTokens[componentsPath]) {
        return resolveReference(`{${componentsPath}}`, visited);
      }
    }
    
    // Handle references to semantic color
    if (refPath.startsWith('background.') || refPath.startsWith('foreground.')) {
      const semanticColorPath = `semantic.color.${refPath}`;
      if (flattenedTokens[semanticColorPath]) {
        return resolveReference(`{${semanticColorPath}}`, visited);
      }
    }
    
    // Handle references to interactions
    if (refPath === 'MoveETH' || refPath === 'MOVE') {
      // These are string literals, not references
      return refPath;
    }
    
    // Handle dimension references
    if (refPath.startsWith('dimension.')) {
      const dimensionValue = refPath.split('.')[1];
      if (dimensionValue && !isNaN(parseInt(dimensionValue))) {
        return dimensionValue;
      }
    }
    
    console.log(`Reference not found: ${value}`);
    return value; // Return original reference if not found
  };
  
  // Recursively resolve references in the token structure
  const resolveReferencesInObject = (obj: any) => {
    if (!obj || typeof obj !== 'object') return;
    
    Object.entries(obj).forEach(([key, value]: [string, any]) => {
      if (typeof value === 'object' && value !== null) {
        if ('value' in value && typeof value.value === 'string') {
          // This is a token with a string value that might contain references
          value.value = resolveReference(value.value);
        }
        // Continue resolving references in nested objects
        resolveReferencesInObject(value);
      }
    });
  };
  
  // Resolve references in all token categories
  if (tokens.core) resolveReferencesInObject(tokens.core);
  if (tokens.semantic) resolveReferencesInObject(tokens.semantic);
  if (tokens.components) resolveReferencesInObject(tokens.components);
  if (tokens.interactions) resolveReferencesInObject(tokens.interactions);
  
  return tokens;
};

// Function to generate CSS variables from tokens
const generateCssVariables = (tokens: any) => {
  let cssString = '/* Movement Design System Tokens */\n\n';
  cssString += ':root {\n';
  
  // Helper function to process tokens recursively and generate CSS variables
  const processTokens = (obj: any, path: string[] = []) => {
    if (!obj || typeof obj !== 'object') return;
    
    Object.entries(obj).forEach(([key, value]: [string, any]) => {
      const currentPath = [...path, key];
      
      if (typeof value === 'object' && value !== null) {
        if ('value' in value) {
          // This is a token with a value
          const cssVarName = `--${currentPath.join('-')}`;
          cssString += `  ${cssVarName}: ${value.value};\n`;
        } else {
          // This is a nested object, recurse
          processTokens(value, currentPath);
        }
      }
    });
  };
  
  // Process each token category
  if (tokens.core) processTokens(tokens.core, ['core']);
  if (tokens.semantic) processTokens(tokens.semantic, ['semantic']);
  if (tokens.components) processTokens(tokens.components, ['components']);
  if (tokens.interactions) processTokens(tokens.interactions, ['interactions']);
  
  cssString += '}\n\n';
  
  // Add semantic HTML element styles
  cssString += '/* Semantic HTML Element Styles */\n\n';
  
  // Body styles
  cssString += `body {\n`;
  cssString += `  font-family: var(--core-typography-font-family-body);\n`;
  cssString += `  color: var(--semantic-color-foreground-base, #ffffff);\n`;
  cssString += `  background-color: var(--semantic-color-background-base, #000000);\n`;
  cssString += `  line-height: 1.5;\n`;
  cssString += `  margin: 0;\n`;
  cssString += `  padding: 0;\n`;
  cssString += `}\n\n`;
  
  // Heading styles
  const headings = [
    { tag: 'h1', size: '6xl', margin: '0.5em', marginTop: '0.7em' },
    { tag: 'h2', size: '5xl', margin: '0.5em', marginTop: '0.7em' },
    { tag: 'h3', size: '4xl', margin: '0.5em', marginTop: '0.7em' },
    { tag: 'h4', size: '3xl', margin: '0.5em', marginTop: '0.7em' },
    { tag: 'h5', size: '2xl', margin: '0.5em', marginTop: '0.7em' },
    { tag: 'h6', size: 'xl', margin: '0.5em', marginTop: '0.7em' }
  ];
  
  headings.forEach(heading => {
    cssString += `${heading.tag} {\n`;
    cssString += `  font-family: var(--core-typography-font-family-heading, "TWK Everett");\n`;
    cssString += `  font-weight: var(--core-typography-font-weight-bold, Bold);\n`;
    cssString += `  font-size: var(--core-typography-font-size-${heading.size}, 16px);\n`;
    cssString += `  color: var(--semantic-color-foreground-base, #ffffff);\n`;
    cssString += `  margin-bottom: ${heading.margin};\n`;
    cssString += `  margin-top: ${heading.marginTop};\n`;
    cssString += `}\n\n`;
  });
  
  // Paragraph styles
  cssString += `p {\n`;
  cssString += `  font-family: var(--core-typography-font-family-body, "Neue Haas Unica Pro");\n`;
  cssString += `  font-size: var(--core-typography-font-size-md, 16px);\n`;
  cssString += `  color: var(--semantic-color-foreground-base, #ffffff);\n`;
  cssString += `  line-height: 1.6;\n`;
  cssString += `  margin-bottom: 1em;\n`;
  cssString += `}\n\n`;
  
  // Link styles
  cssString += `a {\n`;
  cssString += `  color: var(--semantic-color-primary-base, #ffd935);\n`;
  cssString += `  text-decoration: none;\n`;
  cssString += `  transition: color 0.2s ease;\n`;
  cssString += `}\n\n`;
  
  cssString += `a:hover {\n`;
  cssString += `  color: var(--semantic-color-primary-darken, #ddba22);\n`;
  cssString += `  text-decoration: underline;\n`;
  cssString += `}\n\n`;
  
  // Button styles
  cssString += `button {\n`;
  cssString += `  font-family: var(--core-typography-font-family-body, "Neue Haas Unica Pro");\n`;
  cssString += `  font-size: var(--core-typography-font-size-md, 16px);\n`;
  cssString += `  font-weight: var(--core-typography-font-weight-medium, Medium);\n`;
  cssString += `  background-color: var(--components-button-primary-default, var(--semantic-color-primary-base, #ffd935));\n`;
  cssString += `  color: var(--semantic-color-foreground-inverse, #000000);\n`;
  cssString += `  border: none;\n`;
  cssString += `  border-radius: 4px;\n`;
  cssString += `  padding: 0.5em 1em;\n`;
  cssString += `  cursor: pointer;\n`;
  cssString += `  transition: background-color 0.2s ease;\n`;
  cssString += `}\n\n`;
  
  cssString += `button:hover {\n`;
  cssString += `  background-color: var(--components-button-primary-hover, var(--semantic-color-primary-darken, #ddba22));\n`;
  cssString += `}\n\n`;
  
  // Strong and em styles
  cssString += `strong {\n`;
  cssString += `  font-weight: var(--core-typography-font-weight-bold, Bold);\n`;
  cssString += `}\n\n`;
  
  cssString += `em {\n`;
  cssString += `  font-style: italic;\n`;
  cssString += `}\n\n`;
  
  // Code styles
  cssString += `code {\n`;
  cssString += `  font-family: monospace;\n`;
  cssString += `  background-color: var(--semantic-color-background-muted, rgba(255, 255, 255, 0.1));\n`;
  cssString += `  padding: 0.2em 0.4em;\n`;
  cssString += `  border-radius: 3px;\n`;
  cssString += `  font-size: 0.9em;\n`;
  cssString += `}\n\n`;
  
  // Pre styles
  cssString += `pre {\n`;
  cssString += `  font-family: monospace;\n`;
  cssString += `  background-color: var(--semantic-color-background-muted, rgba(255, 255, 255, 0.1));\n`;
  cssString += `  padding: 1em;\n`;
  cssString += `  border-radius: 4px;\n`;
  cssString += `  overflow-x: auto;\n`;
  cssString += `  line-height: 1.4;\n`;
  cssString += `}\n\n`;
  
  // List styles
  cssString += `ul, ol {\n`;
  cssString += `  padding-left: 2em;\n`;
  cssString += `  margin-bottom: 1em;\n`;
  cssString += `}\n\n`;
  
  cssString += `li {\n`;
  cssString += `  margin-bottom: 0.5em;\n`;
  cssString += `}\n\n`;
  
  // Table styles
  cssString += `table {\n`;
  cssString += `  border-collapse: collapse;\n`;
  cssString += `  width: 100%;\n`;
  cssString += `  margin-bottom: 1em;\n`;
  cssString += `}\n\n`;
  
  cssString += `th, td {\n`;
  cssString += `  border: 1px solid var(--semantic-color-border-base, rgba(255, 255, 255, 0.2));\n`;
  cssString += `  padding: 0.5em;\n`;
  cssString += `  text-align: left;\n`;
  cssString += `}\n\n`;
  
  cssString += `th {\n`;
  cssString += `  background-color: var(--semantic-color-background-muted, rgba(255, 255, 255, 0.1));\n`;
  cssString += `  font-weight: var(--core-typography-font-weight-bold, Bold);\n`;
  cssString += `}\n\n`;
  
  return cssString;
};

// Generate a token documentation HTML file
const generateTokenDocumentation = () => {
  console.log('\n📝 Generating token documentation...');

  try {
    // Read the generated CSS file
    const cssPath = path.join(__dirname, 'movement-tokens.css');
    
    if (!fs.existsSync(cssPath)) {
      console.error('❌ movement-tokens.css not found. Documentation generation skipped.');
      return;
    }
    
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Extract CSS variables
    const cssVarRegex = /--([a-zA-Z0-9\-]+)\s*:\s*([^;]+);/g;
    const cssVars: Array<{name: string, value: string, category: string}> = [];
    let match;

    while ((match = cssVarRegex.exec(cssContent)) !== null) {
      const name = '--' + match[1];
      const value = match[2].trim();
      
      // Determine the category based on the variable name
      let category = 'other';
      if (name.startsWith('--core-')) {
        category = 'core';
      } else if (name.startsWith('--semantic-')) {
        category = 'semantic';
      } else if (name.startsWith('--components-')) {
        category = 'components';
      } else if (name.startsWith('--interactions-')) {
        category = 'interactions';
      }
      
      cssVars.push({
        name,
        value,
        category
      });
    }

    // Group tokens by category
    const tokensByCategory: Record<string, Array<{name: string, value: string}>> = {
      core: [],
      semantic: [],
      components: [],
      interactions: [],
      other: []
    };
    
    cssVars.forEach(token => {
      tokensByCategory[token.category].push({
        name: token.name,
        value: token.value
      });
    });

    // Create a simple HTML documentation file
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Movement Labs Design Tokens</title>
  <style>
    :root {
      --font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      --color-bg: #f8f9fa;
      --color-text: #212529;
      --color-primary: #0d6efd;
      --color-border: #dee2e6;
      --color-card: #ffffff;
      --spacing-sm: 0.5rem;
      --spacing-md: 1rem;
      --spacing-lg: 1.5rem;
      --spacing-xl: 2rem;
      --radius-sm: 0.25rem;
      --radius-md: 0.5rem;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }

    body {
      font-family: var(--font-family);
      background-color: var(--color-bg);
      color: var(--color-text);
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: var(--spacing-lg);
    }

    header {
      margin-bottom: var(--spacing-xl);
      border-bottom: 1px solid var(--color-border);
      padding-bottom: var(--spacing-md);
    }

    h1, h2, h3, h4 {
      margin-top: 0;
      margin-bottom: var(--spacing-md);
    }

    h1 {
      font-size: 2.5rem;
    }

    h2 {
      font-size: 1.75rem;
      margin-top: var(--spacing-xl);
      padding-bottom: var(--spacing-sm);
      border-bottom: 1px solid var(--color-border);
    }

    h3 {
      font-size: 1.25rem;
      margin-top: var(--spacing-lg);
    }

    .token-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-xl);
    }

    .token-card {
      background-color: var(--color-card);
      border-radius: var(--radius-md);
      box-shadow: var(--shadow-sm);
      padding: var(--spacing-md);
      display: flex;
      flex-direction: column;
    }

    .token-name {
      font-weight: bold;
      margin-bottom: var(--spacing-sm);
      word-break: break-all;
    }

    .token-value {
      font-family: monospace;
      background-color: var(--color-bg);
      padding: var(--spacing-sm);
      border-radius: var(--radius-sm);
      margin-bottom: var(--spacing-sm);
      word-break: break-all;
    }

    .color-preview {
      width: 100%;
      height: 40px;
      border-radius: var(--radius-sm);
      margin-bottom: var(--spacing-sm);
      border: 1px solid var(--color-border);
    }

    .search-container {
      margin-bottom: var(--spacing-lg);
    }

    #token-search {
      width: 100%;
      padding: var(--spacing-md);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      font-size: 1rem;
    }

    .category-nav {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-lg);
    }

    .category-nav a {
      text-decoration: none;
      color: var(--color-text);
      background-color: var(--color-card);
      padding: var(--spacing-sm) var(--spacing-md);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
    }

    .category-nav a:hover {
      background-color: var(--color-primary);
      color: white;
    }

    @media (max-width: 768px) {
      .token-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Movement Labs Design Tokens</h1>
      <p>This documentation displays all the design tokens used in the Movement Labs design system.</p>
    </header>

    <div class="search-container">
      <input type="text" id="token-search" placeholder="Search tokens...">
    </div>

    <div class="category-nav">
      <a href="#core">Core</a>
      <a href="#semantic">Semantic</a>
      <a href="#components">Components</a>
      <a href="#interactions">Interactions</a>
      <a href="#all">All Tokens</a>
    </div>

    <section id="core">
      <h2>Core Tokens</h2>
      <div class="token-grid">
        ${tokensByCategory.core.map(token => `
          <div class="token-card" data-token-name="${token.name}" data-category="core">
            ${token.value.includes('#') || token.value.includes('rgb') ? 
              `<div class="color-preview" style="background-color: ${token.value};"></div>` : ''}
            <div class="token-name">${token.name}</div>
            <div class="token-value">${token.value}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <section id="semantic">
      <h2>Semantic Tokens</h2>
      <div class="token-grid">
        ${tokensByCategory.semantic.map(token => `
          <div class="token-card" data-token-name="${token.name}" data-category="semantic">
            ${token.value.includes('#') || token.value.includes('rgb') ? 
              `<div class="color-preview" style="background-color: ${token.value};"></div>` : ''}
            <div class="token-name">${token.name}</div>
            <div class="token-value">${token.value}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <section id="components">
      <h2>Component Tokens</h2>
      <div class="token-grid">
        ${tokensByCategory.components.map(token => `
          <div class="token-card" data-token-name="${token.name}" data-category="components">
            ${token.value.includes('#') || token.value.includes('rgb') ? 
              `<div class="color-preview" style="background-color: ${token.value};"></div>` : ''}
            <div class="token-name">${token.name}</div>
            <div class="token-value">${token.value}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <section id="interactions">
      <h2>Interaction Tokens</h2>
      <div class="token-grid">
        ${tokensByCategory.interactions.map(token => `
          <div class="token-card" data-token-name="${token.name}" data-category="interactions">
            ${token.value.includes('#') || token.value.includes('rgb') ? 
              `<div class="color-preview" style="background-color: ${token.value};"></div>` : ''}
            <div class="token-name">${token.name}</div>
            <div class="token-value">${token.value}</div>
          </div>
        `).join('')}
      </div>
    </section>

    <section id="all">
      <h2>All Tokens</h2>
      <div class="token-grid">
        ${cssVars.map(token => `
          <div class="token-card" data-token-name="${token.name}" data-category="${token.category}">
            ${token.value.includes('#') || token.value.includes('rgb') ? 
              `<div class="color-preview" style="background-color: ${token.value};"></div>` : ''}
            <div class="token-name">${token.name}</div>
            <div class="token-value">${token.value}</div>
          </div>
        `).join('')}
      </div>
    </section>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Setup search functionality
      const searchInput = document.getElementById('token-search');
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        document.querySelectorAll('.token-card').forEach(card => {
          const tokenName = card.dataset.tokenName.toLowerCase();
          if (tokenName.includes(searchTerm)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  </script>
</body>
</html>`;

    // Write the HTML file
    const docsPath = path.join(__dirname, 'token-documentation.html');
    fs.writeFileSync(docsPath, html);

    console.log('✅ Token documentation generated successfully!');
    console.log(`📄 Documentation file: ${docsPath}`);
  } catch (error) {
    console.error('❌ Error generating token documentation:', error);
  }
};

// Run the build process
buildTokens();
