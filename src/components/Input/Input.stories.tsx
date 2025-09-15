import type { Meta, StoryObj } from "@storybook/react-vite";
import { useCallback, useState } from "react";
import { css } from "styled-system/css";
import { flex } from "styled-system/patterns";

import { IconButton } from "../Button";
// import { FormField } from "../FormField";

// Local mock icons since the generated icon files are not available
const IconMagnifyingGlass = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const IconEye = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
  </svg>
);

const IconEyeSlash = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
  </svg>
);

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Input>;

/** The component with all default props other than the example placeholder. */
export const Default: Story = {
  args: {
    placeholder: "Placeholder",
    disabled: false,
  },
};

/**
 * Pass in an icon component or any React component that accepts a `className` prop and it will be
 * displayed to the left of the input text.
 */
export const WithLeadIcon: Story = {
  args: {
    placeholder: "Search...",
    LeadIcon: IconMagnifyingGlass,
  },
};

/**
 * Pass in an icon component or any React component that accepts a `className` prop and it will be
 * displayed to the right of the input text.
 *
 * In this example, a component is created that wraps an icon with `IconButton` and toggles the
 * password visibility on click. Since this custom component accepts a `className` as a prop and
 * forwards the prop to the underlying icon component, the component can be passed to `Input`'s
 * `TailIcon` prop.
 */
export const WithTailIcon: Story = {
  render: (props) => {
    const [isVisible, setIsVisible] = useState(false);

    const VisibilityToggle = useCallback(
      ({ className }: { className?: string }) => {
        const [icon, setIcon] = useState(
          <IconEyeSlash className={className} />
        );
        return (
          <IconButton
            size="sm"
            variant="text"
            className={css({ p: "0", h: "[unset]" })} // Remove padding from button
            ariaLabel="Toggle Visibility"
            onClick={() =>
              setIsVisible((prevIsVisible) => {
                setIcon(
                  prevIsVisible ? (
                    <IconEyeSlash className={className} />
                  ) : (
                    <IconEye className={className} />
                  )
                );
                return !prevIsVisible;
              })
            }
          >
            {icon}
          </IconButton>
        );
      },
      []
    );

    return (
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        TailIcon={VisibilityToggle}
      />
    );
  },
  args: {
    placeholder: "Password",
  },
};

export const AllSizes: Story = {
  render: (props) => (
    <div
      className={flex({
        align: "center",
        justify: "space-between",
        gap: "24",
        wrap: "wrap",
        "& > *": { w: "[unset]" },
      })}
    >
      {(["sm", "md", "lg"] as const).map((size) => (
        <Input key={size} size={size} {...props} />
      ))}
    </div>
  ),
  args: {
    placeholder: "Search...",
    LeadIcon: IconMagnifyingGlass,
  },
};

// export const AllStatesWithLabels: Story = {
//   render: (props) => (
//     <div className={flex({ gap: "24", wrap: "wrap" })}>
//       {formControlStateValues.map((state) => (
//         <FormField key={state} label={capitalize(state)} state={state}>
//           {(formControlProps) => <Input state={state} {...formControlProps} {...props} />}
//         </FormField>
//       ))}
//       <FormField label="Disabled">
//         {(formControlProps) => <Input disabled {...formControlProps} {...props} />}
//       </FormField>
//     </div>
//   ),
//   args: {
//     placeholder: "Placeholder",
//   },
// };

// export const WithLabelAndDescription: Story = {
//   render: (props) => (
//     <div className={stack({ gap: "24" })}>
//       {formControlStateValues.map((state) => (
//         <FormField key={state} label="Label" description="Description" state={state}>
//           {(formControlProps) => <Input state={state} {...formControlProps} {...props} />}
//         </FormField>
//       ))}
//       <FormField label="Label" description="Description">
//         {(formControlProps) => <Input disabled {...formControlProps} {...props} />}
//       </FormField>
//     </div>
//   ),
//   args: {},
// };
