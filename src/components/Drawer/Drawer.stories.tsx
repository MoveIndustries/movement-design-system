import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { css } from "styled-system/css";

import { Button } from "../Button";
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "./Drawer";

// Mock icon components for drawer demonstrations
const IconMenu = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </svg>
);

const IconSettings = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </svg>
);

const IconUser = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const IconHome = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const IconFilter = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
  </svg>
);

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Whether the drawer is open",
    },
    onClose: {
      action: "closed",
      description: "Callback when the drawer should close",
    },
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "The placement of the drawer",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "The size of the drawer",
    },
    closeOnBackdropClick: {
      control: "boolean",
      description: "Whether the drawer can be closed by clicking the backdrop",
    },
    closeOnEscape: {
      control: "boolean",
      description:
        "Whether the drawer can be closed by pressing the escape key",
    },
    children: {
      control: false,
      description: "The content of the drawer",
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
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerHeader title="Drawer Title" />
          <DrawerBody>
            <p>This is the drawer content. You can put any content here.</p>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Settings Drawer</Button>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerHeader title="Settings" icon={IconSettings} />
          <DrawerBody>
            <p>
              This drawer includes an icon in the header to provide visual
              context about the type of content being displayed.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drawer headers can include icons to provide visual context and improve user experience.",
      },
    },
  },
};

export const AllPlacements: Story = {
  render: () => {
    const [openPlacement, setOpenPlacement] = useState<string | null>(null);

    const placements = [
      { key: "top", label: "Top", description: "Slides down from top" },
      { key: "bottom", label: "Bottom", description: "Slides up from bottom" },
      { key: "left", label: "Left", description: "Slides in from left" },
      { key: "right", label: "Right", description: "Slides in from right" },
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
          {placements.map((placement) => (
            <Button
              key={placement.key}
              onClick={() => setOpenPlacement(placement.key)}
              size="sm"
            >
              {placement.label}
            </Button>
          ))}
        </div>

        {placements.map((placement) => (
          <Drawer
            key={placement.key}
            open={openPlacement === placement.key}
            onClose={() => setOpenPlacement(null)}
            placement={placement.key as any}
          >
            <DrawerHeader title={`${placement.label} Drawer`} />
            <DrawerBody>
              <p>
                This drawer slides in from the {placement.label.toLowerCase()}{" "}
                side.
                {placement.description}
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setOpenPlacement(null)}>Close</Button>
            </DrawerFooter>
          </Drawer>
        ))}
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drawers can slide in from any of the four sides: top, bottom, left, or right.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);

    const sizes = [
      { key: "sm", label: "Small", description: "300px" },
      { key: "md", label: "Medium", description: "400px" },
      { key: "lg", label: "Large", description: "500px" },
      { key: "xl", label: "Extra Large", description: "600px" },
      { key: "full", label: "Full Screen", description: "100% viewport" },
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
          <Drawer
            key={size.key}
            open={openSize === size.key}
            onClose={() => setOpenSize(null)}
            size={size.key as any}
          >
            <DrawerHeader title={`${size.label} Drawer`} />
            <DrawerBody>
              <p>
                This is a {size.label.toLowerCase()} drawer with a size of{" "}
                {size.description}.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <Button onClick={() => setOpenSize(null)}>Close</Button>
            </DrawerFooter>
          </Drawer>
        ))}
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drawers come in five different sizes to accommodate various content types and use cases.",
      },
    },
  },
};

export const NavigationDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const navigationItems = [
      { icon: IconHome, label: "Home", active: true },
      { icon: IconUser, label: "Profile", active: false },
      { icon: IconSettings, label: "Settings", active: false },
      { icon: IconFilter, label: "Filters", active: false },
    ];

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Navigation</Button>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)} placement="left">
          <DrawerHeader title="Navigation" icon={IconMenu} />
          <DrawerBody>
            <nav
              className={css({
                spaceY: "2",
              })}
            >
              {navigationItems.map((item) => (
                <button
                  key={item.label}
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "3",
                    w: "full",
                    px: "3",
                    py: "2",
                    borderRadius: "md",
                    textAlign: "left",
                    fontSize: "sm",
                    fontWeight: "medium",
                    color: item.active
                      ? "moveus-marigold.600"
                      : "neutrals.blackAlpha.700",
                    bg: item.active ? "moveus-marigold.50" : "transparent",
                    transition: "all 0.2s ease",
                    _hover: {
                      bg: item.active
                        ? "moveus-marigold.100"
                        : "neutrals.blackAlpha.100",
                    },
                  })}
                >
                  <item.icon
                    className={css({
                      w: "5",
                      h: "5",
                      color: item.active
                        ? "moveus-marigold.600"
                        : "neutrals.blackAlpha.600",
                    })}
                  />
                  {item.label}
                </button>
              ))}
            </nav>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drawers are commonly used for navigation menus, especially on mobile devices.",
      },
    },
  },
};

export const FilterDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
      category: "",
      priceRange: "",
      availability: false,
    });

    const handleFilterChange = (key: string, value: any) => {
      setFilters({ ...filters, [key]: value });
    };

    const handleApplyFilters = () => {
      alert(`Filters applied: ${JSON.stringify(filters)}`);
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Filters</Button>
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          placement="right"
        >
          <DrawerHeader title="Filters" icon={IconFilter} />
          <DrawerBody>
            <div
              className={css({
                spaceY: "6",
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
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
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
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="home">Home & Garden</option>
                </select>
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
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) =>
                    handleFilterChange("priceRange", e.target.value)
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
                >
                  <option value="">Any Price</option>
                  <option value="0-25">$0 - $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100+">$100+</option>
                </select>
              </div>

              <div>
                <label
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "2",
                    fontSize: "sm",
                    fontWeight: "medium",
                    cursor: "pointer",
                  })}
                >
                  <input
                    type="checkbox"
                    checked={filters.availability}
                    onChange={(e) =>
                      handleFilterChange("availability", e.target.checked)
                    }
                    className={css({
                      w: "4",
                      h: "4",
                      accentColor: "moveus-marigold.400",
                    })}
                  />
                  In Stock Only
                </label>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drawers are perfect for filter panels and secondary content that doesn't need to be always visible.",
      },
    },
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          Open Long Content Drawer
        </Button>
        <Drawer open={isOpen} onClose={() => setIsOpen(false)} size="lg">
          <DrawerHeader title="Terms and Conditions" icon={IconSettings} />
          <DrawerBody>
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
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outlined" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drawers handle long content gracefully with automatic scrolling in the body area.",
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
          Open Drawer (No Backdrop Close)
        </Button>
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          closeOnBackdropClick={false}
        >
          <DrawerHeader title="Important Notice" icon={IconSettings} />
          <DrawerBody>
            <p>
              This drawer cannot be closed by clicking the backdrop. You must
              use the close button or the action buttons below.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>I Understand</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Drawers can be configured to prevent closing when clicking the backdrop, useful for important notices.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "6",
        alignItems: "flex-start",
      })}
    >
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>Default:</span>
        <Button size="sm">Open Drawer</Button>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>With Icon:</span>
        <Button size="sm">Open Drawer</Button>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>Large:</span>
        <Button size="sm">Open Drawer</Button>
      </div>
      <div
        className={css({
          display: "flex",
          alignItems: "center",
          gap: "4",
        })}
      >
        <span className={css({ w: "20", fontSize: "sm" })}>Left:</span>
        <Button size="sm">Open Drawer</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "All the different states and variations of Drawer displayed together.",
      },
    },
  },
};
