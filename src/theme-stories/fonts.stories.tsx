import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Title,
  Subtitle,
  Description,
  Stories,
} from "@storybook/addon-docs/blocks";

/**
 * # Fonts
 *
 * The Movement brand faces and the `font-*` utilities they power.
 *
 * - **ABC Oracle** — primary sans + display face (`--font-display`). Drives
 *   `font-sans`, `font-display`, `font-heading`, `font-body`.
 * - **RecifeText** — serif, used for emphasis (`--font-serif` → `font-serif`).
 *
 * There is no brand monospace. `font-mono` is intentionally left to defer to
 * the generic system monospace (or a `--font-mono` a consuming app chooses to
 * set) — the design system doesn't impose a specific mono stack.
 *
 * The faces are loaded by the optional `/fonts` entry
 * (`@import "@moveindustries/movement-design-system/fonts"`), which Storybook
 * imports. Next.js apps self-host via `next/font/local` and set
 * `--font-display` / `--font-serif` themselves — every utility below resolves
 * through those CSS variables, so the type follows whatever the app provides.
 */
const meta: Meta = {
  title: "Theme/Fonts",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Stories />
        </>
      ),
    },
  },
};
export default meta;

type Story = StoryObj;

const PANGRAM = "The quick brown fox jumps over the lazy dog";

function Family({
  name,
  cssVar,
  utility,
  className,
  note,
  weights,
}: {
  name: string;
  cssVar: string;
  utility: string;
  className: string;
  note?: string;
  weights: { label: string; weight: number; italic?: boolean }[];
}) {
  return (
    <section className="border-border max-w-3xl border-b pb-10">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className={`text-3xl ${className}`}>{name}</h3>
        <div className="text-muted-foreground flex flex-col items-end gap-1 text-right">
          <code className="text-xs">.{utility}</code>
          <code className="text-xs">{cssVar}</code>
        </div>
      </div>
      {note && <p className="text-muted-foreground mb-6 text-sm">{note}</p>}
      <div className="space-y-5">
        {weights.map(({ label, weight, italic }) => (
          <div key={label}>
            <div className="text-muted-foreground mb-1 text-xs">
              {label} · {weight}
              {italic ? " · italic" : ""}
            </div>
            <p
              className={`text-2xl ${className}`}
              style={{ fontWeight: weight, fontStyle: italic ? "italic" : "normal" }}
            >
              {PANGRAM}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** ABC Oracle — the primary sans / display face. Backs `font-sans`, `font-display`, `font-heading` and `font-body`. */
export const Display: Story = {
  render: () => (
    <Family
      name="ABC Oracle"
      cssVar="--font-display"
      utility="font-display"
      className="font-display"
      note="Primary sans + display face. Used for everything from body copy to headlines."
      weights={[
        { label: "Regular", weight: 400 },
        { label: "Regular Italic", weight: 400, italic: true },
        { label: "Medium", weight: 500 },
        { label: "Medium Italic", weight: 500, italic: true },
        { label: "Bold", weight: 700 },
        { label: "Bold Italic", weight: 700, italic: true },
      ]}
    />
  ),
};

/** RecifeText — serif face for emphasis. Backs `font-serif`. */
export const Serif: Story = {
  render: () => (
    <Family
      name="RecifeText"
      cssVar="--font-serif"
      utility="font-serif"
      className="font-serif"
      note="Serif face for editorial emphasis and pull quotes."
      weights={[
        { label: "Regular", weight: 400 },
        { label: "Regular Italic", weight: 400, italic: true },
        { label: "Medium", weight: 500 },
        { label: "Bold", weight: 700 },
      ]}
    />
  ),
};

/** The `font-*` utilities and the semantic CSS variables they resolve through. */
export const Utilities: Story = {
  render: () => {
    const rows: { utility: string; resolvesTo: string; face: string; className: string }[] = [
      { utility: "font-sans", resolvesTo: "var(--font-display)", face: "ABC Oracle", className: "font-sans" },
      { utility: "font-display", resolvesTo: "var(--font-display)", face: "ABC Oracle", className: "font-display" },
      { utility: "font-heading", resolvesTo: "var(--font-display)", face: "ABC Oracle", className: "font-heading" },
      { utility: "font-body", resolvesTo: "var(--font-display)", face: "ABC Oracle", className: "font-body" },
      { utility: "font-serif", resolvesTo: "var(--font-serif)", face: "RecifeText", className: "font-serif" },
      { utility: "font-mono", resolvesTo: "var(--font-mono, monospace)", face: "System / app-set", className: "font-mono" },
    ];
    return (
      <div className="max-w-3xl space-y-3">
        <div className="text-muted-foreground grid grid-cols-[160px_180px_1fr] gap-4 border-b border-border pb-2 text-xs font-medium">
          <span>Utility</span>
          <span>Resolves to</span>
          <span>Sample</span>
        </div>
        {rows.map((r) => (
          <div
            key={r.utility}
            className="grid grid-cols-[160px_180px_1fr] items-baseline gap-4"
          >
            <code className="text-sm">.{r.utility}</code>
            <code className="text-muted-foreground text-xs">{r.resolvesTo}</code>
            <span className={`text-lg ${r.className}`}>
              {r.face} — {PANGRAM}
            </span>
          </div>
        ))}
      </div>
    );
  },
};
