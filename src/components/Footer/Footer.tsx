import React from "react";
import { cn } from "../../lib/utils";

/**
 * Footer — the unified Movement footer shared across all Movement Network
 * apps (Bridge, Staking, Explorer, Faucet). Solid-black slab:
 *   - "Powered by Movement" wordmark + monogram (left)
 *   - Three short link columns — Explore / Builders / Resources (right)
 *   - Hairline divider
 *   - Legal row: copyright + Terms/Privacy (left), X / Discord / GitHub /
 *     Telegram / LinkedIn social icons (right)
 *
 * Single responsive component — stacks vertically below 768px and lays out
 * horizontally from 768px up (no separate desktop/mobile trees).
 *
 * SELF-CONTAINED: all styling lives in `footer.css` (compiled into the
 * published `component-styles` bundle) under `.mvmt-footer*` classes with
 * literal values and a fixed breakpoint. The footer uses NO ambient Tailwind
 * utility classes and reads NO host CSS variables for layout/size — so it
 * renders identically in every app regardless of that app's Tailwind config,
 * theme, or stylesheet import order. Only the text font defers to the app's
 * `--font-display` (every Movement app wires this to ABC Oracle), with an
 * "ABC Oracle" → system-sans fallback. Framework-agnostic: plain `<a>`
 * anchors (no router dep) and inline-SVG icons (no icon-lib dep).
 */

// =============================================================================
// TYPES
// =============================================================================

export interface FooterLink {
  label: string;
  href: string;
  /** Open in a new tab with rel="noopener noreferrer". @default false */
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export type SocialPlatform =
  | "x"
  | "discord"
  | "github"
  | "telegram"
  | "linkedin"
  | "reddit";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  /** Accessible label. Falls back to a sensible default per platform. */
  label?: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Navigation columns rendered on the right of the top row.
   * @default Explore / Builders / Resources
   */
  columns?: FooterColumn[];

  /**
   * Social media links rendered at the bottom right.
   * @default X / Discord / GitHub / Telegram / LinkedIn
   */
  socialLinks?: SocialLink[];

  /**
   * Legal links rendered next to the copyright at the bottom left.
   * @default Terms of Service / Privacy Policy
   */
  legalLinks?: FooterLink[];

  /**
   * Copyright text. When omitted, renders "Movement © {currentYear}".
   */
  copyright?: string;

  /**
   * Href for the "Powered by Movement" brand lockup.
   * @default "https://www.movementnetwork.xyz"
   */
  brandHref?: string;

  /**
   * Brand wordmark text shown next to the monogram.
   * @default "Powered by Movement"
   */
  brandLabel?: string;
}

// =============================================================================
// DEFAULTS — absolute production URLs so every app renders an identical footer
// =============================================================================

const NETWORK_BASE = "https://www.movementnetwork.xyz";

const defaultColumns: FooterColumn[] = [
  {
    title: "Explore",
    links: [
      { label: "Bridge", href: "https://bridge.movementnetwork.xyz", external: true },
      { label: "Stake", href: "https://staking.movementnetwork.xyz", external: true },
      { label: "Ecosystem", href: `${NETWORK_BASE}/ecosystem`, external: true },
    ],
  },
  {
    title: "Builders",
    links: [
      { label: "Docs", href: "https://docs.movementnetwork.xyz", external: true },
      { label: "Faucet", href: "https://faucet.movementnetwork.xyz", external: true },
      { label: "Explorer", href: "https://explorer.movementnetwork.xyz", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides & FAQ", href: `${NETWORK_BASE}/guides`, external: true },
      { label: "Insights", href: `${NETWORK_BASE}/blog`, external: true },
      { label: "Brand Kit", href: `${NETWORK_BASE}/brand-kit`, external: true },
      { label: "Careers", href: `${NETWORK_BASE}/careers`, external: true },
    ],
  },
];

const defaultLegalLinks: FooterLink[] = [
  { label: "Terms of Service", href: `${NETWORK_BASE}/terms-of-service`, external: true },
  { label: "Privacy Policy", href: `${NETWORK_BASE}/privacy-policy`, external: true },
];

const defaultSocialLinks: SocialLink[] = [
  { platform: "x", href: "https://twitter.com/movement_xyz", label: "X (Twitter)" },
  { platform: "discord", href: "https://discord.gg/movementxyz", label: "Discord" },
  { platform: "github", href: "https://github.com/movementlabsxyz", label: "GitHub" },
  { platform: "telegram", href: "https://t.me/movement_announcements", label: "Telegram" },
  { platform: "linkedin", href: "https://www.linkedin.com/company/movementxyz", label: "LinkedIn" },
];

const socialLabels: Record<SocialPlatform, string> = {
  x: "X (Twitter)",
  discord: "Discord",
  github: "GitHub",
  telegram: "Telegram",
  linkedin: "LinkedIn",
  reddit: "Reddit",
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function Footer({
  className,
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  legalLinks = defaultLegalLinks,
  copyright,
  brandHref = NETWORK_BASE,
  brandLabel = "Powered by Movement",
  ...props
}: FooterProps) {
  const year = new Date().getFullYear();
  const copyrightText = copyright ?? `Movement © ${year}`;

  return (
    <footer
      data-slot="footer"
      className={cn("mvmt-footer", className)}
      {...props}
    >
      <div className="mvmt-footer__inner">
        {/* Top row — wordmark + columns */}
        <div className="mvmt-footer__top">
          {/* "Powered by Movement" wordmark */}
          <a href={brandHref} aria-label="Movement Network" className="mvmt-footer__brand">
            <MovementMonogram />
            <span className="mvmt-footer__wordmark">{brandLabel}</span>
          </a>

          {/* Link columns */}
          <div className="mvmt-footer__cols">
            {columns.map((column) => (
              <FooterColumnComponent key={column.title} column={column} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mvmt-footer__divider" />

        {/* Legal row */}
        <div className="mvmt-footer__legal">
          <div className="mvmt-footer__legal-links">
            <span className="mvmt-footer__copyright">{copyrightText}</span>
            {legalLinks.map((link) => (
              <FooterAnchor
                key={link.href}
                link={link}
                className="mvmt-footer__legal-link"
              />
            ))}
          </div>
          <div className="mvmt-footer__social">
            {socialLinks.map((social) => {
              const Icon = socialIcons[social.platform];
              return (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label ?? socialLabels[social.platform]}
                  className="mvmt-footer__social-link"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

function FooterColumnComponent({ column }: { column: FooterColumn }) {
  return (
    <div>
      <h2 className="mvmt-footer__col-title">{column.title}</h2>
      <ul className="mvmt-footer__col-list">
        {column.links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <FooterAnchor link={link} className="mvmt-footer__link" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterAnchor({
  link,
  className,
}: {
  link: FooterLink;
  className?: string;
}) {
  const externalProps = link.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a href={link.href} className={className} {...externalProps}>
      {link.label}
    </a>
  );
}

// =============================================================================
// BRAND MONOGRAM — three-path 44×44 mark, white for the footer
// =============================================================================

function MovementMonogram() {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mvmt-footer__logo"
      aria-hidden
    >
      <path
        d="M0 19.7041V43.6713H8.27348L12.4064 40.2081V23.2937L6.99916 15.7664L0 19.7041Z"
        fill="currentColor"
      />
      <path
        d="M19.5089 3.46707L15.8696 8.05539L31.4064 12.8044V33.6069L39.6684 33.6145L43.6674 30.2546V0L19.5089 3.46707Z"
        fill="currentColor"
      />
      <path
        d="M28.1039 37.1122V15.2459L13.2904 10.7303L9.68941 13.8453L15.709 22.226V40.5869H23.9595L28.1039 37.1122Z"
        fill="currentColor"
      />
    </svg>
  );
}

// =============================================================================
// SOCIAL ICONS — single-path inline SVGs (no icon-lib dependency)
// =============================================================================

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mvmt-footer__icon mvmt-footer__icon--x" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mvmt-footer__icon" aria-hidden>
      <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.157 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mvmt-footer__icon" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3-.405c1.02.005 2.04.137 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mvmt-footer__icon" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mvmt-footer__icon" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.063 2.063 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function RedditIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="mvmt-footer__icon" aria-hidden>
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

const socialIcons: Record<SocialPlatform, React.FC> = {
  x: XIcon,
  discord: DiscordIcon,
  github: GitHubIcon,
  telegram: TelegramIcon,
  linkedin: LinkedInIcon,
  reddit: RedditIcon,
};

export { Footer };
