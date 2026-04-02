import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import type {
  AdapterNotDetectedWallet,
  AdapterWallet,
} from "@moveindustries/wallet-adapter-react";
import {
  MovementWalletAdapterProvider,
  useWallet,
} from "@moveindustries/wallet-adapter-react";
import { WalletModal } from "@/components/WalletModal";
import { Button } from "@/components/shadcn/button";

const meta: Meta<typeof WalletModal> = {
  title: "Movement Design System/WalletModal",
  component: WalletModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A responsive wallet connection modal that automatically switches between Dialog (desktop) and Drawer (mobile) based on screen size. Supports Aptos wallet adapters with custom styling.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story: React.ComponentType) => (
      <MovementWalletAdapterProvider
        // autoConnect={true}
        onError={(error) => {
          console.log("Wallet error:", error);
          // Suppress provider conflict errors
          if (
            error?.message?.includes?.("setting the global Ethereum provider")
          ) {
            return;
          }
        }}
      >
        <Story />
      </MovementWalletAdapterProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ICON_PREVIEW_LEN = 96;

/** Nightly first; remaining wallets alphabetical by `name`. */
function sortAvailableWalletsNightlyFirst(
  a: AdapterWallet | AdapterNotDetectedWallet,
  b: AdapterWallet | AdapterNotDetectedWallet,
): number {
  const aN = a.name.toLowerCase().includes("nightly");
  const bN = b.name.toLowerCase().includes("nightly");
  if (aN && !bN) return -1;
  if (!aN && bN) return 1;
  return a.name.localeCompare(b.name);
}


/** Top-level fields only — avoids OKX-sized `aptos` trees and circular JSON. */
const SHALLOW_WALLET_DEBUG_KEYS = [
  "name",
  "url",
  "version",
  "icon",
  "chains",
  "accounts",
  "readyState",
  "isMovementNativeWallet",
] as const;

/**
 * Shallow snapshot for the table expander. Full `wallet` objects often include
 * `aptos` SDK clients with circular refs (OKX); compare duplicates via `url` + `name` here.
 */
function walletToDebugJson(wallet: AdapterWallet): string {
  const w = wallet as Record<string, unknown>;
  const out: Record<string, unknown> = {
    _note:
      "Shallow fields only (no aptos / connect / …). Inspect each wallet in the console for the live object.",
  };

  for (const key of SHALLOW_WALLET_DEBUG_KEYS) {
    if (!(key in w)) continue;
    const v = w[key];

    if (key === "icon" && typeof v === "string") {
      out.icon = `[${v.length} chars] ${v.slice(0, 160)}${v.length > 160 ? "…" : ""}`;
      continue;
    }

    if (key === "accounts") {
      try {
        out.accounts = JSON.parse(
          JSON.stringify(v, (_, val) =>
            typeof val === "function" ? undefined : val,
          ),
        );
      } catch {
        out.accounts = "(unserializable — see console)";
      }
      continue;
    }

    if (
      v === null ||
      typeof v === "string" ||
      typeof v === "number" ||
      typeof v === "boolean"
    ) {
      out[key] = v;
      continue;
    }

    if (Array.isArray(v)) {
      const primitiveOnly = v.every(
        (x) =>
          x === null ||
          typeof x === "string" ||
          typeof x === "number" ||
          typeof x === "boolean",
      );
      if (primitiveOnly) {
        out[key] = v;
        continue;
      }
      try {
        out[key] = JSON.parse(
          JSON.stringify(v, (_, val) =>
            typeof val === "function" ? undefined : val,
          ),
        );
      } catch {
        out[key] = `[array length ${v.length} — see console]`;
      }
      continue;
    }

    if (typeof v === "object") {
      out[key] = "[object — see console]";
      continue;
    }

    out[key] = String(v);
  }

  try {
    return JSON.stringify(out, null, 2);
  } catch (e) {
    return JSON.stringify({ error: String(e) });
  }
}

function WalletAdapterDebugPanel() {
  const { wallets } = useWallet();

  useEffect(() => {
    if (wallets.length === 0) return;
    console.table(
      wallets.map((w) => ({
        name: w.name,
        readyState: String(w.readyState),
        iconLength: typeof w.icon === "string" ? w.icon.length : 0,
        iconPreview:
          typeof w.icon === "string"
            ? `${w.icon.slice(0, ICON_PREVIEW_LEN)}${w.icon.length > ICON_PREVIEW_LEN ? "…" : ""}`
            : String(w.icon),
      })),
    );
    console.group("[WalletAdapterDebug] full wallet objects (expand properties)");
    for (const w of wallets) {
      console.log(`--- ${w.name} ---`, w);
    }
    console.groupEnd();
    const byIcon = new Map<string, string[]>();
    for (const w of wallets) {
      if (typeof w.icon !== "string") continue;
      const list = byIcon.get(w.icon) ?? [];
      list.push(w.name);
      byIcon.set(w.icon, list);
    }
    const dupes = [...byIcon.entries()].filter(([, names]) => names.length > 1);
    if (dupes.length > 0) {
      console.warn(
        "[WalletAdapterDebug] Multiple wallets share the same icon URL/data:",
        dupes.map(([icon, names]) => ({
          names,
          iconPreview: `${icon.slice(0, ICON_PREVIEW_LEN)}…`,
        })),
      );
    }

    const byUrl = new Map<string, string[]>();
    for (const w of wallets) {
      const url = typeof w.url === "string" ? w.url : "";
      if (!url) continue;
      const list = byUrl.get(url) ?? [];
      list.push(w.name);
      byUrl.set(url, list);
    }
    const sameUrlDiffName = [...byUrl.entries()].filter(
      ([, names]) => new Set(names).size > 1,
    );
    if (sameUrlDiffName.length > 0) {
      console.warn(
        "[WalletAdapterDebug] Multiple wallet names share the same `url` in adapter data — often wrong metadata (Nightly and MPC Vault can still be different Chrome extensions). Report to wallet-adapter / extension owners:",
        sameUrlDiffName.map(([url, names]) => ({
          url,
          names: [...new Set(names)],
        })),
      );
    }
  }, [wallets]);

  if (wallets.length === 0) {
    return (
      <p className="text-muted-foreground max-w-2xl text-left text-sm">
        No wallets reported yet. Use a browser with Movement/Aptos wallet
        extensions installed, then refresh this story.
      </p>
    );
  }

  return (
    <div className="max-w-3xl space-y-3 text-left">
      <p className="text-muted-foreground text-sm">
        Open the browser <strong>console</strong> for a full{" "}
        <code className="text-xs">console.table</code> and duplicate-icon
        warnings. Below: live <code className="text-xs">useWallet().wallets</code>{" "}
        (compare <strong>name</strong> vs thumbnail — same image on different
        names indicates a bad <code className="text-xs">icon</code> field).
        Expand <strong>raw JSON</strong> for a shallow snapshot. Duplicate{" "}
        <code className="text-xs">url</code> across names usually means bad
        adapter metadata (not “same Chrome extension”). Console warns on
        duplicate icons and URLs; expand logged objects for full{" "}
        <code className="text-xs">aptos</code> trees.
      </p>
      <div className="max-h-[min(32rem,70vh)] overflow-auto rounded-md border border-border">
        <table className="w-full min-w-[42rem] border-collapse text-left text-xs">
          <thead className="sticky top-0 bg-muted">
            <tr>
              <th className="border-b border-border p-2 font-medium">Thumb</th>
              <th className="border-b border-border p-2 font-medium">name</th>
              <th className="border-b border-border p-2 font-medium">
                readyState
              </th>
              <th className="border-b border-border p-2 font-medium">
                icon len
              </th>
              <th className="border-b border-border p-2 font-medium">
                icon preview
              </th>
              <th className="border-b border-border p-2 font-medium">
                raw JSON
              </th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((w, i) => {
              const iconLen =
                typeof w.icon === "string" ? w.icon.length : 0;
              const iconPreview =
                typeof w.icon === "string"
                  ? `${w.icon.slice(0, ICON_PREVIEW_LEN)}${w.icon.length > ICON_PREVIEW_LEN ? "…" : ""}`
                  : String(w.icon);
              return (
                <tr key={`${w.name}-${i}`} className="border-b border-border/60">
                  <td className="p-2 align-middle">
                    {typeof w.icon === "string" ? (
                      <img
                        src={w.icon}
                        alt=""
                        className="h-10 w-10 shrink-0 rounded object-contain"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-2 align-middle font-mono">{w.name}</td>
                  <td className="p-2 align-middle">{String(w.readyState)}</td>
                  <td className="p-2 align-middle tabular-nums">{iconLen}</td>
                  <td className="max-w-[14rem] break-all p-2 align-middle font-mono text-[10px] text-muted-foreground">
                    {iconPreview}
                  </td>
                  <td className="max-w-[min(24rem,40vw)] p-2 align-top">
                    <details className="cursor-pointer">
                      <summary className="text-primary hover:underline">
                        Expand
                      </summary>
                      <pre
                        className="mt-2 max-h-64 overflow-auto rounded border border-border bg-muted/40 p-2 text-left font-mono text-[10px] leading-snug break-all whitespace-pre-wrap"
                        tabIndex={-1}
                      >
                        {walletToDebugJson(w)}
                      </pre>
                    </details>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Log and display each entry in <code>useWallet().wallets</code> (name, readyState,
 * icon length, icon preview). Use with different extension combinations to see if
 * two adapters share the same <code>icon</code> string while names differ.
 */
export const DebugAdapterMetadata: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-6">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Wallet adapter metadata</h3>
          <p className="text-muted-foreground max-w-xl text-sm">
            Compare each wallet&apos;s <strong>name</strong> to its thumbnail and
            to other rows. Install/uninstall MPC Vault vs Nightly and refresh to
            bisect.
          </p>
        </div>

        <WalletAdapterDebugPanel />

        <Button onClick={() => setIsOpen(true)} size="lg" variant="secondary">
          Open WalletModal (same data)
        </Button>

        {isOpen && <WalletModal onClose={() => setIsOpen(false)} />}
      </div>
    );
  },
};

/**
 * Interactive demo of the WalletModal component.
 * Click the button to open the modal and see how it behaves.
 */
export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Wallet Connection Demo</h3>
          <p className="text-muted-foreground max-w-md text-sm">
            Click the button below to open the wallet connection modal. On
            desktop, it appears as a dialog. On mobile devices, it slides up as
            a drawer.
          </p>
        </div>

        <Button onClick={() => setIsOpen(true)} size="lg">
          Connect Wallet
        </Button>

        {isOpen && <WalletModal onClose={() => setIsOpen(false)} />}
      </div>
    );
  },
};

/**
 * The WalletModal automatically opens on mount.
 * Useful for previewing the modal's appearance without interaction.
 */
// export const AlwaysOpen: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(true);

//     return (
//       <div className="relative min-h-screen">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="space-y-4 text-center">
//             <h3 className="text-lg font-semibold">Modal Preview</h3>
//             <p className="text-muted-foreground text-sm">
//               The wallet modal is always open in this story
//             </p>
//             <Button onClick={() => setIsOpen(true)} disabled={isOpen}>
//               Reopen Modal
//             </Button>
//           </div>
//         </div>

//         {isOpen && (
//           <WalletModal
//             onClose={() => {
//               setIsOpen(false);
//               // Automatically reopen after a short delay for demo purposes
//               setTimeout(() => setIsOpen(true), 500);
//             }}
//           />
//         )}
//       </div>
//     );
//   },
//   parameters: {
//     layout: "fullscreen",
//   },
// };

/**
 * Demonstrates the modal with custom wallet sorting options.
 * Uses <code>sortAvailableWallets</code> so Nightly is first; others follow A–Z by name.
 */
export const WithSortingOptions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Custom Wallet Sorting</h3>
          <p className="text-muted-foreground max-w-md text-sm">
            Nightly is pinned first via <code>sortAvailableWallets</code>; other
            installed wallets are sorted alphabetically.
          </p>
        </div>

        <Button onClick={() => setIsOpen(true)} size="lg">
          Connect Wallet
        </Button>

        {isOpen && (
          <WalletModal
            onClose={() => setIsOpen(false)}
            sortAvailableWallets={sortAvailableWalletsNightlyFirst}
          />
        )}
      </div>
    );
  },
};

/**
 * Mobile-optimized view of the WalletModal.
 * Resize your browser window or use responsive mode to see the drawer behavior.
 */
export const MobileView: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-semibold">Mobile Drawer View</h3>
          <p className="text-muted-foreground max-w-md text-sm">
            On screens smaller than 768px, the modal appears as a bottom drawer.
            Try resizing your browser window to see the effect.
          </p>
        </div>

        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="w-full max-w-xs"
        >
          Connect Wallet
        </Button>

        {isOpen && <WalletModal onClose={() => setIsOpen(false)} />}
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * Shows the WalletModal's styling and theming capabilities.
 */
export const Styling: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="max-w-2xl space-y-2 text-center">
          <h3 className="text-lg font-semibold">Styling Features</h3>
          <ul className="text-muted-foreground space-y-2 text-left text-sm">
            <li>• Gradient background with blue/green radial overlay</li>
            <li>• Glassmorphic backdrop blur effect</li>
            <li>• Hover effects on wallet cards with shadow animations</li>
            <li>• Responsive grid layout for wallet icons</li>
            <li>• Smooth transitions and collapsible sections</li>
          </ul>
        </div>

        <Button onClick={() => setIsOpen(true)} size="lg">
          View Styled Modal
        </Button>

        {isOpen && <WalletModal onClose={() => setIsOpen(false)} />}
      </div>
    );
  },
};
