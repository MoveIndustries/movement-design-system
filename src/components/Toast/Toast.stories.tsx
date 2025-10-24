import type { Meta, StoryObj } from "@storybook/react-vite";
import { useId, useState } from "react";
import { css } from "styled-system/css";
import { stack } from "styled-system/patterns";

import { Button } from "../Button";
import { Toast } from "./Toast";
import { toastVariants } from "./types";
import { createToaster } from "./Toaster";
import { GlobalToaster, toast as globalToast } from "./global-toast";

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

export const MethodBasedAPI: Story = {
  render: () => {
    const [Toaster, toast] = createToaster();
    return (
      <div className={stack({ gap: "16", align: "flex-start", pb: "96" })}>
        <Toaster />
        <Button
          onClick={() => toast.success("Operation completed successfully!")}
        >
          Success Toast (String)
        </Button>
        <Button onClick={() => toast.error("Something went wrong!")}>
          Error Toast (String)
        </Button>
        <Button onClick={() => toast.warning("Please check your input")}>
          Warning Toast (String)
        </Button>
        <Button onClick={() => toast.info("New feature available!")}>
          Info Toast (String)
        </Button>
        <Button
          onClick={() =>
            toast.success({
              title: "Success!",
              description: "Your action was completed successfully.",
            })
          }
        >
          Success Toast (Object)
        </Button>
        <Button
          onClick={() =>
            toast.error({
              title: "Error",
              description: "Something went wrong. Please try again.",
            })
          }
        >
          Error Toast (Object)
        </Button>
      </div>
    );
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
        ...args,
        id,
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

export const MultipleToasts: Story = {
  render: () => {
    const [Toaster, toast] = createToaster();

    const createMultipleToasts = () => {
      // Create several toasts quickly to test stacking
      toast({
        variant: "info",
        title: "Info Toast",
        description: "This is the first toast message.",
      });

      setTimeout(() => {
        toast({
          variant: "success",
          title: "Success Toast",
          description: "This is the second toast message.",
        });
      }, 100);

      setTimeout(() => {
        toast({
          variant: "warning",
          title: "Warning Toast",
          description: "This is the third toast message.",
        });
      }, 200);

      setTimeout(() => {
        toast({
          variant: "error",
          title: "Error Toast",
          description: "This is the fourth toast message.",
        });
      }, 300);
    };

    return (
      <div className={stack({ pb: "120", gap: "16", align: "flex-start" })}>
        <Toaster />
        <Button onClick={createMultipleToasts}>Create Multiple Toasts</Button>
        <Button onClick={() => toast.dismiss()}>Dismiss All Toasts</Button>
      </div>
    );
  },
};

export const MethodBasedMultipleToasts: Story = {
  render: () => {
    const [Toaster, toast] = createToaster();

    const createMultipleToasts = () => {
      // Create several toasts quickly using method-based API
      toast.info("This is the first toast message.");

      setTimeout(() => {
        toast.success("This is the second toast message.");
      }, 100);

      setTimeout(() => {
        toast.warning("This is the third toast message.");
      }, 200);

      setTimeout(() => {
        toast.error("This is the fourth toast message.");
      }, 300);
    };

    return (
      <div className={stack({ pb: "120", gap: "16", align: "flex-start" })}>
        <Toaster />
        <Button onClick={createMultipleToasts}>
          Create Multiple Toasts (Method API)
        </Button>
        <Button onClick={() => toast.dismiss()}>Dismiss All Toasts</Button>
      </div>
    );
  },
};

/**
 * This story demonstrates the global toast usage pattern that would be used in a real application.
 * The GlobalToaster is set up once at the root level, and the global toast functions can be used
 * anywhere in the component tree.
 */
export const GlobalToastUsage: Story = {
  render: () => {
    return (
      <div className={stack({ pb: "120", gap: "16", align: "flex-start" })}>
        {/* In a real app, this would be at the root level */}
        <GlobalToaster />

        <div className={stack({ gap: "8", align: "flex-start" })}>
          <h3 className={css({ textStyle: "heading.regular.md", mb: "2" })}>
            Global Toast Usage
          </h3>
          <p
            className={css({
              textStyle: "body-regular.sm",
              color: "neutrals.gray.600",
            })}
          >
            These buttons use the global toast system. The GlobalToaster is set
            up once at the root level.
          </p>
        </div>

        <Button onClick={() => globalToast.success("Global success message!")}>
          Global Success Toast
        </Button>
        <Button onClick={() => globalToast.error("Global error message!")}>
          Global Error Toast
        </Button>
        <Button onClick={() => globalToast.warning("Global warning message!")}>
          Global Warning Toast
        </Button>
        <Button onClick={() => globalToast.info("Global info message!")}>
          Global Info Toast
        </Button>
        <Button
          onClick={() =>
            globalToast.success({
              title: "Global Success",
              description:
                "This is a global success toast with title and description.",
            })
          }
        >
          Global Success (Object)
        </Button>
        <Button onClick={() => globalToast.dismiss()}>
          Dismiss All Global Toasts
        </Button>
      </div>
    );
  },
};
