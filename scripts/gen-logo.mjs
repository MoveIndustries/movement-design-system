/**
 * Generate src/components/Logo/Logo.tsx from the brand SVGs in
 * src/assets/branding/. The black variants carry no explicit fill, so we drop
 * the Illustrator wrapper/ids/styles and paint the paths with `currentColor`,
 * giving one theme-aware component per logo (black/white/brand via CSS color).
 *
 * Run after updating the brand SVGs:  node scripts/gen-logo.mjs
 */
import fs from "node:fs";

const DIR = new URL("../src/assets/branding/", import.meta.url);
const OUT = new URL("../src/components/Logo/Logo.tsx", import.meta.url);

const specs = [
  { comp: "Logo", file: "Logo_Movement_Full_Black.svg", desc: "Full lockup — logomark + Movement wordmark. The default logo; reach for it first wherever there is room." },
  { comp: "LogoMark", file: "Mark_Movement_Black.svg", desc: "Standalone mark. Use as an app icon, avatar, or favicon, or anywhere the full lockup would be too small to read." },
  { comp: "Wordmark", file: "Wordmark_Movement_Black.svg", desc: "The Movement wordmark on its own. Use when the brand is already established on the page and the mark would be redundant." },
];

function extract(svg) {
  const vb = svg.match(/viewBox="([^"]+)"/)[1];
  let inner = svg.slice(svg.indexOf(">", svg.indexOf("<svg")) + 1, svg.lastIndexOf("</svg>"));
  inner = inner
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/\sclass="[^"]*"/g, "")
    .replace(/\sid="[^"]*"/g, "")
    .replace(/\sxml:space="[^"]*"/g, "")
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, ">\n<")
    .replace(/\s*\/>/g, " />")
    .trim();
  return { vb, inner };
}

const parts = specs
  .map(({ comp, file, desc }) => {
    const { vb, inner } = extract(fs.readFileSync(new URL(file, DIR), "utf8"));
    const indented = inner.split("\n").map((l) => (l ? "        " + l : l)).join("\n");
    return `/**
 * ${desc}
 *
 * Monochrome and theme-aware: paints with \`currentColor\`, so set the color via
 * CSS (\`className="text-black"\` / \`"text-white"\`, a brand utility, or \`style={{ color }}\`).
 * Pass \`title\` for an accessible name; omitted, it renders decorative (aria-hidden).
 */
export function ${comp}({ className, title, ...props }: LogoProps) {
  return (
    <svg
      viewBox="${vb}"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={className}
      {...props}
    >
      {title ? <title>{title}</title> : null}
${indented}
    </svg>
  );
}`;
  })
  .join("\n\n");

const out = `import * as React from "react";

/**
 * Movement brand logos. Source of truth: src/assets/branding/*.svg
 * (regenerate with scripts/gen-logo.mjs — do not hand-edit the path data).
 */
export type LogoProps = React.SVGProps<SVGSVGElement> & {
  /** Accessible name. When set, the logo is exposed as role="img"; otherwise it is decorative. */
  title?: string;
};

${parts}
`;

fs.mkdirSync(new URL(".", OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log("Generated", OUT.pathname);
