import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./Carousel";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
      description: "Array of React nodes to display as slides",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleCards = [
  {
    title: "Card 1",
    content: "This is the first card content",
    color: "#FF6B6B",
  },
  {
    title: "Card 2",
    content: "This is the second card content",
    color: "#4ECDC4",
  },
  {
    title: "Card 3",
    content: "This is the third card content",
    color: "#45B7D1",
  },
  {
    title: "Card 4",
    content: "This is the fourth card content",
    color: "#96CEB4",
  },
  {
    title: "Card 5",
    content: "This is the fifth card content",
    color: "#FFEAA7",
  },
];

const Card = ({
  title,
  content,
  color,
}: {
  title: string;
  content: string;
  color: string;
}) => (
  <div
    style={{
      width: "300px",
      height: "200px",
      backgroundColor: color,
      borderRadius: "8px",
      padding: "20px",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    <h3 style={{ margin: "0 0 12px 0", fontSize: "18px", fontWeight: "600" }}>
      {title}
    </h3>
    <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>{content}</p>
  </div>
);

export const Default: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Carousel>
        {sampleCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </Carousel>
    </div>
  ),
};

export const FewCards: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Carousel>
        {sampleCards.slice(0, 2).map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </Carousel>
    </div>
  ),
};

export const ManyCards: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Carousel>
        {[...sampleCards, ...sampleCards].map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </Carousel>
    </div>
  ),
};

export const TextContent: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Carousel>
        <div
          style={{
            width: "400px",
            padding: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: "0 0 16px 0", color: "#333" }}>Welcome</h2>
          <p style={{ margin: 0, color: "#666", lineHeight: "1.6" }}>
            This is a welcome message slide with some text content.
          </p>
        </div>

        <div
          style={{
            width: "400px",
            padding: "40px",
            backgroundColor: "#e9ecef",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: "0 0 16px 0", color: "#333" }}>Features</h2>
          <p style={{ margin: 0, color: "#666", lineHeight: "1.6" }}>
            Discover all the amazing features we have to offer.
          </p>
        </div>

        <div
          style={{
            width: "400px",
            padding: "40px",
            backgroundColor: "#dee2e6",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: "0 0 16px 0", color: "#333" }}>Get Started</h2>
          <p style={{ margin: 0, color: "#666", lineHeight: "1.6" }}>
            Ready to begin? Let's get you started right away.
          </p>
        </div>
      </Carousel>
    </div>
  ),
};

export const MixedContent: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <Carousel>
        <Card
          title="Card Slide"
          content="This is a card slide"
          color="#FF6B6B"
        />

        <div
          style={{
            width: "400px",
            padding: "40px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2 style={{ margin: "0 0 16px 0", color: "#333" }}>Text Slide</h2>
          <p style={{ margin: 0, color: "#666", lineHeight: "1.6" }}>
            This is a text-based slide with different styling.
          </p>
        </div>

        <Card
          title="Another Card"
          content="Back to card format"
          color="#4ECDC4"
        />
      </Carousel>
    </div>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <h2 style={{ marginBottom: "24px", textAlign: "center", color: "#333" }}>
        Featured Content
      </h2>
      <Carousel>
        {sampleCards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </Carousel>
    </div>
  ),
};
