import type { Meta, StoryObj } from "@storybook/react";
import { flex, stack } from "styled-system/patterns";
import { css } from "styled-system/css";

import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "condensed"],
    },
    hoverEffect: {
      control: { type: "boolean" },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

export const BasicUsage: Story = {
  args: {
    children: "I am a glass morphism card",
  },
};

export const WithHoverEffect: Story = {
  args: {
    children: "Hover me to see the effect",
    hoverEffect: true,
  },
};

export const AllVariants: Story = {
  render: (props) => (
    <div className={flex({ wrap: "wrap", gap: "24", align: "center" })}>
      <Card {...props} variant="default">
        Default Card
      </Card>
      <Card {...props} variant="condensed">
        Condensed Card
      </Card>
      <Card {...props} variant="default" hoverEffect>
        Default with Hover
      </Card>
      <Card {...props} variant="condensed" hoverEffect>
        Condensed with Hover
      </Card>
    </div>
  ),
};

export const ContentShowcase: Story = {
  render: () => (
    <div className={stack({ gap: "6" })}>
      <div className={stack({ gap: "4" })}>
        <h2
          className={css({
            color: "white",
            fontSize: "lg",
            fontWeight: "bold",
          })}
        >
          Article Card
        </h2>
        <Card variant="default" hoverEffect>
          <div className={css({ color: "white" })}>
            <h3
              className={css({ fontSize: "lg", fontWeight: "bold", mb: "2" })}
            >
              Glass Morphism Design
            </h3>
            <p
              className={css({
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "sm",
                mb: "4",
              })}
            >
              Published on January 1, 2024
            </p>
            <p className={css({ mb: "4" })}>
              This card demonstrates the beautiful glass morphism effect with
              backdrop blur, subtle transparency, and smooth hover transitions.
              The design creates a modern, elegant interface that feels both
              sophisticated and accessible.
            </p>
            <div
              className={flex({
                gap: "4",
                justify: "space-between",
                align: "center",
              })}
            >
              <span
                className={css({
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "sm",
                })}
              >
                3 min read
              </span>
              <button
                className={css({
                  px: "4",
                  py: "2",
                  bg: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "sm",
                  fontWeight: "medium",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)",
                  _hover: { bg: "rgba(255, 255, 255, 0.3)" },
                })}
              >
                Read More
              </button>
            </div>
          </div>
        </Card>
      </div>

      <div className={stack({ gap: "4" })}>
        <h2
          className={css({
            color: "white",
            fontSize: "lg",
            fontWeight: "bold",
          })}
        >
          Profile Card
        </h2>
        <Card variant="default" hoverEffect>
          <div className={css({ color: "white" })}>
            <div className={flex({ gap: "4", align: "center" })}>
              <div
                className={css({
                  w: "16",
                  h: "16",
                  bg: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "full",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "lg",
                  fontWeight: "bold",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                })}
              >
                JD
              </div>
              <div>
                <h4
                  className={css({
                    fontSize: "md",
                    fontWeight: "bold",
                    mb: "1",
                  })}
                >
                  John Doe
                </h4>
                <p
                  className={css({
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "sm",
                  })}
                >
                  Software Engineer
                </p>
                <p
                  className={css({
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "sm",
                  })}
                >
                  john.doe@example.com
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className={stack({ gap: "4" })}>
        <h2
          className={css({
            color: "white",
            fontSize: "lg",
            fontWeight: "bold",
          })}
        >
          Stats Cards
        </h2>
        <div className={flex({ gap: "4", wrap: "wrap" })}>
          <Card variant="condensed" hoverEffect>
            <div className={css({ color: "white", textAlign: "center" })}>
              <div
                className={css({
                  fontSize: "2xl",
                  fontWeight: "bold",
                  mb: "2",
                })}
              >
                1,234
              </div>
              <div
                className={css({
                  fontSize: "sm",
                  color: "rgba(255, 255, 255, 0.8)",
                })}
              >
                Total Users
              </div>
            </div>
          </Card>
          <Card variant="condensed" hoverEffect>
            <div className={css({ color: "white", textAlign: "center" })}>
              <div
                className={css({
                  fontSize: "2xl",
                  fontWeight: "bold",
                  mb: "2",
                })}
              >
                567
              </div>
              <div
                className={css({
                  fontSize: "sm",
                  color: "rgba(255, 255, 255, 0.8)",
                })}
              >
                Active Users
              </div>
            </div>
          </Card>
          <Card variant="condensed" hoverEffect>
            <div className={css({ color: "white", textAlign: "center" })}>
              <div
                className={css({
                  fontSize: "2xl",
                  fontWeight: "bold",
                  mb: "2",
                })}
              >
                89%
              </div>
              <div
                className={css({
                  fontSize: "sm",
                  color: "rgba(255, 255, 255, 0.8)",
                })}
              >
                Success Rate
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  ),
};

export const GridLayout: Story = {
  render: () => (
    <div className={stack({ gap: "6" })}>
      <h2
        className={css({ color: "white", fontSize: "lg", fontWeight: "bold" })}
      >
        Card Grid
      </h2>
      <div
        className={css({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "16px",
          maxWidth: "800px",
        })}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <Card
            key={i}
            hoverEffect
            variant={i % 2 === 0 ? "default" : "condensed"}
          >
            <div className={css({ color: "white", textAlign: "center" })}>
              Card {i + 1}
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),
};
