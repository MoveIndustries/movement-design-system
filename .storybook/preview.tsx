// preview is where the actual story is rendered

import type { Preview, Decorator } from "@storybook/react-vite";
import React from "react";
import "../src/index.css";
import { createStorybookTheme } from "./theme";

// Global decorator to add dark dotted background
const withDarkDottedBackground: Decorator = (Story, context) => {
  const isDocs = context.viewMode === "docs";
  console.log(isDocs);
  return (
    <div
      style={
        {
          // backgroundColor: "#0a0a0a",
          // backgroundImage:
          //   "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          // backgroundSize: "20px 20px",
          // height: "100%",
          // width: "100%",
          // padding: "2rem",
        }
      }
    >
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          height: "100%",
          width: "100%",
          zIndex: -1,
        }}
      /> */}
      {/* // Multiple floaty iridescent colorful blobs, slow movement, subtle & transparent */}
      {!isDocs && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.17, // subtle global opacity
          }}
        >
          {/* First blob: right/top, purple/blue/yellow */}
          <div
            style={{
              width: "380px",
              height: "530px",
              position: "absolute",
              top: "35%",
              left: "67%",
              transform: "translate(-50%, -50%) scale(1)",
              background:
                "radial-gradient(circle at 60% 50%, rgba(168,222,255,0.78) 0%, rgba(186,189,255,0.39) 66%, rgba(255,233,140,0.97) 100%)",
              filter: "blur(85px)",
              borderRadius: "58% 42% 54% 46%/50% 52% 48% 50%",
              animation:
                "floaty-blob-anim-1 62s cubic-bezier(.4,.68,.6,1) infinite",
              // mixBlendMode: "screen",
              boxShadow: "0 0 130px 70px rgba(186,230,255,0.10)",
            }}
          />
          {/* Second blob: left/bottom, pink/cyan/yellow */}
          <div
            style={{
              width: "310px",
              height: "390px",
              position: "absolute",
              top: "64%",
              left: "25%",
              transform: "translate(-40%, -38%) scale(1.05)",
              background:
                "radial-gradient(circle at 40% 60%, rgba(255,155,205,0.96) 0%, rgba(108,241,255,0.33) 58%, rgba(254,255,199,0.32) 100%)",
              filter: "blur(50px)",
              borderRadius: "46% 54% 42% 58%/53% 62% 38% 47%",
              animation:
                "floaty-blob-anim-2 67s cubic-bezier(.41,.7,.66,1) infinite reverse",
              // mixBlendMode: "screen",
              boxShadow: "0 0 120px 60px rgba(150,200,255,0.09)",
            }}
          />
          {/* Third blob: off center, teal/lavender/orange */}
          <div
            style={{
              width: "350px",
              height: "350px",
              position: "absolute",
              top: "40%",
              left: "35%",
              transform: "translate(-39%, -62%) scale(0.8)",
              background:
                "radial-gradient(circle at 52% 38%, rgba(150,255,195,0.98) 2%, rgba(194,174,255,0.39) 42%, rgba(255,201,135,0.24) 98%)",
              filter: "blur(78px)",
              borderRadius: "43% 56% 70% 36%/59% 40% 69% 48%",
              animation:
                "floaty-blob-anim-3 74s cubic-bezier(.39,.7,.64,1) infinite",
              // mixBlendMode: "screen",
              boxShadow: "0 0 100px 42px rgba(211,255,226,0.13)",
            }}
          />
          <style>
            {`
          @keyframes floaty-blob-anim-1 {
            0%   { transform: translate(-50%, -50%) scale(1)      rotate(0deg);}
            22%  { transform: translate(-54%, -53%) scale(1.04,0.97) rotate(8deg);}
            48%  { transform: translate(-47%, -51%) scale(1.01,1.09) rotate(-14deg);}
            62%  { transform: translate(-52%, -48%) scale(0.97,1.01) rotate(12deg);}
            81%  { transform: translate(-51%, -51%) scale(0.99,0.93) rotate(-11deg);}
            100% { transform: translate(-50%, -50%) scale(1)      rotate(0deg);}
          }
          @keyframes floaty-blob-anim-2 {
            0%   { transform: translate(-40%, -38%) scale(1.05)      rotate(0deg);}
            27%  { transform: translate(-45%, -39%) scale(1.09,0.96) rotate(-12deg);}
            46%  { transform: translate(-36%, -35%) scale(1.01,1.06) rotate(16deg);}
            73%  { transform: translate(-41%, -42%) scale(1,0.97) rotate(4deg);}
            100% { transform: translate(-40%, -38%) scale(1.05)      rotate(0deg);}
          }
          @keyframes floaty-blob-anim-3 {
            0%   { transform: translate(-39%, -62%) scale(0.8)      rotate(0deg);}
            18%  { transform: translate(-40%, -65%) scale(0.85,0.91) rotate(-11deg);}
            53%  { transform: translate(-38%, -57%) scale(0.92,0.83) rotate(13deg);}
            69%  { transform: translate(-41%, -66%) scale(0.79,0.89) rotate(-5deg);}
            100% { transform: translate(-39%, -62%) scale(0.8)      rotate(0deg);}
          }
        `}
          </style>
        </div>
      )}
      <Story />
    </div>
  );
};

// controls the preview of the storybook
const preview: Preview = {
  decorators: [withDarkDottedBackground],
  parameters: {
    layout: "centered",
    options: {
      storySort: {
        order: ["theme", "Blocks", "movement-design-system", "shadcn"],
      },
    },

    // Apply the dark theme
    docs: {
      theme: createStorybookTheme(),
      toc: true, // 👈 Enables the table of contents
    },

    outline: {
      disable: true,
    },

    // Set default backgrounds to dark
    backgrounds: {
      disable: true,
      options: {
        // dark: { name: "Dark", value: "#0A0A0A" },
      },
    },
  },
  initialGlobals: {
    // 👇 Set the initial background color
    backgrounds: { value: "dark" },
  },
};

export default preview;
