import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toaster, toast } from "../components/shadcn/sonner";
import { Button } from "../components/shadcn/button";

/**
 * Toast notifications for providing feedback on user actions or system events.
 * Built on top of Sonner with custom styling that matches the Movement design system.
 *
 * ## Features
 * - Four variants: info, success, warning, error
 * - Custom styling matching design system colors
 * - Auto-dismiss with configurable duration
 * - Stackable notifications
 * - Mobile responsive positioning
 * - Programmatic control (dismiss, update)
 *
 * ## Installation
 *
 * Add the `Toaster` component once at your app root:
 *
 * ```tsx
 * import { Toaster } from '@movement-ds/ui';
 *
 * function App() {
 *   return (
 *     <>
 *       <Toaster />
 *       <YourApp />
 *     </>
 *   );
 * }
 * ```
 *
 * ## Usage
 *
 * ### Simple String Messages
 * ```tsx
 * import { toast } from '@movement-ds/ui';
 *
 * toast.success("Operation completed!");
 * toast.error("Something went wrong!");
 * toast.warning("Please check your input");
 * toast.info("New feature available!");
 * ```
 *
 * ### With Title and Description
 * ```tsx
 * toast({
 *   variant: "success",
 *   title: "Success",
 *   description: "Your action was completed successfully.",
 * });
 * ```
 *
 * ### Custom Duration
 * ```tsx
 * toast.success("Quick message", { duration: 2000 });
 * toast.error("Important error", { duration: 10000 });
 * ```
 *
 * ### Persistent Toast (Manual Dismiss)
 * ```tsx
 * toast.info("Read this carefully", { duration: Infinity });
 * ```
 *
 * ### Update Existing Toast
 * ```tsx
 * const id = "my-toast";
 * toast({ variant: "info", description: "Loading...", id });
 * // Later...
 * toast({ variant: "success", description: "Done!", id });
 * ```
 *
 * ### Dismiss Toasts
 * ```tsx
 * // Dismiss specific toast
 * toast.dismiss("my-toast-id");
 *
 * // Dismiss all toasts
 * toast.dismiss();
 * ```
 *
 * ## Global Usage Pattern
 *
 * For application-wide toast notifications, use the global exports:
 *
 * ```tsx
 * // At app root
 * import { GlobalToaster } from '@movement-ds/ui';
 *
 * function App() {
 *   return (
 *     <>
 *       <GlobalToaster />
 *       <YourApp />
 *     </>
 *   );
 * }
 *
 * // Anywhere in your app
 * import { toast } from '@movement-ds/ui'; // or movementToast
 *
 * function MyComponent() {
 *   return (
 *     <button onClick={() => toast.success('Done!')}>
 *       Click me
 *     </button>
 *   );
 * }
 * ```
 */
const meta = {
  title: "movement-design-system/Toast",
  component: Toaster,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic toast with simple description text.
 */
export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster />
      <Button
        onClick={() =>
          toast({
            variant: "info",
            description: "Event has been created",
          })
        }
      >
        Show Toast
      </Button>
    </div>
  ),
};

/**
 * Toast with both title and description for more context.
 */
export const WithTitleAndDescription: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster />
      <Button
        onClick={() =>
          toast({
            variant: "info",
            title: "Event has been created",
            description: "Monday, January 3rd at 6:00pm",
          })
        }
      >
        Show Toast with Title
      </Button>
    </div>
  ),
};

/**
 * All four toast variants demonstrating the different visual styles and colors.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Toaster />
      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={() => toast.info("This is an info message")}>
          Info Toast
        </Button>
        <Button onClick={() => toast.success("Successfully saved!")}>
          Success Toast
        </Button>
        <Button onClick={() => toast.warning("Please check your input")}>
          Warning Toast
        </Button>
        <Button onClick={() => toast.error("Something went wrong!")}>
          Error Toast
        </Button>
      </div>
    </div>
  ),
};

/**
 * Demonstrates the method-based API for quick notifications.
 * You can pass either a simple string or an object with title and description.
 */
export const MethodBasedAPI: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Toaster />
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold mb-2">Simple String Messages</h3>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => toast.success("Done!")}>
            Success
          </Button>
          <Button size="sm" onClick={() => toast.error("Error occurred")}>
            Error
          </Button>
          <Button size="sm" onClick={() => toast.warning("Be careful")}>
            Warning
          </Button>
          <Button size="sm" onClick={() => toast.info("FYI")}>
            Info
          </Button>
        </div>

        <h3 className="text-lg font-semibold mt-4 mb-2">With Title & Description</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() =>
              toast.success({
                title: "Success!",
                description: "Your action was completed successfully.",
              })
            }
          >
            Success Object
          </Button>
          <Button
            size="sm"
            onClick={() =>
              toast.error({
                title: "Error",
                description: "Something went wrong. Please try again.",
              })
            }
          >
            Error Object
          </Button>
        </div>
      </div>
    </div>
  ),
};

/**
 * Toast with custom duration. Default is 5000ms (5 seconds).
 * You can set it to any value, including Infinity for persistent toasts.
 */
export const CustomDuration: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          onClick={() =>
            toast.info("Quick message (2s)", { duration: 2000 })
          }
        >
          2 Second Toast
        </Button>
        <Button
          onClick={() =>
            toast.success("Normal duration (5s)")
          }
        >
          5 Second Toast (Default)
        </Button>
        <Button
          onClick={() =>
            toast.warning("Long message (10s)", { duration: 10000 })
          }
        >
          10 Second Toast
        </Button>
        <Button
          onClick={() =>
            toast.error("Persistent - must close manually", {
              duration: Infinity,
            })
          }
        >
          Persistent Toast (∞)
        </Button>
      </div>
    </div>
  ),
};

/**
 * Multiple toasts can be displayed simultaneously. They stack vertically
 * and can all be dismissed at once using toast.dismiss().
 */
export const MultipleToasts: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Toaster />
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => {
            toast.info("First notification");
            setTimeout(() => toast.success("Second notification"), 100);
            setTimeout(() => toast.warning("Third notification"), 200);
            setTimeout(() => toast.error("Fourth notification"), 300);
          }}
        >
          Create Multiple Toasts
        </Button>
        <Button variant="outline" onClick={() => toast.dismiss()}>
          Dismiss All Toasts
        </Button>
      </div>
    </div>
  ),
};

/**
 * Update an existing toast by providing the same id, or programmatically
 * dismiss a specific toast using toast.dismiss(id).
 */
export const UpdateAndDismiss: Story = {
  render: () => {
    let count = 0;
    const toastId = "update-demo";

    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Toaster />
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => {
              count++;
              toast({
                variant: "info",
                title: "Toast Update",
                description: `Revision ${count}`,
                id: toastId,
              });
            }}
          >
            Create/Update Toast
          </Button>
          <Button variant="outline" onClick={() => toast.dismiss(toastId)}>
            Dismiss This Toast
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Example showing a typical loading → success pattern using toast updates.
 */
export const LoadingPattern: Story = {
  render: () => (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster />
      <Button
        onClick={() => {
          const id = "loading-toast";
          
          // Show loading state
          toast({
            variant: "info",
            description: "Processing your request...",
            id,
            duration: Infinity,
          });

          // Simulate API call
          setTimeout(() => {
            // Update to success
            toast({
              variant: "success",
              title: "Complete!",
              description: "Your request was processed successfully.",
              id,
              duration: 5000,
            });
          }, 2000);
        }}
      >
        Simulate Loading
      </Button>
    </div>
  ),
};
