import { Heading } from "@storybook/blocks";
import { styled } from "@storybook/theming";

// This component is copy-pasted from Storybook's Github repo since they don't export it
// https://github.com/storybookjs/storybook/blob/next/code/ui/blocks/src/blocks/Stories.tsx

export const SubduedHeading: typeof Heading = styled(Heading)(({ theme }) => ({
  fontSize: `${theme.typography.size.s2 - 1}px`,
  fontWeight: theme.typography.weight.bold,
  lineHeight: "16px",
  letterSpacing: "0.35em",
  textTransform: "uppercase",
  color: theme.textMutedColor as string,
  border: 0,
  marginBottom: "12px",

  "&:first-of-type": {
    // specificity issue
    marginTop: "56px",
  },
}));
