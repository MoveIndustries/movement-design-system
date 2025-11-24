/**
 * Gradient Border Recipes
 * 
 * CSS classes for gradient borders using mask technique.
 * The styles are defined in recipes.css and automatically available when the design system is imported.
 * 
 * Usage:
 * import { gradientBorderClasses } from "@movementlabsxyz/movement-design-system";
 * 
 * <div className={gradientBorderClasses.glow}>Content</div>
 */
export const gradientBorderClasses = {
  glow: "gradient-border-glow",
  error: "gradient-border-error",
} as const;

/**
 * Glass Background Recipes
 * 
 * CSS classes for glass morphism backgrounds with backdrop blur.
 * The styles are defined in recipes.css and automatically available when the design system is imported.
 * 
 * Usage:
 * import { glassBackgroundClasses } from "@movementlabsxyz/movement-design-system";
 * 
 * <div className={glassBackgroundClasses.dark}>Content</div>
 */
export const glassBackgroundClasses = {
  dark: "glass-background-dark",
  light: "glass-background-light",
} as const;
