export const alertVariants = ["info", "warning", "error", "success"] as const;
export type AlertVariant = (typeof alertVariants)[number];
