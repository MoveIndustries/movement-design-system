import { Source as BaseSource, SourceProps } from "@storybook/blocks";

// import { getPreferredTheme } from "../../../.storybook/themes";

/**
 * Provides the same functionality as `Source` from `@storybook/blocks` except
 * the correct theme (light/dark) will be selected automatically and the language
 * will be defaulted to tsx.
 */
export function Source(props: Omit<SourceProps, "dark">) {
  return <BaseSource dark={false} language="tsx" {...props} />;
}
