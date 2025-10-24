import {
  Subtitle,
  Description,
  Controls,
  Stories,
  Title,
} from "@storybook/addon-docs/blocks";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "styled-system/css";
import { stack } from "styled-system/patterns";

const meta: Meta = {
  title: "Theme/Typography",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj;

const TextExample = ({ className }: { className: string }) => {
  return (
    <div className={stack({ align: "start", gap: "2" })}>
      <p className={className}>The quick brown fox jumps over the lazy dog.</p>
      <code className={css({ fontSize: "2", color: "moveus-marigold.200" })}>
        {className.replace("textStyle_", "")}
      </code>
    </div>
  );
};

/** TWK Everett Bold text used for large headings. */
export const HeadingLarge: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "heading-large.5xl" })} />
      <TextExample className={css({ textStyle: "heading-large.4xl" })} />
      <TextExample className={css({ textStyle: "heading-large.3xl" })} />
      <TextExample className={css({ textStyle: "heading-large.2xl" })} />
      <TextExample className={css({ textStyle: "heading-large.xl" })} />
      <TextExample className={css({ textStyle: "heading-large.lg" })} />
      <TextExample className={css({ textStyle: "heading-large.md" })} />
      <TextExample className={css({ textStyle: "heading-large.sm" })} />
      <TextExample className={css({ textStyle: "heading-large.xs" })} />
    </div>
  ),
};

/** TWK Everett Bold text used for small headings. */
export const HeadingSmall: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "heading-small.xl" })} />
      <TextExample className={css({ textStyle: "heading-small.lg" })} />
      <TextExample className={css({ textStyle: "heading-small.md" })} />
    </div>
  ),
};

/** TWK Everett Mono Bold text. */
export const MonoBold: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "mono-bold.xl" })} />
      <TextExample className={css({ textStyle: "mono-bold.lg" })} />
      <TextExample className={css({ textStyle: "mono-bold.md" })} />
      <TextExample className={css({ textStyle: "mono-bold.sm" })} />
      <TextExample className={css({ textStyle: "mono-bold.xs" })} />
    </div>
  ),
};

/** TWK Everett Mono Medium text. */
export const MonoMedium: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "mono-medium.xl" })} />
      <TextExample className={css({ textStyle: "mono-medium.lg" })} />
      <TextExample className={css({ textStyle: "mono-medium.md" })} />
      <TextExample className={css({ textStyle: "mono-medium.sm" })} />
      <TextExample className={css({ textStyle: "mono-medium.xs" })} />
    </div>
  ),
};

/** TWK Everett Mono Regular text. */
export const MonoRegular: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "mono-regular.xl" })} />
      <TextExample className={css({ textStyle: "mono-regular.lg" })} />
      <TextExample className={css({ textStyle: "mono-regular.md" })} />
      <TextExample className={css({ textStyle: "mono-regular.sm" })} />
      <TextExample className={css({ textStyle: "mono-regular.xs" })} />
    </div>
  ),
};

/** TWK Everett Mono Light text. */
export const MonoLight: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "mono-light.xl" })} />
      <TextExample className={css({ textStyle: "mono-light.lg" })} />
      <TextExample className={css({ textStyle: "mono-light.md" })} />
      <TextExample className={css({ textStyle: "mono-light.sm" })} />
      <TextExample className={css({ textStyle: "mono-light.xs" })} />
    </div>
  ),
};

/** TWK Everett Mono Hairline text. */
export const MonoHairline: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "mono-hairline.xl" })} />
      <TextExample className={css({ textStyle: "mono-hairline.lg" })} />
      <TextExample className={css({ textStyle: "mono-hairline.md" })} />
      <TextExample className={css({ textStyle: "mono-hairline.sm" })} />
      <TextExample className={css({ textStyle: "mono-hairline.xs" })} />
    </div>
  ),
};

/** TWK Everett Mono Thin text. */
export const MonoThin: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "mono-thin.xl" })} />
      <TextExample className={css({ textStyle: "mono-thin.lg" })} />
      <TextExample className={css({ textStyle: "mono-thin.md" })} />
      <TextExample className={css({ textStyle: "mono-thin.sm" })} />
      <TextExample className={css({ textStyle: "mono-thin.xs" })} />
    </div>
  ),
};

/** TWK Everett Mono Ultralight text. */
export const MonoUltralight: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "mono-ultralight.xl" })} />
      <TextExample className={css({ textStyle: "mono-ultralight.lg" })} />
      <TextExample className={css({ textStyle: "mono-ultralight.md" })} />
      <TextExample className={css({ textStyle: "mono-ultralight.sm" })} />
      <TextExample className={css({ textStyle: "mono-ultralight.xs" })} />
    </div>
  ),
};

/** TWK Everett Mono Extrabold text. */
export const MonoExtrabold: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "mono-extrabold.xl" })} />
      <TextExample className={css({ textStyle: "mono-extrabold.lg" })} />
      <TextExample className={css({ textStyle: "mono-extrabold.md" })} />
      <TextExample className={css({ textStyle: "mono-extrabold.sm" })} />
      <TextExample className={css({ textStyle: "mono-extrabold.xs" })} />
    </div>
  ),
};

/** TWK Everett Mono Super text. */
export const MonoSuper: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "mono-super.xl" })} />
      <TextExample className={css({ textStyle: "mono-super.lg" })} />
      <TextExample className={css({ textStyle: "mono-super.md" })} />
      <TextExample className={css({ textStyle: "mono-super.sm" })} />
      <TextExample className={css({ textStyle: "mono-super.xs" })} />
    </div>
  ),
};

/** TWK Everett Mono Black text. */
export const MonoBlack: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "mono-black.xl" })} />
      <TextExample className={css({ textStyle: "mono-black.lg" })} />
      <TextExample className={css({ textStyle: "mono-black.md" })} />
      <TextExample className={css({ textStyle: "mono-black.sm" })} />
      <TextExample className={css({ textStyle: "mono-black.xs" })} />
    </div>
  ),
};

/** Neue Haas Unica Pro Heavy text. */
export const BodyHeavy: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "body-heavy.xl" })} />
      <TextExample className={css({ textStyle: "body-heavy.lg" })} />
      <TextExample className={css({ textStyle: "body-heavy.md" })} />
      <TextExample className={css({ textStyle: "body-heavy.sm" })} />
      <TextExample className={css({ textStyle: "body-heavy.xs" })} />
    </div>
  ),
};

/** Neue Haas Unica Pro Bold text. */
export const BodyBold: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "body-bold.xl" })} />
      <TextExample className={css({ textStyle: "body-bold.lg" })} />
      <TextExample className={css({ textStyle: "body-bold.md" })} />
      <TextExample className={css({ textStyle: "body-bold.sm" })} />
      <TextExample className={css({ textStyle: "body-bold.xs" })} />
    </div>
  ),
};

/** Neue Haas Unica Pro Medium text. */
export const BodyMedium: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "body-medium.xl" })} />
      <TextExample className={css({ textStyle: "body-medium.lg" })} />
      <TextExample className={css({ textStyle: "body-medium.md" })} />
      <TextExample className={css({ textStyle: "body-medium.sm" })} />
      <TextExample className={css({ textStyle: "body-medium.xs" })} />
    </div>
  ),
};

/** Neue Haas Unica Pro Light text. */
export const BodyLight: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "body-light.xl" })} />
      <TextExample className={css({ textStyle: "body-light.lg" })} />
      <TextExample className={css({ textStyle: "body-light.md" })} />
      <TextExample className={css({ textStyle: "body-light.sm" })} />
      <TextExample className={css({ textStyle: "body-light.xs" })} />
    </div>
  ),
};

/** Neue Haas Unica Pro Regular text. */
export const BodyRegular: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "body-regular.xl" })} />
      <TextExample className={css({ textStyle: "body-regular.lg" })} />
      <TextExample className={css({ textStyle: "body-regular.md" })} />
      <TextExample className={css({ textStyle: "body-regular.sm" })} />
      <TextExample className={css({ textStyle: "body-regular.xs" })} />
    </div>
  ),
};

/** Tables/uppercase text. */
export const TablesUppercase: Story = {
  render: () => (
    <div className={stack({ gap: "4" })}>
      <TextExample className={css({ textStyle: "tables-uppercase.xl" })} />
      <TextExample className={css({ textStyle: "tables-uppercase.lg" })} />
      <TextExample className={css({ textStyle: "tables-uppercase.md" })} />
      <TextExample className={css({ textStyle: "tables-uppercase.sm" })} />
      <TextExample className={css({ textStyle: "tables-uppercase.xs" })} />
    </div>
  ),
};
