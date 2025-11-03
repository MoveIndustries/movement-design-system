import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta = {
  title: "Theme/Colors",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Color palette and semantic tokens for the design system. All colors are available as Tailwind classes (e.g., `bg-guild-green-300`) and CSS variables (e.g., `var(--primary)`).",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Brand color palettes
const brandColors = {
  "Moveus Marigold": {
    50: "#fffbeb",
    100: "#fff2bd",
    200: "#ffea90",
    300: "#ffe162",
    400: "#ffd935",
    500: "#ddba22",
    600: "#bb9b13",
    700: "#997e08",
    800: "#776100",
    900: "#554500",
  },
  "Guild Green": {
    50: "#f2fff8",
    100: "#ccffe3",
    200: "#a7ffce",
    300: "#81ffba",
    400: "#6ce2a1",
    500: "#58c589",
    600: "#47a872",
    700: "#368a5c",
    800: "#286d47",
    900: "#1b5033",
  },
  "Byzantine Blue": {
    50: "#c2ceff",
    100: "#859dff",
    200: "#5c7cff",
    300: "#335cff",
    400: "#0337ff",
    500: "#002cd6",
    600: "#0024ad",
    700: "#001b85",
    800: "#00135c",
    900: "#000c3d",
  },
  "Protocol Pink": {
    50: "#fff1fc",
    100: "#ffc9f3",
    200: "#ffa0eb",
    300: "#ff77e2",
    400: "#eb66cf",
    500: "#ce52b4",
    600: "#b14199",
    700: "#94317f",
    800: "#762365",
    900: "#59184b",
  },
  "Oracle Orange": {
    50: "#ffefec",
    100: "#ffcdc2",
    200: "#ffab97",
    300: "#ff886d",
    400: "#FF6642",
    500: "#ea5330",
    600: "#c83e1e",
    700: "#a62c10",
    800: "#841d05",
    900: "#621300",
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
    description: "Guild Green - Main brand color for primary actions",
    light: "hsl(150 100% 75%)",
    dark: "hsl(154 66% 66%)",
    cssVar: "--primary",
    tailwindClass: "bg-primary",
  },
  {
    name: "Secondary",
    description: "Byzantine Blue - Secondary actions and accents",
    light: "hsl(227 100% 50%)",
    dark: "hsl(227 100% 65%)",
    cssVar: "--secondary",
    tailwindClass: "bg-secondary",
  },
  {
    name: "Accent",
    description: "Protocol Pink - Highlighted elements and emphasis",
    light: "hsl(304 100% 73%)",
    dark: "hsl(304 100% 73%)",
    cssVar: "--accent",
    tailwindClass: "bg-accent",
  },
  {
    name: "Destructive",
    description: "Oracle Orange - Destructive/delete actions",
    light: "hsl(13 100% 63%)",
    dark: "hsl(13 100% 63%)",
    cssVar: "--destructive",
    tailwindClass: "bg-destructive",
  },
];

const feedbackColors = [
  {
    name: "Success",
    description: "Positive feedback, successful operations",
    light: "hsl(154 66% 66%)",
    dark: "hsl(154 66% 66%)",
    cssVar: "--success",
    tailwindClass: "bg-success",
  },
  {
    name: "Info",
    description: "Informational messages",
    light: "hsl(227 100% 50%)",
    dark: "hsl(227 100% 65%)",
    cssVar: "--info",
    tailwindClass: "bg-info",
  },
  {
    name: "Warning",
    description: "Warning messages, cautionary states",
    light: "hsl(47 100% 60%)",
    dark: "hsl(47 100% 60%)",
    cssVar: "--warning",
    tailwindClass: "bg-warning",
  },
  {
    name: "Error",
    description: "Error states and messages",
    light: "hsl(13 100% 63%)",
    dark: "hsl(13 100% 63%)",
    cssVar: "--error",
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
            <span className="px-3 py-1 bg-guild-green-400 text-white rounded-full text-sm font-medium">
              Active
            </span>
            <span className="px-3 py-1 bg-byzantine-blue-400 text-white rounded-full text-sm font-medium">
              New
            </span>
            <span className="px-3 py-1 bg-protocol-pink-400 text-white rounded-full text-sm font-medium">
              Featured
            </span>
            <span className="px-3 py-1 bg-oracle-orange-400 text-white rounded-full text-sm font-medium">
              Hot
            </span>
            <span className="px-3 py-1 bg-moveus-marigold-400 text-black rounded-full text-sm font-medium">
              Popular
            </span>
          </div>
        </div>

        {/* Cards with brand colors */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Cards with Brand Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 bg-linear-to-br from-guild-green-400 to-guild-green-600 rounded-lg text-white">
              <h4 className="font-bold text-lg mb-2">Guild Green</h4>
              <p className="text-sm opacity-90">
                Primary brand color for success and positive actions
              </p>
            </div>
            <div className="p-6 bg-linear-to-br from-byzantine-blue-400 to-byzantine-blue-600 rounded-lg text-white">
              <h4 className="font-bold text-lg mb-2">Byzantine Blue</h4>
              <p className="text-sm opacity-90">
                Secondary color for information and trust
              </p>
            </div>
            <div className="p-6 bg-linear-to-br from-protocol-pink-300 to-protocol-pink-500 rounded-lg text-white">
              <h4 className="font-bold text-lg mb-2">Protocol Pink</h4>
              <p className="text-sm opacity-90">
                Accent color for highlights and emphasis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
