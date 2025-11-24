/**
 * Gradient Background Recipes
 * 
 * CSS classes for gradient backgrounds.
 * The styles are defined in recipes.css and automatically available when the design system is imported.
 * 
 * Usage:
 * import { gradientBackgroundClasses } from "@movementlabsxyz/movement-design-system";
 * 
 * <div className={gradientBackgroundClasses.mintCyan}>Content</div>
 */
export const gradientBackgroundClasses = {
  mintCyan: "gradient-mint-cyan",
  glassOverlay: "gradient-glass-overlay",
} as const;

/**
 * Utility function to get gradient background class names
 * 
 * @param variant - The gradient variant to use
 * @returns The CSS class name for the gradient
 */
export const getGradientClass = (variant: keyof typeof gradientBackgroundClasses) => {
  return gradientBackgroundClasses[variant];
};

