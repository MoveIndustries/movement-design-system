import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "warning", "error", "success"],
      description: "The visual variant of the alert",
    },
    title: {
      control: "text",
      description: "Optional title for the alert",
    },
    children: {
      control: "text",
      description: "The main content of the alert",
    },
    dismissible: {
      control: "boolean",
      description: "Whether the alert can be dismissed",
    },
    onDismiss: {
      action: "dismissed",
      description: "Callback when the alert is dismissed",
    },
    icon: {
      control: false,
      description: "Custom icon component",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a default info alert with some important information.",
  },
};

export const WithTitle: Story = {
  args: {
    title: "Information",
    children:
      "This alert has a title to provide more context about the message.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert variant="info" title="Information">
        This is an informational alert that provides helpful context.
      </Alert>
      <Alert variant="warning" title="Warning">
        This is a warning alert that indicates potential issues.
      </Alert>
      <Alert variant="error" title="Error">
        This is an error alert that indicates something went wrong.
      </Alert>
      <Alert variant="success" title="Success">
        This is a success alert that indicates a positive outcome.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All four alert variants: info, warning, error, and success.",
      },
    },
  },
};

export const Dismissible: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return <button onClick={() => setIsVisible(true)}>Show Alert</button>;
    }

    return (
      <Alert
        variant="warning"
        title="Dismissible Alert"
        dismissible
        onDismiss={() => setIsVisible(false)}
      >
        This alert can be dismissed by clicking the X button.
      </Alert>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "A dismissible alert that can be closed by the user.",
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    variant: "info",
    title: "Detailed Information",
    children: `This is a longer alert message that demonstrates how the alert component handles more extensive content. It can contain multiple sentences and paragraphs while maintaining proper spacing and readability. The alert will automatically wrap text and maintain its visual hierarchy.`,
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with longer content to show text wrapping and spacing.",
      },
    },
  },
};

export const CustomIcon: Story = {
  render: () => {
    const CustomIcon = ({ className }: { className?: string }) => (
      <svg
        className={className}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );

    return (
      <Alert variant="success" title="Custom Icon" icon={CustomIcon}>
        This alert uses a custom star icon instead of the default success icon.
      </Alert>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Alert with a custom icon component.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      {
        id: 1,
        variant: "info" as const,
        title: "Info Alert",
        message: "This is an info alert.",
      },
      {
        id: 2,
        variant: "warning" as const,
        title: "Warning Alert",
        message: "This is a warning alert.",
      },
      {
        id: 3,
        variant: "error" as const,
        title: "Error Alert",
        message: "This is an error alert.",
      },
      {
        id: 4,
        variant: "success" as const,
        title: "Success Alert",
        message: "This is a success alert.",
      },
    ]);

    const dismissAlert = (id: number) => {
      setAlerts(alerts.filter((alert) => alert.id !== id));
    };

    const addAlert = () => {
      const variants = ["info", "warning", "error", "success"] as const;
      const randomVariant =
        variants[Math.floor(Math.random() * variants.length)];
      const newAlert = {
        id: Date.now(),
        variant: randomVariant,
        title: `${
          randomVariant.charAt(0).toUpperCase() + randomVariant.slice(1)
        } Alert`,
        message: `This is a new ${randomVariant} alert.`,
      };
      setAlerts([...alerts, newAlert]);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <button onClick={addAlert} style={{ alignSelf: "flex-start" }}>
          Add Random Alert
        </button>
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            dismissible
            onDismiss={() => dismissAlert(alert.id)}
          >
            {alert.message}
          </Alert>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example showing multiple dismissible alerts with add/remove functionality.",
      },
    },
  },
};

// Additional examples

export const FormValidation: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert variant="error" title="Validation Error">
        Please correct the following errors before submitting the form.
      </Alert>
      <Alert variant="success" title="Success">
        Your form has been submitted successfully!
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example of alerts used for form validation feedback.",
      },
    },
  },
};

export const SystemNotifications: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert variant="info" title="System Maintenance">
        Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.
      </Alert>
      <Alert variant="warning" title="Service Degradation">
        Some features may be temporarily unavailable due to high traffic.
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of alerts used for system notifications and maintenance.",
      },
    },
  },
};
