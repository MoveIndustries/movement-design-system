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
  textAlign?: string;
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

  // Wait for font to load if requested
  useEffect(() => {
    if (!waitForFont || typeof document === "undefined") {
      setFontLoaded(true);
      return;
    }

    const loadFont = async () => {
      try {
        const fontSize = isMobile ? 36 : 64;
        await document.fonts.load(`${fontWeight} ${fontSize}px ${fontFamily}`);
        setFontLoaded(true);
      } catch {
        await document.fonts.ready;
        setFontLoaded(true);
      }
    };

    loadFont();
  }, [waitForFont, fontWeight, fontFamily, isMobile]);

  // Function to measure text width accurately
  const measureTextWidth = (
    text: string,
    fontSize: number,
    fontWeight: string,
    letterSpacing: string,
  ): number => {
    if (typeof document === "undefined") return text.length * fontSize * 0.6; // SSR fallback

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return text.length * fontSize * 0.6; // Fallback

    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const metrics = context.measureText(text);

    // Add letter spacing contribution (letterSpacing * (length - 1))
    const letterSpacingPx = parseFloat(letterSpacing);
    const totalLetterSpacing = letterSpacingPx * (text.length - 1);

    return metrics.width + totalLetterSpacing;
  };

  if (isTextOnly) {
    // Use SVG rendering for text-only content
    const fontSize = isMobile ? 36 : 64;
    
    // Only measure after font is loaded for accuracy
    const textWidth = fontLoaded
      ? measureTextWidth(
          children as string,
          fontSize,
          fontWeight,
          letterSpacing,
        )
      : (children as string).length * fontSize * 0.6; // Fallback while loading

    // Calculate max stroke width to add as padding
    const maxStroke = Math.max(
      ...outlines.map(
        (o) => parseFloat(isMobile ? o.width.base : o.width.md) * 2,
      ),
    );

    const estimatedWidth = textWidth + maxStroke * 2; // Add stroke padding on both sides
    const height = fontSize * 1.2; // Adding padding for strokes

    return (
      <svg
        viewBox={`0 0 ${estimatedWidth} ${height}`}
        className={cn("w-auto overflow-visible", className)}
        style={{
          height: isMobile ? "36px" : "64px",
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
              dominantBaseline="middle"
              style={{
                fontFamily: fontFamily,
                fontSize: `${fontSize}px`,
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
          dominantBaseline="middle"
          style={{
            fontFamily: fontFamily,
            fontSize: `${fontSize}px`,
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
    <div className={cn("relative inline-flex items-center", className)}>
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
              "text-[36px] md:text-[56px] lg:text-[64px]",
              "font-[900]",
            )}
            style={{
              textAlign: textAlign as any,
              fontWeight,
              lineHeight,
              letterSpacing,
              fontFamily: fontFamily,
              zIndex: index,
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
          "text-[36px] md:text-[56px] lg:text-[64px]",
          "font-[900]",
        )}
        style={{
          textAlign: textAlign as any,
          fontWeight,
          lineHeight,
          letterSpacing,
          fontFamily: fontFamily,
          zIndex: outlines.length,
          color: color,
          WebkitTextFillColor: color,
        }}
      >
        {children}
      </div>
    </div>
  );
}
