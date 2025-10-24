import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { css } from "styled-system/css";

import { Button } from "../Button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./Modal";

// Mock icon components for modal demonstrations
const IconWarning = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L1 21h22L12 2zm0 3.17L19.83 19H4.17L12 5.17zM11 16h2v2h-2zm0-6h2v4h-2z" />
  </svg>
);

const IconInfo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);

const IconCheckCircle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

const IconSettings = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </svg>
);

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the modal is open",
    },
    onClose: {
      action: "closed",
      description: "Callback when the modal should close",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "The size of the modal",
    },
    closeOnBackdropClick: {
      control: "boolean",
      description: "Whether the modal can be closed by clicking the backdrop",
    },
    closeOnEscape: {
      control: "boolean",
      description: "Whether the modal can be closed by pressing the escape key",
    },
    children: {
      control: false,
      description: "The content of the modal",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="Modal Title" />
          <ModalBody>
            <p>This is the modal content. You can put any content here.</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Info Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="Information" icon={IconInfo} />
          <ModalBody>
            <p>
              This modal includes an icon in the header to provide visual
              context about the type of information being displayed.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Got it</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modal headers can include icons to provide visual context and improve user experience.",
      },
    },
  },
};

export const WarningModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Warning</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="Warning" icon={IconWarning} />
          <ModalBody>
            <p>
              This action cannot be undone. Are you sure you want to proceed?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button color="danger" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Warning modals use warning icons and destructive action buttons to indicate potentially harmful operations.",
      },
    },
  },
};

export const SuccessModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Show Success</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader title="Success!" icon={IconCheckCircle} />
          <ModalBody>
            <p>Your changes have been saved successfully.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Continue</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Success modals provide positive feedback to users when operations complete successfully.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);

    const sizes = [
      { key: "sm", label: "Small", description: "400px max width" },
      { key: "md", label: "Medium", description: "500px max width" },
      { key: "lg", label: "Large", description: "700px max width" },
      { key: "xl", label: "Extra Large", description: "900px max width" },
      { key: "full", label: "Full Screen", description: "95% viewport" },
    ];

    return (
      <>
        <div
          className={css({
            display: "flex",
            gap: "3",
            flexWrap: "wrap",
          })}
        >
          {sizes.map((size) => (
            <Button
              key={size.key}
              onClick={() => setOpenSize(size.key)}
              size="sm"
            >
              {size.label}
            </Button>
          ))}
        </div>

        {sizes.map((size) => (
          <Modal
            key={size.key}
            open={openSize === size.key}
            onClose={() => setOpenSize(null)}
            size={size.key as any}
          >
            <ModalHeader title={`${size.label} Modal`} />
            <ModalBody>
              <p>
                This is a {size.label.toLowerCase()} modal with a maximum width
                of {size.description}.
              </p>
              <p>
                The modal content can be as long or as short as needed, and it
                will automatically handle scrolling when the content exceeds the
                available space.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </ModalFooter>
          </Modal>
        ))}
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modals come in five different sizes to accommodate various content types and use cases.",
      },
    },
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Long Content Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <ModalHeader title="Terms and Conditions" icon={IconSettings} />
          <ModalBody>
            <div
              className={css({
                spaceY: "4",
              })}
            >
              <h3 className={css({ fontSize: "md", fontWeight: "semibold" })}>
                Introduction
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <h3 className={css({ fontSize: "md", fontWeight: "semibold" })}>
                User Responsibilities
              </h3>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <h3 className={css({ fontSize: "md", fontWeight: "semibold" })}>
                Privacy Policy
              </h3>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
              <h3 className={css({ fontSize: "md", fontWeight: "semibold" })}>
                Contact Information
              </h3>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modals handle long content gracefully with automatic scrolling in the body area.",
      },
    },
  },
};

export const NoBackdropClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Open Modal (No Backdrop Close)
        </Button>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnBackdropClick={false}
        >
          <ModalHeader title="Important Notice" icon={IconWarning} />
          <ModalBody>
            <p>
              This modal cannot be closed by clicking the backdrop. You must use
              the close button or the action buttons below.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>I Understand</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modals can be configured to prevent closing when clicking the backdrop, useful for important notices.",
      },
    },
  },
};

export const NoEscapeClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Open Modal (No Escape Close)
        </Button>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnEscape={false}
        >
          <ModalHeader title="Critical Action" icon={IconWarning} />
          <ModalBody>
            <p>
              This modal cannot be closed by pressing the Escape key. You must
              use the close button or complete the action below.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsOpen(false)}>Complete Action</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modals can be configured to prevent closing with the Escape key, useful for critical actions.",
      },
    },
  },
};

export const InteractiveModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });

    const handleSubmit = () => {
      alert(`Form submitted: ${formData.name} - ${formData.email}`);
      setIsOpen(false);
      setFormData({ name: "", email: "" });
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)} size="md">
          <ModalHeader title="Contact Form" icon={IconInfo} />
          <ModalBody>
            <div
              className={css({
                spaceY: "4",
              })}
            >
              <div>
                <label
                  className={css({
                    display: "block",
                    fontSize: "sm",
                    fontWeight: "medium",
                    mb: "2",
                  })}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={css({
                    w: "full",
                    px: "3",
                    py: "2",
                    border: "1px solid",
                    borderColor: "neutrals.blackAlpha.300",
                    borderRadius: "md",
                    fontSize: "sm",
                    _focus: {
                      outline: "none",
                      borderColor: "byzantine-blue.400",
                      boxShadow: "0 0 0 1px var(--colors-byzantine-blue-400)",
                    },
                  })}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  className={css({
                    display: "block",
                    fontSize: "sm",
                    fontWeight: "medium",
                    mb: "2",
                  })}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={css({
                    w: "full",
                    px: "3",
                    py: "2",
                    border: "1px solid",
                    borderColor: "neutrals.blackAlpha.300",
                    borderRadius: "md",
                    fontSize: "sm",
                    _focus: {
                      outline: "none",
                      borderColor: "byzantine-blue.400",
                      boxShadow: "0 0 0 1px var(--colors-byzantine-blue-400)",
                    },
                  })}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modals can contain interactive forms and complex content with proper state management.",
      },
    },
  },
};
