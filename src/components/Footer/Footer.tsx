import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import FooterBigSvg from "../../assets/branding/footer-big.svg";
import FooterSmallSvg from "../../assets/branding/footer-small.svg";

// Social media icons as inline SVGs
const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DiscordIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="14"
    viewBox="0 0 24 20"
    fill="currentColor"
  >
    <path d="M20.317 1.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562.002c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 6.093-.32 10.555.099 14.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 12.278c-1.183 0-2.157-1.068-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.068-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.947 2.38-2.157 2.38z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const RedditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const TelegramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

// Footer link styles
const footerLinkVariants = cva(
  "text-base transition-colors hover:text-primary cursor-pointer",
  {
    variants: {
      variant: {
        default: "text-white",
        muted: "text-white/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Social icon button styles
const socialIconVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors size-8",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-primary hover:text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Footer column header styles
const footerHeaderVariants = cva("text-base font-black uppercase tracking-wide text-white/50");

// Types
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: "x" | "discord" | "github" | "linkedin" | "reddit" | "telegram";
  href: string;
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Whether to show the heading tagline
   * @default true
   */
  showHeading?: boolean;

  /**
   * Custom heading text
   */
  heading?: string;

  /**
   * Footer navigation columns
   */
  columns?: FooterColumn[];

  /**
   * Social media links
   */
  socialLinks?: SocialLink[];

  /**
   * Copyright text
   * @default "© 2026 Move Industries. All rights reserved."
   */
  copyright?: string;
}

// Social icon mapping
const socialIcons: Record<SocialLink["platform"], React.FC> = {
  x: XIcon,
  discord: DiscordIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  reddit: RedditIcon,
  telegram: TelegramIcon,
};

// Default values
const defaultColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "Learn", href: "https://www.movementnetwork.xyz/learn" },
      { label: "Blog", href: "https://www.movementnetwork.xyz/blog" },
      { label: "Careers", href: "https://jobs.ashbyhq.com/moveindustries" },
      { label: "Privacy Policy", href: "https://www.movementnetwork.xyz/privacy-policy" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Ecosystem", href: "https://movementnetwork.xyz/ecosystem" },
      { label: "Move Docs", href: "https://docs.movementnetwork.xyz/general" },
      { label: "Developer Portal", href: "https://developer.movementnetwork.xyz/" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Support", href: "https://discord.com/channels/1101576619493167217/1362083188104626516" },
    ],
  },
];

const defaultSocialLinks: SocialLink[] = [
  { platform: "x", href: "https://x.com/moveindustries" },
  { platform: "discord", href: "https://discord.gg/G6SaA7Eq" },
  { platform: "github", href: "https://github.com/movementlabsxyz/movement" },
  { platform: "reddit", href: "https://www.reddit.com/r/MovementXYZ/" },
  { platform: "linkedin", href: "https://www.linkedin.com/company/move-industries-blockchain" },
];

// Shared sub-components
interface FooterColumnComponentProps {
  column: FooterColumn;
  className?: string;
}

function FooterColumnComponent({ column, className }: FooterColumnComponentProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h3 className={cn(footerHeaderVariants())}>{column.title}</h3>
      <nav className="flex flex-col gap-4">
        {column.links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={cn(footerLinkVariants())}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

interface SocialIconsGridProps {
  socialLinks: SocialLink[];
  className?: string;
}

function SocialIconsGrid({ socialLinks, className }: SocialIconsGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {socialLinks.map((social) => {
        const IconComponent = socialIcons[social.platform];
        return (
          <a
            key={social.platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(socialIconVariants())}
            aria-label={`Follow us on ${social.platform}`}
          >
            <IconComponent />
          </a>
        );
      })}
    </div>
  );
}

// =============================================================================
// DESKTOP FOOTER
// =============================================================================
interface DesktopFooterProps {
  showHeading: boolean;
  heading: string;
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  copyright: string;
  className?: string;
}

function DesktopFooter({
  showHeading,
  heading,
  columns,
  socialLinks,
  copyright,
  className,
}: DesktopFooterProps) {
  return (
    <div className={cn("relative w-full bg-black px-12 py-20", className)}>
      {/* Heading at top left */}
      {showHeading && (
        <h2 className="mb-16 text-[32px] font-black uppercase leading-[48px] text-white">
          {heading}
        </h2>
      )}

      {/* Main content area */}
      <div className="flex items-start justify-between">
        {/* Logo section - left side */}
        <div className="flex items-center shrink-0">
          {/* Small logo for smaller desktop screens */}
          <img src={FooterSmallSvg} alt="Move Industries" className="h-24 w-auto block xl:!hidden" />
          {/* Big logo for larger screens */}
          <img src={FooterBigSvg} alt="Move Industries" className="h-24 w-auto hidden xl:!block" />
        </div>

        {/* Navigation columns - right side */}
        <div className="flex gap-20">
          {columns.map((column) => (
            <FooterColumnComponent
              key={column.title}
              column={column}
              className="border-l border-primary pl-8"
            />
          ))}

          {/* Connect column with social icons */}
          <div className="flex flex-col gap-4 border-l border-primary pl-8">
            <h3 className={cn(footerHeaderVariants())}>Connect</h3>
            <SocialIconsGrid socialLinks={socialLinks} />
          </div>
        </div>
      </div>

      {/* Copyright at bottom center */}
      <p className="mt-16 text-center text-base text-white/60">{copyright}</p>
    </div>
  );
}

// =============================================================================
// MOBILE FOOTER
// =============================================================================
interface MobileFooterProps {
  showHeading: boolean;
  heading: string;
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  copyright: string;
  className?: string;
}

function MobileFooter({
  showHeading,
  heading,
  columns,
  socialLinks,
  copyright,
  className,
}: MobileFooterProps) {
  return (
    <div className={cn("relative w-full bg-black px-6 py-10", className)}>
      {/* Logo centered at top */}
      <div className="flex flex-col items-center gap-4">
        <img src={FooterSmallSvg} alt="Move Industries" className="h-24 w-auto" />
      </div>

      {/* Heading centered below logo */}
      {showHeading && (
        <h2 className="mt-8 text-center text-2xl font-bold uppercase leading-tight text-white/60">
          <span className="block">Serving the</span>
          <span className="block">People's Chain. powered by Move.</span>
        </h2>
      )}

      {/* Navigation columns in 2x2 grid */}
      <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10">
        {columns.map((column) => (
          <FooterColumnComponent
            key={column.title}
            column={column}
            className="px-6"
          />
        ))}

        {/* Connect column with social icons */}
        <div className="flex flex-col gap-4 px-6">
          <h3 className={cn(footerHeaderVariants())}>Connect</h3>
          <SocialIconsGrid socialLinks={socialLinks} />
        </div>
      </div>

      {/* Copyright at bottom center */}
      <p className="mt-12 text-center text-base text-white/60">{copyright}</p>
    </div>
  );
}

// =============================================================================
// MAIN FOOTER COMPONENT (RESPONSIVE WRAPPER)
// =============================================================================

/**
 * Footer component for displaying site-wide footer with navigation, social links, and branding.
 * Automatically switches between desktop and mobile layouts based on screen size.
 *
 * - Desktop (≥768px): Horizontal layout with logo left, nav columns right
 * - Mobile (<768px): Centered layout with 2x2 grid for nav columns
 */
function Footer({
  className,
  showHeading = true,
  heading = "Serving the People's Chain. powered by Move.",
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 Move Industries. All rights reserved.",
  ...props
}: FooterProps) {
  const sharedProps = {
    showHeading,
    heading,
    columns,
    socialLinks,
    copyright,
  };

  return (
    <footer data-slot="footer" className={cn("w-full", className)} {...props}>
      {/* Mobile footer - shown below lg breakpoint (1024px) */}
      <div className="block lg:!hidden">
        <MobileFooter {...sharedProps} />
      </div>
      {/* Desktop footer - shown at lg breakpoint and above */}
      <div className="hidden lg:!block">
        <DesktopFooter {...sharedProps} />
      </div>
    </footer>
  );
}

export {
  Footer,
  DesktopFooter,
  MobileFooter,
  footerLinkVariants,
  footerHeaderVariants,
  socialIconVariants,
};
