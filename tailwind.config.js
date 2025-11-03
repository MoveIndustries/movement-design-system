/**
 * Tailwind CSS v4 Configuration
 * 
 * Tailwind v4 uses automatic content detection, so no content array is needed.
 * All theme configuration is in src/theme.css using the @theme directive.
 * 
 * @see src/theme.css for theme configuration
 * @see https://tailwindcss.com/blog/tailwindcss-v4
 */
import shadcnPreset from './tailwind.preset.js'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [shadcnPreset],
  // Content detection is automatic in v4
}

