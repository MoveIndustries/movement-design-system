import type { Meta, StoryObj } from "@storybook/react-vite";
import { gradientBackgroundClasses } from "../lib/gradient-styles";

const meta: Meta = {
  title: "theme/Gradients",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Gradient background recipes for consistent styling across the application. Use the class names directly or the `getGradientClass()` utility function.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const MintCyan: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Mint Cyan Gradient</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          A vibrant linear gradient from mint green to cyan, perfect for call-to-action elements,
          highlights, and primary accent backgrounds.
        </p>
        <div className="space-y-4">
          <div
            className={gradientBackgroundClasses.mintCyan}
            style={{ height: "200px", borderRadius: "8px" }}
          />
          <div>
            <p className="text-sm font-mono mb-1">Class name:</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {gradientBackgroundClasses.mintCyan}
            </code>
          </div>
          <div>
            <p className="text-sm font-mono mb-1">CSS:</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
              background: linear-gradient(130deg, #81FFBA 33.64%, #00FFF9 79.2%);
            </code>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const GlassOverlay: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Glass Overlay Gradient</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          A sophisticated multi-layered gradient combining dark overlays with radial mint-to-blue
          gradients. Perfect for glassmorphic designs, card backgrounds, and modal overlays.
        </p>
        <div className="space-y-4">
          <div
            className={gradientBackgroundClasses.glassOverlay}
            style={{ height: "200px", borderRadius: "8px" }}
          />
          <div>
            <p className="text-sm font-mono mb-1">Class name:</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {gradientBackgroundClasses.glassOverlay}
            </code>
          </div>
          <div>
            <p className="text-sm font-mono mb-1">CSS:</p>
            <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block">
              background: linear-gradient(0deg, rgba(4, 5, 27, 0.20) 0%, rgba(4, 5, 27, 0.20)
              100%), linear-gradient(153deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.00) 100%),
              radial-gradient(100% 100% at 120.34% 112.85%, rgba(129, 255, 186, 0.40) 0%, rgba(0,
              27, 133, 0.40) 100%);
            </code>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const UsageExample: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Usage Examples</h3>
        
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold mb-2">Method 1: Using class names directly</p>
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`import { gradientBackgroundClasses } from '@/lib/gradient-styles';

<div className={gradientBackgroundClasses.mintCyan}>
  Content here
</div>`}
            </pre>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Method 2: Using the utility function</p>
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`import { getGradientClass } from '@/lib/gradient-styles';

<div className={getGradientClass('mintCyan')}>
  Content here
</div>`}
            </pre>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Method 3: Using class names directly (after importing the design system)</p>
            <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-x-auto">
{`// The gradient styles are automatically available when you import the design system
import '@movementlabsxyz/movement-design-system/dist/index.css';

// Then use class names directly in your HTML/JSX
<div className="gradient-mint-cyan">Content</div>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllGradients: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">All Available Gradients</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(gradientBackgroundClasses).map(([key, className]) => (
          <div key={key} className="space-y-2">
            <div
              className={className}
              style={{
                height: "150px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <div>
              <p className="text-sm font-semibold">{key}</p>
              <code className="text-xs text-gray-600 dark:text-gray-400">{className}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

