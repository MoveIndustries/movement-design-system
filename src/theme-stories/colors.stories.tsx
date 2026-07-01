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
          "Color palette and semantic tokens for the design system. All colors are available as Tailwind classes (e.g., `bg-turquoise-400`) and CSS variables (e.g., `var(--primary)`).",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Movement Color Library — systematic ramps; step 400 is the vivid anchor
// (0 = lightest, 900 = darkest). Turquoise/400 (#15edeb) is the brand.
const brandColors = {
  Turquoise: {
    0: "#eef9f9", 50: "#d9f3f3", 100: "#bce7e7", 200: "#aae6e5", 300: "#79eee9",
    400: "#15edeb", 500: "#27c1ba", 600: "#1e9a99", 700: "#2f7676", 800: "#2a5151", 900: "#2a3d3d",
  },
  Black: {
    0: "#dddddd", 50: "#bcbcbc", 100: "#9c9c9c", 200: "#7d7d7d", 300: "#5f5f5f",
    400: "#434343", 500: "#383838", 600: "#2e2e2e", 700: "#242424", 800: "#1d1d1d", 900: "#101010",
  },
  Sun: {
    0: "#fafae4", 50: "#faf5d3", 100: "#f7efb6", 200: "#efe481", 300: "#f1e25f",
    400: "#f2dd22", 500: "#ddc918", 600: "#9e911c", 700: "#716822", 800: "#4e491e", 900: "#393916",
  },
  Opal: {
    0: "#eef9f4", 50: "#e4f7f0", 100: "#c6eede", 200: "#a2e2c7", 300: "#80e4bb",
    400: "#5bebb0", 500: "#3ad696", 600: "#34a577", 700: "#327157", 800: "#284539", 900: "#181f1c",
  },
  Poppy: {
    0: "#faf0e6", 50: "#f6e8d7", 100: "#f0d8c0", 200: "#e8c196", 300: "#f2b472",
    400: "#ff9d34", 500: "#eb8e2a", 600: "#c57724", 700: "#a16523", 800: "#845520", 900: "#553712",
  },
  Ocean: {
    0: "#e3edf6", 50: "#d6e5f4", 100: "#b1cfeb", 200: "#89b8e6", 300: "#56a0e8",
    400: "#1581eb", 500: "#1771cb", 600: "#22629f", 700: "#224c76", 800: "#1a3651", 900: "#162738",
  },
  Red: {
    0: "#fde6e2", 50: "#faad9e", 100: "#f45434", 200: "#8e321f", 300: "#412620",
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
    description: "Turquoise 400 — brand colour for primary actions",
    light: "#15edeb",
    dark: "#15edeb",
    cssVar: "--primary",
    tailwindClass: "bg-primary",
  },
  {
    name: "Secondary",
    description: "Black 800 — near-black for secondary actions",
    light: "#1d1d1d",
    dark: "#1d1d1d",
    cssVar: "--secondary",
    tailwindClass: "bg-secondary",
  },
  {
    name: "Accent",
    description: "Soft turquoise — subtle highlighted backgrounds",
    light: "#bce7e7",
    dark: "#2a5151",
    cssVar: "--accent",
    tailwindClass: "bg-accent",
  },
  {
    name: "Destructive",
    description: "Red 100 — destructive/delete actions",
    light: "#f45434",
    dark: "#f45434",
    cssVar: "--destructive",
    tailwindClass: "bg-destructive",
  },
];

const feedbackColors = [
  {
    name: "Success",
    description: "Opal (green) — positive feedback, successful operations",
    light: "#34a577",
    dark: "#5bebb0",
    lightBg: "#e4f7f0",
    darkBg: "#181f1c",
    cssVar: "--semantic-feedback-success-default",
    tailwindClass: "bg-success",
  },
  {
    name: "Info",
    description: "Ocean (blue) — informational messages",
    light: "#1771cb",
    dark: "#1581eb",
    lightBg: "#d6e5f4",
    darkBg: "#162738",
    cssVar: "--semantic-feedback-info-default",
    tailwindClass: "bg-info",
  },
  {
    name: "Warning",
    description: "Sun (yellow) — warning messages, cautionary states",
    light: "#9e911c",
    dark: "#f2dd22",
    lightBg: "#faf5d3",
    darkBg: "#393916",
    cssVar: "--semantic-feedback-warning-default",
    tailwindClass: "bg-warning",
  },
  {
    name: "Error",
    description: "Red — error states and messages",
    light: "#f45434",
    dark: "#f45434",
    lightBg: "#fde6e2",
    darkBg: "#412620",
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
                showBorder={shade === "0"}
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
                #15EDEB (turquoise.400)
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
                --color-turquoise-400: #15EDEB
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
                semantic.brand.primary.default → turquoise.400
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
            <span className="px-3 py-1 bg-turquoise-400 text-black rounded-full text-sm font-medium">
              Active
            </span>
            <span className="px-3 py-1 bg-black-800 text-white rounded-full text-sm font-medium">
              New
            </span>
          </div>
        </div>

        {/* Cards with brand colors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Cards with Brand Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 bg-linear-to-br from-turquoise-400 to-turquoise-600 rounded-lg text-black">
              <h4 className="font-bold text-lg mb-2">Turquoise</h4>
              <p className="text-sm opacity-90">
                The Movement brand color — primary actions and accents
              </p>
            </div>
            <div className="p-6 bg-linear-to-br from-black-700 to-black-900 rounded-lg text-white">
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
