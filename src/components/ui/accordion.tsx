import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

interface AccordionItemProps
  extends React.ComponentProps<typeof AccordionPrimitive.Item> {
  showTopBorder?: boolean;
  showBottomBorder?: boolean;
}

function AccordionItem({
  className,
  showTopBorder = false,
  showBottomBorder = true,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        showTopBorder && "border-t",
        showBottomBorder && "border-b",
        "last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

interface AccordionTriggerProps
  extends React.ComponentProps<typeof AccordionPrimitive.Trigger> {
  icon?: React.ReactNode;
  showIcon?: boolean;
}

function AccordionTrigger({
  className,
  children,
  icon,
  showIcon = false,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-4 text-left text-lg font-bold transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        <div className="flex flex-1 items-center gap-2">
          {showIcon && icon && (
            <div className="size-6 shrink-0 flex items-center justify-center">
              {icon}
            </div>
          )}
          <span className="flex-1">{children}</span>
        </div>
        <div className="size-8 shrink-0 flex items-center justify-center relative">
          <ChevronDown className="text-muted-foreground pointer-events-none size-5 transition-transform duration-200 group-data-[state=open]:scale-0 group-data-[state=open]:opacity-0" />
          <ChevronUp className="text-muted-foreground pointer-events-none size-5 transition-transform duration-200 group-data-[state=closed]:scale-0 group-data-[state=closed]:opacity-0 absolute inset-0 m-auto" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-base"
      {...props}
    >
      <div className={cn("pb-4 pr-12", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
