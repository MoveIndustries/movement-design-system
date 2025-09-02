import { forwardRef, ReactNode } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { cx } from "styled-system/css";

export interface TooltipProps {
  id?: string;
  children: ReactNode;
  className?: string;
  bgColor?: string;
  isOpen?: boolean;
  openOnClick?: boolean;
  clickable?: boolean;
}

export const Tooltip = forwardRef<any, TooltipProps>((props, ref) => {
  return (
    <ReactTooltip
      ref={ref}
      id={props.id}
      render={() => props.children}
      className={cx("font-neue text-center leading-[140%]", props.className)}
      isOpen={props.isOpen}
      style={{
        backgroundColor: props.bgColor || "#FFE162",
        color: "#000000",
        maxWidth: "327px",
        fontSize: "16px",
        zIndex: 20,
      }}
      opacity={1}
      clickable={props.clickable}
      openOnClick={props.openOnClick}
      place={"top"}
    />
  );
});

Tooltip.displayName = "Tooltip";
