import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Title,
  Subtitle,
  Description,
  Controls,
  Stories,
} from "@storybook/addon-docs/blocks";

const meta: Meta = {
  title: "theme/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Controls />
          <Stories />
        </>
      ),
      description: {
        component:
          "Color palette and semantic tokens for the design system. All colors are available as Tailwind classes (e.g., `bg-cyan-300`) and CSS variables (e.g., `var(--primary)`).",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Brand color palettes
const brandColors = {
  // Movement Cyan — the single brand colour (`--color-cyan-*` ramp).
  "Movement Cyan": {
    50: "#E8FCFC",
    100: "#C5F6F5",
    200: "#8FF0EE",
    300: "#15EDEB",
    400: "#14D6D4",
    500: "#12BCBA",
    600: "#0FA09E",
    700: "#0B7775",
    800: "#084F4E",
    900: "#042827",
  },
};

// Neutrals
const neutralColors = {
  "White Alpha": {
    50: "#ffffff0a",
    100: "#ffffff0f",
    200: "#ffffff14",
    300: "#ffffff29",
    400: "#ffffff3d",
    500: "#ffffff5c",
    600: "#ffffff7a",
    700: "#ffffffa3",
    800: "#ffffffcc",
    900: "#ffffffeb",
  },
  "Black Alpha": {
    50: "#0000000a",
    100: "#0000000f",
    200: "#00000014",
    300: "#00000029",
    400: "#0000003d",
    500: "#0000005c",
    600: "#0000007a",
    700: "#000000a3",
    800: "#000000cc",
    900: "#000000eb",
  },
};

// Semantic colors with descriptions
const semanticColors = [
  {
    name: "Primary",
    description: "Movement Cyan - main brand colour for primary actions",
    light: "hsl(179 84% 51%)",
    dark: "hsl(179 84% 51%)",
    cssVar: "--primary",
    tailwindClass: "bg-primary",
  },
  {
    name: "Secondary",
    description: "Near-black - secondary actions (royal blue retired)",
    light: "hsl(0 0% 11%)",
    dark: "hsl(0 0% 9%)",
    cssVar: "--secondary",
    tailwindClass: "bg-secondary",
  },
  {
    name: "Accent",
    description: "Cyan-soft - subtle highlighted backgrounds",
    light: "hsl(176 64% 88%)",
    dark: "hsl(180 40% 16%)",
    cssVar: "--accent",
    tailwindClass: "bg-accent",
  },
  {
    name: "Destructive",
    description: "Red - destructive/delete actions",
    light: "hsl(0 72% 51%)",
    dark: "hsl(0 72% 60%)",
    cssVar: "--destructive",
    tailwindClass: "bg-destructive",
  },
];

const feedbackColors = [
  {
    name: "Success",
    description: "Positive feedback, successful operations",
    light: "#16A34A",
    dark: "#29CF96",
    lightBg: "#DCFCE7",
    darkBg: "#0f3d2c",
    cssVar: "--semantic-feedback-success-default",
    tailwindClass: "bg-success",
  },
  {
    name: "Info",
    description: "Informational messages",
    light: "#2563EB",
    dark: "#3B82F6",
    lightBg: "#DBEAFE",
    darkBg: "#14213d",
    cssVar: "--semantic-feedback-info-default",
    tailwindClass: "bg-info",
  },
  {
    name: "Warning",
    description: "Warning messages, cautionary states",
    light: "#CA8A04",
    dark: "#FACC15",
    lightBg: "#FEF9C3",
    darkBg: "#3d3408",
    cssVar: "--semantic-feedback-warning-default",
    tailwindClass: "bg-warning",
  },
  {
    name: "Error",
    description: "Error states and messages",
    light: "#D82C2D", // From brand-colors.json feedback.error.default
    dark: "#D82C2D",
    lightBg: "#ffc2c2", // From brand-colors.json feedback.error.light
    darkBg: "#ffc2c2",
    cssVar: "--semantic-feedback-error-default",
    tailwindClass: "bg-error",
  },
];

const ColorSwatch = ({
  name,
  color,
  showBorder = false,
}: {
  name: string;
  color: string;
  showBorder?: boolean;
}) => (
  <div className="flex items-center gap-4">
    <div
      style={{ backgroundColor: color }}
      className={`h-12 w-12 rounded-lg shrink-0 ${
        showBorder ? "border-2 border-border" : ""
      }`}
    />
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-muted-foreground font-mono">{color}</p>
    </div>
  </div>
);

/**
 * Primary brand colors that the theme is built on. Each color includes a full scale from 50 (lightest) to 900 (darkest).
 * Use these colors for consistent branding across the application.
 */
export const BrandColors: Story = {
  render: () => (
    <div className="space-y-12 p-6">
      {Object.entries(brandColors).map(([colorName, shades]) => (
        <div key={colorName} className="space-y-6">
          <h2 className="text-2xl font-bold uppercase tracking-wide">
            {colorName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(shades).map(([shade, color]) => (
              <ColorSwatch
                key={shade}
                name={`${shade}`}
                color={color}
                showBorder={shade === "50"}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Neutral colors with alpha transparency. These are useful for overlays, shadows, and semi-transparent backgrounds
 * that need to work on both light and dark backgrounds.
 */
export const NeutralColors: Story = {
  render: () => (
    <div className="space-y-12 p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-2">
            White Alpha
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Best for overlays on dark backgrounds
          </p>
        </div>
        <div className="bg-black p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(neutralColors["White Alpha"]).map(
              ([shade, color]) => (
                <ColorSwatch
                  key={shade}
                  name={`whiteAlpha.${shade}`}
                  color={color}
                />
              )
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide mb-2">
            Black Alpha
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Best for overlays on light backgrounds
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(neutralColors["Black Alpha"]).map(
              ([shade, color]) => (
                <ColorSwatch
                  key={shade}
                  name={`blackAlpha.${shade}`}
                  color={color}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Semantic colors reference the core brand colors and are named based on their usage in the system.
 * **Always use these semantic colors when building components** rather than directly referencing brand colors.
 * This ensures consistent theming and makes it easier to update the design system.
 */
export const SemanticColors: Story = {
  render: () => (
    <div className="space-y-12 p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide">
            Primary Semantic Colors
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Use these for main UI elements, buttons, and interactive components
          </p>
        </div>
        <div className="space-y-8">
          {semanticColors.map((color) => (
            <div key={color.name} className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{color.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {color.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Light Mode
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      style={{ backgroundColor: color.light }}
                      className="h-16 w-16 rounded-lg shrink-0"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-mono">{color.cssVar}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {color.light}
                      </p>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {color.tailwindClass}
                      </code>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Dark Mode
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      style={{ backgroundColor: color.dark }}
                      className="h-16 w-16 rounded-lg shrink-0"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-mono">{color.cssVar}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {color.dark}
                      </p>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {color.tailwindClass}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Feedback colors are used to communicate state and provide user feedback.
 * Use these for alerts, toasts, form validation, and status indicators.
 */
export const FeedbackColors: Story = {
  render: () => (
    <div className="space-y-12 p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide">
            Feedback Colors
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Use these for alerts, notifications, and status communication
          </p>
        </div>
        <div className="space-y-8">
          {feedbackColors.map((color) => (
            <div key={color.name} className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{color.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {color.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Default Color
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      style={{ backgroundColor: color.light }}
                      className="h-16 w-16 rounded-lg shrink-0"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-mono">{color.cssVar}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {color.light}
                      </p>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {color.tailwindClass}
                      </code>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase">
                    Light Background
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      style={{ backgroundColor: color.lightBg }}
                      className="h-16 w-16 rounded-lg shrink-0 border"
                    />
                    <div className="space-y-1">
                      <p className="text-sm font-mono">{color.cssVar}-light</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {color.lightBg}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        For alert/banner backgrounds
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Demonstrates the layered token system architecture showing how primitive tokens
 * flow through brand colors to semantic tokens and finally to component tokens.
 */
export const TokenReferenceChain: Story = {
  render: () => (
    <div className="space-y-12 p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide">
            Token Reference Chain
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Understanding how tokens flow through the layered architecture
          </p>
        </div>

        {/* Example 1: Primary Button Chain */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">
            Example: Primary Button Color
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-muted-foreground">
                Layer 1: Primitive
              </div>
              <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                #15EDEB (cyan.300)
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32"></div>
              <div className="text-2xl text-muted-foreground">↓</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-muted-foreground">
                Layer 2: Brand
              </div>
              <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                --color-cyan-300: #15EDEB
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32"></div>
              <div className="text-2xl text-muted-foreground">↓</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-muted-foreground">
                Layer 3: Semantic
              </div>
              <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                semantic.brand.primary.default → cyan.300
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32"></div>
              <div className="text-2xl text-muted-foreground">↓</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-muted-foreground">
                Layer 5: Legacy
              </div>
              <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                --primary → semantic.brand.primary.default
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32"></div>
              <div className="text-2xl text-muted-foreground">↓</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-muted-foreground">
                Result
              </div>
              <div className="flex-1 flex items-center gap-4">
                <div
                  className="h-16 w-24 rounded-lg"
                  style={{ backgroundColor: "#15EDEB" }}
                />
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium">
                  Primary Button
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Example 2: Feedback Chain */}
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold">Example: Success Feedback</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-muted-foreground">
                Layer 1: Primitive
              </div>
              <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                #16A34A (functional green)
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32"></div>
              <div className="text-2xl text-muted-foreground">↓</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-muted-foreground">
                Layer 2: Brand
              </div>
              <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                feedback.success.default → functional green
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32"></div>
              <div className="text-2xl text-muted-foreground">↓</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-muted-foreground">
                Layer 3: Semantic
              </div>
              <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                --semantic-feedback-success-default
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32"></div>
              <div className="text-2xl text-muted-foreground">↓</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-muted-foreground">
                Layer 4: Component
              </div>
              <div className="flex-1 p-3 bg-muted rounded font-mono text-sm">
                semantic.badge.state.success → semantic.feedback.success.default
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32"></div>
              <div className="text-2xl text-muted-foreground">↓</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 text-sm font-medium text-muted-foreground">
                Result
              </div>
              <div className="flex-1 flex items-center gap-4">
                <div
                  className="h-16 w-24 rounded-lg"
                  style={{ backgroundColor: "#16A34A" }}
                />
                <div className="p-4 bg-success/10 border border-success rounded-lg">
                  <p className="text-sm font-medium">Success message!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Benefits of Layered Tokens</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              • <strong>Maintainability:</strong> Change a primitive value and
              it propagates through all layers
            </li>
            <li>
              • <strong>Semantic Meaning:</strong> Use{" "}
              <code className="bg-background px-1 rounded">--primary</code>{" "}
              instead of{" "}
              <code className="bg-background px-1 rounded">#15EDEB</code>
            </li>
            <li>
              • <strong>Theme Switching:</strong> Dark/light modes swap semantic
              layer values
            </li>
            <li>
              • <strong>Component Consistency:</strong> All buttons use the same
              primary color automatically
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive examples showing how to use colors in components.
 * These demonstrate the semantic colors in action with real component styles.
 */
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-12 p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide">
            Usage Examples
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            See how semantic colors work in real components
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Secondary Button
            </button>
            <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Accent Button
            </button>
            <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
              Destructive Button
            </button>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Alerts</h3>
          <div className="space-y-3">
            <div className="p-4 bg-success/10 border border-success rounded-lg">
              <p className="text-sm font-medium text-success-foreground">
                Success! Your changes have been saved.
              </p>
            </div>
            <div className="p-4 bg-info/10 border border-info rounded-lg">
              <p className="text-sm font-medium text-info-foreground">
                Info: Please check your email for verification.
              </p>
            </div>
            <div className="p-4 bg-warning/10 border border-warning rounded-lg">
              <p className="text-sm font-medium text-warning-foreground">
                Warning: This action cannot be undone.
              </p>
            </div>
            <div className="p-4 bg-error/10 border border-error rounded-lg">
              <p className="text-sm font-medium text-error-foreground">
                Error: Something went wrong. Please try again.
              </p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Badges</h3>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-cyan-400 text-black rounded-full text-sm font-medium">
              Active
            </span>
            <span className="px-3 py-1 bg-neutrals-400 text-white rounded-full text-sm font-medium">
              New
            </span>
          </div>
        </div>

        {/* Cards with brand colors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Cards with Brand Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 bg-linear-to-br from-cyan-300 to-cyan-600 rounded-lg text-black">
              <h4 className="font-bold text-lg mb-2">Cyan</h4>
              <p className="text-sm opacity-90">
                The Movement brand color — primary actions and accents
              </p>
            </div>
            <div className="p-6 bg-linear-to-br from-neutrals-400 to-neutrals-600 rounded-lg text-white">
              <h4 className="font-bold text-lg mb-2">Neutral</h4>
              <p className="text-sm opacity-90">
                Near-black grays for surfaces and secondary UI
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
