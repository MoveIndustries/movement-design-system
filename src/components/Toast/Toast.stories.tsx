import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { css } from "styled-system/css";
import { stack } from "styled-system/patterns";

import { Button } from "../Buttons";
import { Toast } from "./Toast";
import { toastVariants } from "./types";
import { createToaster } from "./Toaster";

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
};
export default meta;

type Story = StoryObj<typeof Toast>;

// NOTE:
// In the stories below, we create individual Toaster instances for each story so that
// opening a toast in one story doesn't open it in all of them. `createToaster` is internal
// to this package and won't be available to consumers. If you're a consumer, just import
// `Toaster` and `toast` from the package directly.

export const BasicUsage: Story = {
  render: (props) => {
    const [Toaster, toast] = createToaster();
    return (
      <div className={css({ pb: "120" })}>
        <Toaster />
        <Button onClick={() => toast(props)}>Create Toast</Button>
      </div>
    );
  },
  args: {
    variant: "info",
    title: "Toast Title",
    description: "This is the description of the toast message.",
  },
};

export const AllVariants: Story = {
  render: (props) => {
    const [Toaster, toast] = createToaster();
    return (
      <div className={stack({ gap: "16", align: "flex-start", pb: "96" })}>
        <Toaster />
        {toastVariants.map((variant) => (
          <Button
            key={variant}
            onClick={() =>
              toast({ ...props, title: capitalize(variant), variant })
            }
          >
            {capitalize(variant)} Toast
          </Button>
        ))}
      </div>
    );
  },
  args: {
    description: "This is the description of the toast message.",
  },
};

/**
 * By passing `duration: Infinity` to the `toast` function, you can create a toast message that
 * will not automatically be dismissed.
 */
export const PersistentToast: Story = {
  render: (props) => {
    const [Toaster, toast] = createToaster();
    return (
      <div className={css({ pb: "120" })}>
        <Toaster />
        <Button onClick={() => toast({ ...props, duration: Infinity })}>
          Create Toast
        </Button>
      </div>
    );
  },
  args: {
    variant: "info",
    title: "I'm persistent",
    description: "You'll have to close me yourself.",
  },
};

/**
 * You can pass a function that returns a `ReactNode` to `toast`'s `description` field to allow for
 * complex text formatting in the toast message's description. For example, you can make a certain
 * word bold or embed a link.
 */
export const WithComplexDescription: Story = {
  render: BasicUsage.render,
  args: {
    ...BasicUsage.args,
    description: () => (
      <>
        This is a <i>complex</i> <strong>description</strong>
      </>
    ),
  },
};

/**
 * If an id is passed to the `toast` function, any subsequent calls to the toast function with that
 * id will update the toast if it is still visible instead of creating a new one.
 *
 * Additionally, `toast.dismiss` can be called to programmatically dismiss the toast early.
 */
export const UpdateAndRemoveToast: Story = {
  render: (args) => {
    const [[Toaster, toast]] = useState(createToaster());
    const [count, setCount] = useState(0);
    const id = useId();

    const upsertToast = () => {
      toast({
        id,
        ...args,
        description: `Revision ${count + 1}`,
      });
      setCount((prev) => prev + 1);
    };

    const removeToast = () => {
      toast.dismiss(id);
    };

    return (
      <div className={stack({ pb: "120", gap: "16", align: "flex-start" })}>
        <Toaster />
        <Button onClick={upsertToast}>Upsert Toast</Button>
        <Button onClick={removeToast}>Remove Toast</Button>
      </div>
    );
  },
  args: {
    variant: "info",
    title: "Test Toast",
  },
};
