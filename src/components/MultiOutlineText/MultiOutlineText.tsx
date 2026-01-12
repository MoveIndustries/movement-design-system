"use client";

import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MultiOutlineTextProps {
  children: React.ReactNode;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  className?: string;
  waitForFont?: boolean;
  fontFamily?: string;
  outlines?: Array<{
    color: string;
    width: { base: string; md: string };
  }>;
}

export default function MultiOutlineText({
  children,
  color = "#81FFBA",
  fontSize,
  fontWeight = "900",
  lineHeight = "110%",
  letterSpacing = "1.28px",
  textAlign = "center",
  className,
  waitForFont = true,
  fontFamily = "TWK Everett, sans-serif",
  outlines = [
    { color: "#002CD6", width: { base: "2px", md: "3px" } },
    { color: "#ffd935", width: { base: "4px", md: "5px" } },
  ],
}: MultiOutlineTextProps) {
  const isMobile = useIsMobile();
  const [fontLoaded, setFontLoaded] = useState(!waitForFont);

  // Check if children contains only text
  const isTextOnly = typeof children === "string";

  // Calculate SVG font size upfront for the effect
  const defaultSize = isMobile ? 36 : 64;
  const svgFontSize = fontSize ? parseFloat(fontSize) : defaultSize;

  // Calculate actual text width using canvas measureText
  const getTextWidth = (text: string, font: string) => {
    // Check if we're in browser environment
    if (typeof document === "undefined") {
      return text.length * svgFontSize * 0.8;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return text.length * svgFontSize * 0.6;
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  };

  const font = `${fontWeight} ${svgFontSize}px ${fontFamily}`;
  const textWidth = isTextOnly ? getTextWidth(children as string, font) : 0;

  // Wait for font to load if requested (must be at top level)
  useEffect(() => {
    if (!waitForFont || typeof document === "undefined" || !isTextOnly) {
      setFontLoaded(true);
      return;
    }

    const loadFont = async () => {
      try {
        await document.fonts.load(
          `${fontWeight} ${svgFontSize}px ${fontFamily}`,
        );
        setFontLoaded(true);
      } catch {
        await document.fonts.ready;
        setFontLoaded(true);
      }
    };

    loadFont();
  }, [waitForFont, fontWeight, fontFamily, fontSize, isMobile, textWidth, isTextOnly, svgFontSize]);

  if (isTextOnly) {
    // Use SVG rendering for text-only content
    const height = svgFontSize;

    return (
      <svg
        viewBox={`0 0 ${textWidth} ${height}`}
        className={className}
        style={{
          width: "auto",
          height: `${svgFontSize}px`,
          overflow: "visible",
          display: "inline-block",
          verticalAlign: "middle",
          margin: 0,
          padding: 0,
          opacity: fontLoaded ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        {/* Render strokes from largest to smallest */}
        {[...outlines].reverse().map((outline, index) => {
          const strokeWidth = parseFloat(
            isMobile ? outline.width.base : outline.width.md,
          );

          return (
            <text
              key={`stroke-${index}`}
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="central"
              style={{
                fontFamily: fontFamily,
                fontSize: `${svgFontSize}px`,
                fontWeight: fontWeight,
                letterSpacing: letterSpacing,
                fill: "none",
                stroke: outline.color,
                strokeWidth: `${strokeWidth * 2}px`,
                strokeLinejoin: "round",
                strokeLinecap: "round",
              }}
            >
              {children}
            </text>
          );
        })}

        {/* Main text with fill color on top */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: fontFamily,
            fontSize: `${svgFontSize}px`,
            fontWeight: fontWeight,
            letterSpacing: letterSpacing,
            fill: color,
          }}
        >
          {children}
        </text>
      </svg>
    );
  }

  // Use CSS rendering for mixed content (text + elements)
  return (
    <div
      className={cn("relative inline-flex items-center", className)}
      style={{
        margin: 0,
        padding: 0,
        gap: 0,
      }}
    >
      {[...outlines].reverse().map((outline, index) => {
        const strokeWidth = parseFloat(
          isMobile ? outline.width.base : outline.width.md,
        );

        return (
          <div
            key={index}
            aria-hidden="true"
            className={cn(
              "absolute top-0 left-0 m-0 inline-flex items-center",
              !fontSize && "text-[36px] md:text-[56px] lg:text-[64px]",
              "font-black",
            )}
            style={{
              textAlign: textAlign,
              fontSize: fontSize,
              fontWeight,
              lineHeight,
              letterSpacing,
              fontFamily: fontFamily,
              zIndex: index,
              margin: 0,
              padding: 0,
              gap: 0,
              WebkitTextStrokeWidth: `${strokeWidth * 2}px`,
              WebkitTextStrokeColor: outline.color,
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {children}
          </div>
        );
      })}

      {/* Main content with fill color on top */}
      <div
        className={cn(
          "relative m-0 inline-flex items-center",
          !fontSize && "text-[36px] md:text-[56px] lg:text-[64px]",
          "font-black",
        )}
        style={{
          textAlign: textAlign,
          fontSize: fontSize,
          fontWeight,
          lineHeight,
          letterSpacing,
          fontFamily: fontFamily,
          zIndex: outlines.length,
          margin: 0,
          padding: 0,
          gap: 0,
          color: color,
          WebkitTextFillColor: color,
        }}
      >
        {children}
      </div>
    </div>
  );
}
