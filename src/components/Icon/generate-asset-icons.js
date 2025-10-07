import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'assets');
const outputFilePath = path.join(__dirname, 'AllAssetIcons.tsx');

// Automatically read all SVG files from the assets directory
const assetFiles = fs.readdirSync(assetsDir)
  .filter(file => file.endsWith('.svg'))
  .sort(); // Sort alphabetically for consistent output

console.log(`Found ${assetFiles.length} SVG files in assets directory:`, assetFiles);

// Component name overrides to avoid conflicts
const NAME_OVERRIDES = {
  'polygon.svg': 'PolygonNetworkIcon', // Avoid conflict with Phosphor's PolygonIcon
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatComponentName(filename) {
  // Check for override first
  if (NAME_OVERRIDES[filename]) {
    return NAME_OVERRIDES[filename];
  }
  
  const name = filename.replace('.svg', '');
  return name
    .split('-')
    .map((part) => capitalizeFirstLetter(part))
    .join('') + 'Icon';
}

const generateIcons = () => {
  let imports = `import { forwardRef, ReactElement } from "react";\nimport { Icon, IconBase, IconWeight } from "@phosphor-icons/react";\n\n`;
  let components = '';

  assetFiles.forEach(file => {
    const svgContent = fs.readFileSync(path.join(assetsDir, file), 'utf-8');
    const componentName = formatComponentName(file);

    // Extract viewBox from SVG content
    const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 256 256'; // Default viewBox

    // Remove SVG tag and its attributes, but preserve original colors
    // Convert SVG attributes to React-compatible format
    const cleanedSvgContent = svgContent
      .replace(/<svg[^>]*>/, '')
      .replace(/<\/svg>/, '')
      .replace(/stroke-width="[^"]*"/g, '')
      .replace(/style="[^"]*"/g, '') // Remove style attributes but keep fill colors
      .replace(/xlink:href=/g, 'xlinkHref=') // Convert xlink:href to xlinkHref for React
      .replace(/clip-path=/g, 'clipPath=') // Convert clip-path to clipPath for React
      .replace(/fill-rule=/g, 'fillRule=') // Convert fill-rule to fillRule for React
      .replace(/stroke-linecap=/g, 'strokeLinecap=') // Convert stroke-linecap to strokeLinecap for React
      .replace(/stroke-linejoin=/g, 'strokeLinejoin=') // Convert stroke-linejoin to strokeLinejoin for React
      .replace(/stroke-width=/g, 'strokeWidth='); // Convert stroke-width to strokeWidth for React

    // Check if there are multiple path elements
    const pathCount = (cleanedSvgContent.match(/<path/g) || []).length;
    const hasMultiplePaths = pathCount > 1;
    
    // // Wrap in fragment if multiple paths
    // const wrappedContent = hasMultiplePaths 
    //   ? `<>${cleanedSvgContent}</>`
    //   : cleanedSvgContent;



    const wrappedContent = `<>${cleanedSvgContent}</>`

    // Create weights map with regular weight only
    components += `
// ${componentName} Component
const ${componentName}Weights = new Map<IconWeight, ReactElement>([
  ["regular", (
    ${wrappedContent}
  )],
]);

export const ${componentName}: Icon = forwardRef((props, ref) => (
  <IconBase 
    ref={ref} 
    {...props} 
    weights={${componentName}Weights}
    viewBox="${viewBox}"
    style={{
      ...props.style
    }}
  />
));

${componentName}.displayName = "${componentName}";\n
`;
  });

  const outputContent = imports + components;
  fs.writeFileSync(outputFilePath, outputContent);
  console.log('Generated AllAssetIcons.tsx with all asset icons');
};

generateIcons();
