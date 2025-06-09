import fs from 'fs';
import path from 'path';

interface TokenValidationResult {
  missingSelectors: string[];
  unusedTokens: string[];
  suggestions: string[];
  coverage: {
    total: number;
    covered: number;
    percentage: number;
  };
}

/**
 * Validates that all design tokens have corresponding CSS selectors
 */
function validateTokenCoverage(
  tokensJsonPath: string,
  cssFilePath: string
): TokenValidationResult {
  // Read the tokens.json file
  const tokens = JSON.parse(fs.readFileSync(tokensJsonPath, 'utf8'));
  
  // Read the CSS file
  const cssContent = fs.readFileSync(cssFilePath, 'utf8');
  
  // Extract all CSS variables using regex
  const cssVariableRegex = /--[a-zA-Z0-9\-]+/g;
  const cssVariablesMatches = cssContent.match(cssVariableRegex) || [];
  const cssVariables = new Set<string>(cssVariablesMatches);
  
  // Extract all CSS selectors using regex
  const selectorRegex = /\.[a-zA-Z0-9\-]+\s*\{/g;
  const selectorMatches = cssContent.match(selectorRegex) || [];
  const selectors = new Set<string>(
    selectorMatches.map(match => match.trim().replace('{', '').trim())
  );
  
  // Collect all token paths
  const tokenPaths: string[] = [];
  function collectTokenPaths(obj: any, currentPath: string = '') {
    if (typeof obj !== 'object' || obj === null) return;
    
    if (obj.value !== undefined && typeof obj.value === 'string') {
      tokenPaths.push(currentPath);
      return;
    }
    
    Object.entries(obj).forEach(([key, value]) => {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      collectTokenPaths(value, newPath);
    });
  }
  
  collectTokenPaths(tokens);
  
  // Convert token paths to expected CSS variable names
  const expectedCssVariables = tokenPaths.map(tokenPath => {
    // Convert token path to CSS variable name
    const parts = tokenPath.split('.');
    
    // Handle different token types
    if (parts[0] === 'colors') {
      const colorName = parts[1];
      const shade = parts[2];
      return `--color-${colorName}-${shade}`;
    } else if (parts[0] === 'spacing') {
      return `--space-${parts[1]}`;
    } else if (parts[0] === 'fontFamilies') {
      return `--font-family-${parts[1]}`;
    } else if (parts[0] === 'fontSize') {
      return `--font-size-${parts[1]}`;
    } else if (parts[0] === 'fontWeight') {
      return `--font-weight-${parts[1]}`;
    } else if (parts[0] === 'semantic') {
      if (parts.length >= 3) {
        return `--semantic-${parts[1]}-${parts[2]}`;
      }
      return `--semantic-${parts[1]}`;
    } else {
      // Generic fallback
      return `--${parts.join('-')}`;
    }
  });
  
  // Check for missing selectors
  const missingSelectors: string[] = [];
  const unusedTokens: string[] = [];
  const suggestions: string[] = [];
  
  // Check for each expected CSS variable
  expectedCssVariables.forEach(cssVar => {
    // Check if the CSS variable exists
    if (!cssVariables.has(cssVar)) {
      unusedTokens.push(cssVar);
      suggestions.push(`Add CSS variable: ${cssVar}`);
    } else {
      // Check for common utility classes
      const expectedSelectors = [
        // For colors
        cssVar.includes('color') ? `.bg-${cssVar.substring(2)}` : null,
        cssVar.includes('color') ? `.text-${cssVar.substring(2)}` : null,
        cssVar.includes('color') ? `.border-${cssVar.substring(2)}` : null,
        
        // For spacing
        cssVar.includes('space') ? `.p-${cssVar.substring(2)}` : null,
        cssVar.includes('space') ? `.m-${cssVar.substring(2)}` : null,
        cssVar.includes('space') ? `.gap-${cssVar.substring(2)}` : null,
        
        // For typography
        cssVar.includes('font-family') ? `.font-family-${cssVar.replace('--font-family-', '')}` : null,
        cssVar.includes('font-size') ? `.font-size-${cssVar.replace('--font-size-', '')}` : null,
        cssVar.includes('font-weight') ? `.font-weight-${cssVar.replace('--font-weight-', '')}` : null,
        
        // For components
        cssVar.includes('component') ? `.${cssVar.substring(2)}` : null,
      ].filter(Boolean) as string[];
      
      expectedSelectors.forEach(selector => {
        if (selector && !selectors.has(selector)) {
          missingSelectors.push(selector);
          suggestions.push(`Add selector: ${selector} { /* appropriate CSS */ }`);
        }
      });
    }
  });
  
  // Calculate coverage
  const totalExpectedSelectors = expectedCssVariables.length * 3; // Assuming each token should have ~3 utility classes
  const coveredSelectors = totalExpectedSelectors - missingSelectors.length;
  const coveragePercentage = Math.round((coveredSelectors / totalExpectedSelectors) * 100);
  
  return {
    missingSelectors,
    unusedTokens,
    suggestions,
    coverage: {
      total: totalExpectedSelectors,
      covered: coveredSelectors,
      percentage: coveragePercentage
    }
  };
}

/**
 * Main function to run the validation
 */
function main() {
  const tokensJsonPath = path.join(__dirname, 'tokens.json');
  const cssFilePath = path.join(__dirname, 'movement-tokens.css');
  
  console.log('Validating token coverage...');
  
  try {
    const result = validateTokenCoverage(tokensJsonPath, cssFilePath);
    
    console.log('\n===== TOKEN COVERAGE REPORT =====');
    console.log(`Coverage: ${result.coverage.percentage}% (${result.coverage.covered}/${result.coverage.total})`);
    
    if (result.missingSelectors.length > 0) {
      console.log('\nMissing Selectors:');
      result.missingSelectors.slice(0, 10).forEach(selector => {
        console.log(`  - ${selector}`);
      });
      
      if (result.missingSelectors.length > 10) {
        console.log(`  ... and ${result.missingSelectors.length - 10} more`);
      }
    } else {
      console.log('\nAll expected selectors are present! ');
    }
    
    if (result.unusedTokens.length > 0) {
      console.log('\nUnused Tokens:');
      result.unusedTokens.slice(0, 10).forEach(token => {
        console.log(`  - ${token}`);
      });
      
      if (result.unusedTokens.length > 10) {
        console.log(`  ... and ${result.unusedTokens.length - 10} more`);
      }
    } else {
      console.log('\nAll tokens are used in CSS! ');
    }
    
    if (result.suggestions.length > 0) {
      console.log('\nSuggestions:');
      result.suggestions.slice(0, 10).forEach(suggestion => {
        console.log(`  - ${suggestion}`);
      });
      
      if (result.suggestions.length > 10) {
        console.log(`  ... and ${result.suggestions.length - 10} more`);
      }
      
      // Write suggestions to a file
      const suggestionsPath = path.join(__dirname, 'token-suggestions.txt');
      fs.writeFileSync(
        suggestionsPath,
        result.suggestions.join('\n'),
        'utf8'
      );
      console.log(`\nAll suggestions written to: ${suggestionsPath}`);
    }
    
    // Write full report to a file
    const reportPath = path.join(__dirname, 'token-coverage-report.json');
    fs.writeFileSync(
      reportPath,
      JSON.stringify(result, null, 2),
      'utf8'
    );
    console.log(`\nFull report written to: ${reportPath}`);
    
  } catch (error) {
    console.error('Error validating tokens:', error);
    process.exit(1);
  }
}

// Run the validation
main();
