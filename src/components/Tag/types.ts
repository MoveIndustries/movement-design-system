export const tagVariants = ["outline", "solid"] as const;
export type TagVariant = (typeof tagVariants)[number];

export const tagColors = ["yellow", "blue", "pink", "red", "green"] as const;
export type TagColor = (typeof tagColors)[number];

export const tagSizes = ["sm", "md", "lg", "xl"] as const;
export type TagSize = (typeof tagSizes)[number];
