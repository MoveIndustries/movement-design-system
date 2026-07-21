"use client";

import {
  type AdapterWallet,
  type AdapterNotDetectedWallet,
  WalletItem,
  type WalletSortingOptions,
  groupAndSortWallets,
  partitionWallets,
  isInstallRequired,
  useWallet,
  WalletReadyState,
} from "@moveindustries/wallet-adapter-react";

import { useMemo, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/shadcn/drawer";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/shadcn/dialog";
import { cn } from "@/lib/utils";
// lucide-react (not phosphor) so these icons are bundled + tree-shaken into the
// DS — consumers don't need @phosphor-icons/react just for the wallet modal.
import { ChevronDown, Fingerprint } from "lucide-react";
import { NightlyIcon } from "@/components/Icon";

const nightlyWallet: AdapterNotDetectedWallet = {
  name: "Nightly Wallet",
  url: "https://nightly.app/download",
  icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI5IiBoZWlnaHQ9IjEyOSIgdmlld0JveD0iMCAwIDEyOSAxMjkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMTMuMzgxIDAuMjVDMTA0LjAwOCAxMy4zMjI1IDkyLjI4NzQgMjIuMzg0NyA3OC40MTcyIDI4LjQ1NTZDNzMuNjA5MiAyNy4xNDg0IDY4LjY2ODIgMjYuNDM5NCA2My44MTU5IDI2LjQ4MzdDNTguOTYzNSAyNi40Mzk0IDU0LjAyMjUgMjcuMTI2MiA0OS4yMTQ1IDI4LjQ1NTZDMzUuMzY2NSAyMi4zODQ3IDIzLjYyMzQgMTMuMzIyNSAxNC4yNTEgMC4yNUMxMS40MTUgNy4zNjIzNCAwLjUxMzc5NiAzMS45MzQzIDEzLjYwODUgNjYuMjU1MkMxMy42MDg1IDY2LjI1NTIgOS40MjA4NCA4NC4xODAxIDE3LjEwOTMgOTkuNTc5MUMxNy4xMDkzIDk5LjU3OTEgMjguMjU0MSA5NC41NDk1IDM3LjA3MjYgMTAxLjYxN0M0Ni4zMTIgMTA5LjEyOSA0My4zNjUxIDExNi4zMyA0OS44NzkyIDEyMi41MzRDNTUuNDYyNyAxMjguMjUgNjMuODE1OSAxMjguMjUgNjMuODE1OSAxMjguMjVDNjMuODE1OSAxMjguMjUgNzIuMTY5IDEyOC4yNSA3Ny43NTI1IDEyMi41MzRDODQuMjY2NiAxMTYuMzMgODEuMzQxOSAxMDkuMTI5IDkwLjU1OTIgMTAxLjYxN0M5OS4zNzc2IDk0LjUyNzMgMTEwLjUyMiA5OS41NzkxIDExMC41MjIgOTkuNTc5MUMxMTguMjExIDg0LjE4MDEgMTE0LjAyMyA2Ni4yNTUyIDExNC4wMjMgNjYuMjU1MkMxMjcuMTE4IDMxLjkzNDMgMTE2LjIxNyA3LjM2MjM0IDExMy4zODEgMC4yNVpNMjAuNTY1NyA2MS40OTE1QzEzLjQ1MzQgNDYuODkwMSAxMS40ODE0IDI2LjgzODIgMTYuMDAxNCAxMC45OTYxQzIxLjkzOTUgMjYuMDE4NCAzMC4wMDQ1IDMyLjc3NjIgMzkuNjIwNiAzOS44ODg2QzM1LjUyMTYgNDguMzUyNSAyNy44Nzc1IDU2LjMyODkgMjAuNTY1NyA2MS40OTE1Wk00MS4wMzg2IDg3LjIxNTZDMzUuNDU1MSA4NC43MzQgMzQuMjM2NSA3OS44MzczIDM0LjIzNjUgNzkuODM3M0M0MS44ODA2IDc1LjAyOTMgNTMuMTE0MSA3OC43MDczIDUzLjQ2ODYgOTAuMDk1OUM0Ny41NTI3IDg2LjUyODcgNDUuNjAyOSA4OS4yMzE4IDQxLjAzODYgODcuMjE1NlpNNjMuODE1OSAxMjcuNjA3QzU5LjgwNTUgMTI3LjYwNyA1Ni41NDg0IDEyNC43NDkgNTYuNTQ4NCAxMjEuMjA0QzU2LjU0ODQgMTE3LjY1OSA1OS44MDU1IDExNC44MDEgNjMuODE1OSAxMTQuODAxQzY3LjgyNjMgMTE0LjgwMSA3MS4wODMzIDExNy42NTkgNzEuMDgzMyAxMjEuMjA0QzcxLjA4MzMgMTI0Ljc0OSA2Ny44MjYzIDEyNy42MDcgNjMuODE1OSAxMjcuNjA3Wk04Ni41OTMxIDg3LjIxNTZDODIuMDI4OCA4OS4yMDk3IDgwLjA3OSA4Ni41MDY1IDc0LjE2MzEgOTAuMDk1OUM3NC41MTc2IDc4LjcwNzMgODUuNzUxMSA3NS4wMjkzIDkzLjM5NTIgNzkuODM3M0M5My4zOTUyIDc5Ljg1OTUgOTIuMTk4OCA4NC43NTYxIDg2LjU5MzEgODcuMjE1NlpNMTA3LjA2NiA2MS40OTE1Qzk5Ljc1NDIgNTYuMzI4OSA5Mi4xMTAxIDQ4LjM1MjUgODguMDMzMyAzOS44ODg2Qzk3LjY0OTQgMzIuNzc2MiAxMDUuNzE0IDI2LjAxODQgMTExLjY1MiAxMC45OTYxQzExNi4xNSAyNi44NjA0IDExNC4xNzggNDYuOTEyMyAxMDcuMDY2IDYxLjQ5MTVaIiBmaWxsPSIjNjA2N0Y5Ii8+Cjwvc3ZnPgo=",
  readyState: WalletReadyState.NotDetected,
};

const cleanWalletName = (name: string) => name.replace(/ Wallet$/i, "");

const DownloadText = () => (
  <svg
    width="98"
    height="16"
    viewBox="0 0 98 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.88 1.35001C6.34667 1.35001 7.63333 1.63668 8.74 2.21001C9.86 2.78334 10.72 3.60334 11.32 4.67001C11.9333 5.72334 12.24 6.95001 12.24 8.35001C12.24 9.75001 11.9333 10.9767 11.32 12.03C10.72 13.07 9.86 13.8767 8.74 14.45C7.63333 15.0233 6.34667 15.31 4.88 15.31H0V1.35001H4.88ZM4.78 12.93C6.24667 12.93 7.38 12.53 8.18 11.73C8.98 10.93 9.38 9.80334 9.38 8.35001C9.38 6.89668 8.98 5.76334 8.18 4.95001C7.38 4.12334 6.24667 3.71001 4.78 3.71001H2.8V12.93H4.78Z"
      fill="white"
    />
    <path
      d="M18.8559 15.49C17.7893 15.49 16.8293 15.2567 15.9759 14.79C15.1226 14.31 14.4493 13.6367 13.9559 12.77C13.4759 11.9033 13.2359 10.9033 13.2359 9.77001C13.2359 8.63668 13.4826 7.63668 13.9759 6.77001C14.4826 5.90334 15.1693 5.23668 16.0359 4.77001C16.9026 4.29001 17.8693 4.05001 18.9359 4.05001C20.0026 4.05001 20.9693 4.29001 21.8359 4.77001C22.7026 5.23668 23.3826 5.90334 23.8759 6.77001C24.3826 7.63668 24.6359 8.63668 24.6359 9.77001C24.6359 10.9033 24.3759 11.9033 23.8559 12.77C23.3493 13.6367 22.6559 14.31 21.7759 14.79C20.9093 15.2567 19.9359 15.49 18.8559 15.49ZM18.8559 13.05C19.3626 13.05 19.8359 12.93 20.2759 12.69C20.7293 12.4367 21.0893 12.0633 21.3559 11.57C21.6226 11.0767 21.7559 10.4767 21.7559 9.77001C21.7559 8.71668 21.4759 7.91001 20.9159 7.35001C20.3693 6.77668 19.6959 6.49001 18.8959 6.49001C18.0959 6.49001 17.4226 6.77668 16.8759 7.35001C16.3426 7.91001 16.0759 8.71668 16.0759 9.77001C16.0759 10.8233 16.3359 11.6367 16.8559 12.21C17.3893 12.77 18.0559 13.05 18.8559 13.05Z"
      fill="white"
    />
    <path
      d="M41.6498 4.23001L38.4098 15.31H35.3898L33.3698 7.57001L31.3498 15.31H28.3098L25.0498 4.23001H27.8898L29.8498 12.67L31.9698 4.23001H34.9298L37.0098 12.65L38.9698 4.23001H41.6498Z"
      fill="white"
    />
    <path
      d="M48.9048 4.07001C50.2248 4.07001 51.2915 4.49001 52.1048 5.33001C52.9182 6.15668 53.3248 7.31668 53.3248 8.81001V15.31H50.5248V9.19001C50.5248 8.31001 50.3048 7.63668 49.8648 7.17001C49.4248 6.69001 48.8248 6.45001 48.0648 6.45001C47.2915 6.45001 46.6782 6.69001 46.2248 7.17001C45.7848 7.63668 45.5648 8.31001 45.5648 9.19001V15.31H42.7648V4.23001H45.5648V5.61001C45.9382 5.13001 46.4115 4.75668 46.9848 4.49001C47.5715 4.21001 48.2115 4.07001 48.9048 4.07001Z"
      fill="white"
    />
    <path d="M58.3875 0.51001V15.31H55.5875V0.51001H58.3875Z" fill="white" />
    <path
      d="M65.6739 15.49C64.6072 15.49 63.6472 15.2567 62.7939 14.79C61.9406 14.31 61.2672 13.6367 60.7739 12.77C60.2939 11.9033 60.0539 10.9033 60.0539 9.77001C60.0539 8.63668 60.3006 7.63668 60.7939 6.77001C61.3006 5.90334 61.9872 5.23668 62.8539 4.77001C63.7206 4.29001 64.6872 4.05001 65.7539 4.05001C66.8206 4.05001 67.7872 4.29001 68.6539 4.77001C69.5206 5.23668 70.2006 5.90334 70.6939 6.77001C71.2006 7.63668 71.4539 8.63668 71.4539 9.77001C71.4539 10.9033 71.1939 11.9033 70.6739 12.77C70.1672 13.6367 69.4739 14.31 68.5939 14.79C67.7272 15.2567 66.7539 15.49 65.6739 15.49ZM65.6739 13.05C66.1806 13.05 66.6539 12.93 67.0939 12.69C67.5472 12.4367 67.9072 12.0633 68.1739 11.57C68.4406 11.0767 68.5739 10.4767 68.5739 9.77001C68.5739 8.71668 68.2939 7.91001 67.7339 7.35001C67.1872 6.77668 66.5139 6.49001 65.7139 6.49001C64.9139 6.49001 64.2406 6.77668 63.6939 7.35001C63.1606 7.91001 62.8939 8.71668 62.8939 9.77001C62.8939 10.8233 63.1539 11.6367 63.6739 12.21C64.2072 12.77 64.8739 13.05 65.6739 13.05Z"
      fill="white"
    />
    <path
      d="M72.3878 9.73001C72.3878 8.61001 72.6078 7.61668 73.0478 6.75001C73.5011 5.88334 74.1078 5.21668 74.8678 4.75001C75.6411 4.28334 76.5011 4.05001 77.4478 4.05001C78.2745 4.05001 78.9945 4.21668 79.6078 4.55001C80.2345 4.88334 80.7345 5.30334 81.1078 5.81001V4.23001H83.9278V15.31H81.1078V13.69C80.7478 14.21 80.2478 14.6433 79.6078 14.99C78.9811 15.3233 78.2545 15.49 77.4278 15.49C76.4945 15.49 75.6411 15.25 74.8678 14.77C74.1078 14.29 73.5011 13.6167 73.0478 12.75C72.6078 11.87 72.3878 10.8633 72.3878 9.73001ZM81.1078 9.77001C81.1078 9.09001 80.9745 8.51001 80.7078 8.03001C80.4411 7.53668 80.0811 7.16334 79.6278 6.91001C79.1745 6.64334 78.6878 6.51001 78.1678 6.51001C77.6478 6.51001 77.1678 6.63668 76.7278 6.89001C76.2878 7.14334 75.9278 7.51668 75.6478 8.01001C75.3811 8.49001 75.2478 9.06334 75.2478 9.73001C75.2478 10.3967 75.3811 10.9833 75.6478 11.49C75.9278 11.9833 76.2878 12.3633 76.7278 12.63C77.1811 12.8967 77.6611 13.03 78.1678 13.03C78.6878 13.03 79.1745 12.9033 79.6278 12.65C80.0811 12.3833 80.4411 12.01 80.7078 11.53C80.9745 11.0367 81.1078 10.45 81.1078 9.77001Z"
      fill="white"
    />
    <path
      d="M85.5425 9.73001C85.5425 8.61001 85.7625 7.61668 86.2025 6.75001C86.6558 5.88334 87.2692 5.21668 88.0425 4.75001C88.8158 4.28334 89.6758 4.05001 90.6225 4.05001C91.3425 4.05001 92.0292 4.21001 92.6825 4.53001C93.3358 4.83668 93.8558 5.25001 94.2425 5.77001V0.51001H97.0825V15.31H94.2425V13.67C93.8958 14.2167 93.4092 14.6567 92.7825 14.99C92.1558 15.3233 91.4292 15.49 90.6025 15.49C89.6692 15.49 88.8158 15.25 88.0425 14.77C87.2692 14.29 86.6558 13.6167 86.2025 12.75C85.7625 11.87 85.5425 10.8633 85.5425 9.73001ZM94.2625 9.77001C94.2625 9.09001 94.1292 8.51001 93.8625 8.03001C93.5958 7.53668 93.2358 7.16334 92.7825 6.91001C92.3292 6.64334 91.8425 6.51001 91.3225 6.51001C90.8025 6.51001 90.3225 6.63668 89.8825 6.89001C89.4425 7.14334 89.0825 7.51668 88.8025 8.01001C88.5358 8.49001 88.4025 9.06334 88.4025 9.73001C88.4025 10.3967 88.5358 10.9833 88.8025 11.49C89.0825 11.9833 89.4425 12.3633 89.8825 12.63C90.3358 12.8967 90.8158 13.03 91.3225 13.03C91.8425 13.03 92.3292 12.9033 92.7825 12.65C93.2358 12.3833 93.5958 12.01 93.8625 11.53C94.1292 11.0367 94.2625 10.45 94.2625 9.77001Z"
      fill="white"
    />
  </svg>
);

export interface ConnectWalletDialogProps extends WalletSortingOptions {
  onClose: () => void;
  /** Custom description text shown below the title. Defaults to "Securely connect your wallet to the Movement Network." */
  description?: React.ReactNode;
  /**
   * Fallback name for the keyless (social login) wallet surfaced as a
   * full-width row above the wallet grid. Featured wallets are matched
   * primarily by the adapter's stable `id` (`movement-keyless`); this name is
   * only used when a registered wallet lacks that id or a consumer wants to
   * override the match. The row only renders when a matching wallet is present,
   * so apps that haven't registered keyless are unaffected. Defaults to
   * "Sign in with Google".
   */
  keylessWalletName?: string;
  /**
   * Fallback names for the two passkey wallet entries. When at least one is
   * registered, a single collapsed "passkey" row is shown above the grid that
   * expands to reveal whichever actions are available. Matched primarily by the
   * adapter's stable `id`s (`movement-passkey-signin` / `-create`); these names
   * are the fallback/override. Defaults to the names used by
   * `@moveindustries/wallet-adapter-passkey`.
   */
  passkeyWalletNames?: { signIn?: string; create?: string };
  /** Label for the collapsed passkey row. Defaults to "Continue with passkey". */
  passkeyLabel?: string;
}

function cleanWalletList(
  wallets: (AdapterWallet | AdapterNotDetectedWallet)[],
) {
  const unsupportedWallets = [
    "Dev T wallet",
    "Pontem Wallet",
    "Trust",
    "Tokenpocket",
    "Martian",
    "Rise",
    "Petra",
  ];
  return wallets
    .filter(
      (wallet, index, self) =>
        self.findIndex((w) => w.name === wallet.name) === index,
    )
    .filter((wallet) => {
      if (!wallet) return false;
      if (unsupportedWallets.includes(wallet.name)) return false;
      return wallet;
    });
}

const DEFAULT_PASSKEY_NAMES = {
  signIn: "Sign in with existing passkey",
  create: "Create new passkey",
};

/**
 * Stable adapter `id`s for the featured login wallets, as registered by
 * `@moveindustries/wallet-adapter-keyless` and `-passkey`. Matching on these
 * ids (rather than the user-facing name, which can change with i18n/rebrand)
 * is what keeps the modal wired to the right wallets. The `*Name` props remain
 * as a fallback for id-less registrations and as a consumer override.
 */
const FEATURED_IDS = {
  keyless: "movement-keyless",
  // Preferred: a single unified passkey wallet whose own `connect()` resolves
  // new-vs-existing (WebAuthn get, falling back to create). When registered, the
  // modal shows one "Continue with Passkey" button and lets the adapter/OS
  // resolve the rest. `-signin` / `-create` are the legacy split registrations,
  // still matched so the single button works against today's two-mode adapter.
  passkey: "movement-passkey",
  passkeySignIn: "movement-passkey-signin",
  passkeyCreate: "movement-passkey-create",
} as const;

// Separate content component for reuse in both Drawer and Modal
interface ConnectWalletContentProps extends WalletSortingOptions {
  onClose: () => void;
  description?: React.ReactNode;
  keylessWalletName?: string;
  passkeyWalletNames?: { signIn?: string; create?: string };
  passkeyLabel?: string;
}

function ConnectWalletContent({
  onClose,
  description = "Securely connect your wallet to the Movement Network.",
  keylessWalletName = "Sign in with Google",
  passkeyWalletNames = DEFAULT_PASSKEY_NAMES,
  passkeyLabel = "Continue with Passkey",
  ...walletSortingOptions
}: ConnectWalletContentProps) {
  const { wallets } = useWallet();
  const [isMoreWalletsOpen, setIsMoreWalletsOpen] = useState(false);
  const passkeySignInName =
    passkeyWalletNames.signIn ?? DEFAULT_PASSKEY_NAMES.signIn;
  const passkeyCreateName =
    passkeyWalletNames.create ?? DEFAULT_PASSKEY_NAMES.create;
  const {
    keylessWallet,
    passkeyWallet,
    passkeySignInWallet,
    passkeyCreateWallet,
    availableWallets,
    installableWallets,
  } = useMemo(() => {
    // The keyless + passkey adapters register as ordinary wallets; we only
    // change WHERE they render (dedicated rows above the grid), never how they
    // connect — every wallet, featured or not, still connects through the same
    // WalletItem path. Identify the featured ones by each adapter's stable
    // `id`, falling back to the display `name` for id-less registrations
    // (e.g. Storybook mocks) or a consumer override. `id` isn't on the
    // wallet-standard type, so read it defensively.
    const idOf = (w: AdapterWallet | AdapterNotDetectedWallet) =>
      (w as { id?: string }).id;
    const roles = [
      { id: FEATURED_IDS.keyless, name: keylessWalletName },
      // Unified passkey wallet is matched by id only (no name fallback — "" never
      // matches a real wallet), so it's picked up when the adapter registers one.
      { id: FEATURED_IDS.passkey, name: "" },
      { id: FEATURED_IDS.passkeySignIn, name: passkeySignInName },
      { id: FEATURED_IDS.passkeyCreate, name: passkeyCreateName },
    ];
    // Match on stable id, or on name — but never on an empty name, or a
    // malformed nameless wallet (`w.name === ""`) would match the id-only
    // passkey role (`name: ""`) and get hoisted out of the grid.
    const nameMatch = (
      w: AdapterWallet | AdapterNotDetectedWallet,
      r: { id: string; name: string },
    ) => r.name !== "" && w.name === r.name;
    const isFeatured = (w: AdapterWallet | AdapterNotDetectedWallet) =>
      roles.some((r) => idOf(w) === r.id || nameMatch(w, r));

    // Split the featured login wallets out first via the library's own
    // partition helper, then group the remaining wallets by ready-state as
    // usual. Pulling them out up front keeps them out of the grid entirely.
    const { defaultWallets: featured, moreWallets: rest } = partitionWallets(
      wallets,
      isFeatured,
    );
    const findRole = (r: { id: string; name: string }) =>
      featured.find((w) => idOf(w) === r.id) ??
      featured.find((w) => nameMatch(w, r)) ??
      null;

    const grouped = groupAndSortWallets(rest, walletSortingOptions);

    // Add Nightly as installable wallet if not already present
    const additionalInstallableWallets: (
      | AdapterWallet
      | AdapterNotDetectedWallet
    )[] = [];
    const hasNightly = [
      ...(grouped?.availableWallets ?? []),
      ...(grouped?.installableWallets ?? []),
    ].some((w) => w.name.toLowerCase().includes("nightly"));
    if (!hasNightly) {
      additionalInstallableWallets.push(nightlyWallet);
    }

    return {
      keylessWallet: findRole(roles[0]),
      passkeyWallet: findRole(roles[1]),
      passkeySignInWallet: findRole(roles[2]),
      passkeyCreateWallet: findRole(roles[3]),
      availableWallets: grouped?.availableWallets ?? [],
      installableWallets: [
        ...(grouped?.installableWallets ?? []),
        ...additionalInstallableWallets,
      ],
    };
  }, [
    wallets,
    walletSortingOptions,
    keylessWalletName,
    passkeySignInName,
    passkeyCreateName,
  ]);

  const hasPasskey =
    !!passkeyWallet || !!passkeySignInWallet || !!passkeyCreateWallet;
  const hasFeatured = !!keylessWallet || hasPasskey;

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center gap-6 px-6 pt-12 pb-6 md:max-w-114",
        // Cap to the viewport (minus a 1rem gutter) and scroll internally so
        // every part stays reachable on short screens. Must NOT use
        // justify-center here: on an overflowing flex column it pushes the top
        // off-screen and makes it unscrollable. Single scroll container — the
        // grid below deliberately doesn't add its own.
        "z-9999 mx-auto max-h-[calc(100vh-2rem)] overflow-x-hidden overflow-y-auto",
        // Figma "Connect Wallet/empty" (node 7887:9734): flat dark-gray card,
        // hairline white stroke, 24px radius — no gradient/blur.
        "rounded-[24px] border-[0.5px] border-white bg-[#2d2d2d]",
      )}
    >
      <div className="flex w-full max-w-102 flex-col items-center gap-4 p-0">
        <div className="w-full max-w-76 text-center font-display text-[32px] leading-[120%] font-normal tracking-[-0.03em] text-white">
          Connect Wallet
        </div>
        {description && (
          <div className="w-full max-w-sm text-center font-display text-lg leading-[140%] font-normal text-white/48">
            {description}
          </div>
        )}
      </div>

      {hasFeatured && (
        <div className="flex w-full max-w-102 flex-col gap-3">
          {keylessWallet && (
            <FeaturedWalletButton wallet={keylessWallet} onConnect={onClose} />
          )}
          {hasPasskey && (
            <PasskeyRows
              unifiedWallet={passkeyWallet}
              signInWallet={passkeySignInWallet}
              createWallet={passkeyCreateWallet}
              label={passkeyLabel}
              onConnect={onClose}
            />
          )}
          <div className="flex w-full items-center gap-3 pt-1">
            <div className="h-px flex-1 bg-white/20" />
            <span className="font-display text-sm leading-none font-medium text-white/48">
              or
            </span>
            <div className="h-px flex-1 bg-white/20" />
          </div>
        </div>
      )}

      <div className="flex w-full max-w-102 flex-row flex-wrap content-center items-start justify-center gap-4 p-4 py-4">
        {availableWallets.length > 0 ? (
          cleanWalletList(availableWallets).map((wallet) => (
            <div key={wallet.name} className="w-28 shrink-0">
              <IconWalletCard wallet={wallet} onConnect={onClose} />
            </div>
          ))
        ) : (
          <>
            <div className="h-px w-92 bg-[rgba(255,255,255,0.48)]" />
            <span className="font-display text-lg leading-[21.60px] font-medium text-[var(--color-cyan-300)]">
              Don&apos;t have a wallet?
            </span>
            <button
              className={cn(
                // Nightly download pill — violet is the Nightly brand colour
                // (Figma 7887:9734), not a Movement accent.
                "h-10 w-full rounded-xl bg-[#6067F9] px-4 py-1 [&_path]:fill-white",
                "inline-flex cursor-pointer items-center justify-center gap-2 border-none",
                "transition-all duration-200 ease-[ease]",
                "hover:opacity-90",
              )}
              onClick={() => window.open(nightlyWallet.url, "_blank")}
            >
              <DownloadText />
              <NightlyIcon size={30} fill="white" />
            </button>
          </>
        )}

        {!!installableWallets.length && (
          <div className="flex w-full flex-col gap-3">
            <button
              onClick={() => setIsMoreWalletsOpen(!isMoreWalletsOpen)}
              className={cn(
                "inline-flex items-center justify-center gap-2 self-center text-white",
                "rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200",
                "cursor-pointer border-none bg-transparent",
                "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                "disabled:pointer-events-none disabled:opacity-50",
                "h-9 px-3 hover:bg-white/20",
              )}
            >
              Other wallets
              <ChevronDown
                size={16}
                strokeWidth={2.5}
                className={cn(
                  "transition-transform duration-200",
                  isMoreWalletsOpen ? "rotate-180" : "rotate-0",
                )}
              />
            </button>
            {isMoreWalletsOpen && (
              <div className="animate-in fade-in duration-200">
                <div className="flex w-full flex-wrap items-start justify-center gap-4 pt-2">
                  {cleanWalletList(installableWallets).map((wallet) => (
                    <div
                      onClick={() => window.open(wallet.url, "_blank")}
                      key={wallet.name}
                      className="w-28 shrink-0 cursor-pointer"
                    >
                      <IconWalletCard wallet={wallet} onConnect={onClose} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export function WalletModal({
  onClose,
  description,
  ...walletSortingOptions
}: ConnectWalletDialogProps) {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || typeof window === "undefined") {
    return null;
  }

  const contentProps = {
    onClose,
    description,
    ...walletSortingOptions,
  };

  return isMobile ? (
    <Drawer
      open={true}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onOpenChange={(open: any) => !open && onClose()}
    >
      <DrawerContent className="z-9999">
        <DrawerTitle className="sr-only">Connect Wallet</DrawerTitle>
        <DrawerDescription className="sr-only">
          Connect your wallet to continue.
        </DrawerDescription>
        <ConnectWalletContent {...contentProps} />
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog
      open={true}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onOpenChange={(open: any) => !open && onClose()}
    >
      <DialogContent
        showCloseButton={false}
        // outline suppressed: the container is only a programmatic focus holder
        // (see onOpenAutoFocus), not a control the user tabs to.
        className="border-0 bg-transparent p-0 focus:outline-none focus-visible:outline-none"
        // Radix auto-focuses the first focusable child (the Google button) on
        // open, which fires :focus-visible and paints a cyan ring that looks
        // pre-selected. Move focus to the dialog container instead so a11y focus
        // still enters the dialog, but no button is highlighted until the user
        // actually tabs to it.
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (e.currentTarget as HTMLElement | null)?.focus();
        }}
      >
        <DialogTitle className="sr-only">Connect Wallet</DialogTitle>
        <DialogDescription className="sr-only">
          Connect your wallet to continue.
        </DialogDescription>
        <ConnectWalletContent {...contentProps} />
      </DialogContent>
    </Dialog>
  );
}

interface WalletRowProps {
  wallet: AdapterWallet | AdapterNotDetectedWallet;
  onConnect?: () => void;
}

// Full-width pill shared by the keyless and passkey rows.
const featuredButtonClass = cn(
  "inline-flex h-12 w-full cursor-pointer items-center justify-center gap-3 px-4",
  "rounded-xl border-[0.5px] border-white/48 bg-white/8",
  "font-display text-lg leading-[100%] font-normal text-white",
  "transition-all duration-200 ease-[ease] hover:bg-white/16",
  "focus-visible:ring-2 focus-visible:ring-[var(--color-cyan-300)] focus-visible:outline-none",
);

/** Full-width pill that connects a single "featured" wallet (keyless/passkey).
 *  Pass `icon` to override the wallet's registered icon (e.g. the passkey
 *  entry whose registered glyph is a `currentColor` SVG that doesn't render
 *  through <img>). Pass `label` to show custom text instead of `wallet.name`
 *  (e.g. "Continue with Passkey" over the underlying adapter's name).
 *  `className` overrides the pill style (e.g. the muted create fallback);
 *  `onActivate` fires on click alongside the connect (Radix Slot merges the
 *  handlers) — used to reveal the create option after a sign-in attempt. */
function FeaturedWalletButton({
  wallet,
  onConnect,
  icon,
  label,
  className,
  onActivate,
}: WalletRowProps & {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  className?: string;
  onActivate?: () => void;
}) {
  return (
    <WalletItem wallet={wallet} onConnect={onConnect}>
      <WalletItem.ConnectButton asChild>
        <button className={cn(featuredButtonClass, className)} onClick={onActivate}>
          <div className="flex h-6 w-6 shrink-0 items-center justify-center">
            {icon ?? (
              <WalletItem.Icon className="h-full w-full object-contain" />
            )}
          </div>
          {label ?? wallet.name}
        </button>
      </WalletItem.ConnectButton>
    </WalletItem>
  );
}

/**
 * Passkey entry. One primary "Continue with Passkey" button that connects the
 * existing-passkey (sign-in) wallet, driving the OS passkey picker. Because
 * wallet-adapter `connect()` is fire-and-forget (errors go to the app's
 * onError, not a promise we can await), we can't detect a failed sign-in to
 * then offer creation. Instead we reveal a muted "Create new Passkey" action
 * once the user has attempted sign-in: if sign-in succeeds the modal closes and
 * they never see it; if it doesn't (no passkey yet, or cancelled), the create
 * option is right there. When the adapter registers a single unified wallet
 * whose own connect() resolves new-vs-existing, we just render that — no
 * fallback needed.
 */
function PasskeyRows({
  unifiedWallet,
  signInWallet,
  createWallet,
  label,
  onConnect,
}: {
  unifiedWallet: AdapterWallet | AdapterNotDetectedWallet | null;
  signInWallet: AdapterWallet | AdapterNotDetectedWallet | null;
  createWallet: AdapterWallet | AdapterNotDetectedWallet | null;
  label: string;
  onConnect?: () => void;
}) {
  const [triedSignIn, setTriedSignIn] = useState(false);

  if (unifiedWallet) {
    return (
      <FeaturedWalletButton
        wallet={unifiedWallet}
        onConnect={onConnect}
        icon={<Fingerprint size={22} strokeWidth={2.5} />}
        label={label}
      />
    );
  }

  const primary = signInWallet ?? createWallet;
  if (!primary) return null;
  // Offer create only when there's a distinct create entry to fall back to
  // (i.e. the primary is the sign-in wallet, not the create wallet itself).
  const createFallback =
    createWallet && createWallet !== primary ? createWallet : null;

  return (
    <div className="flex w-full flex-col gap-2">
      <FeaturedWalletButton
        wallet={primary}
        onConnect={onConnect}
        icon={<Fingerprint size={22} strokeWidth={2.5} />}
        label={label}
        onActivate={
          createFallback ? () => setTriedSignIn(true) : undefined
        }
      />
      {createFallback && triedSignIn && (
        <FeaturedWalletButton
          wallet={createFallback}
          onConnect={onConnect}
          icon={<Fingerprint size={18} strokeWidth={2.5} />}
          label="Create new Passkey"
          className={cn(
            "h-10 border-0 bg-transparent text-base font-normal text-white/56",
            "hover:bg-white/6 hover:text-white",
            "animate-in fade-in slide-in-from-top-1 duration-200",
          )}
        />
      )}
    </div>
  );
}

const gridCard = (child: React.ReactNode) => (
  <div className="group/wallet relative h-28 w-28 cursor-pointer rounded-lg transition-shadow duration-200 ease-in-out hover:shadow-[0.25rem_0.25rem_0_var(--color-cyan-300)]">
    <div className="absolute inset-0 rounded-lg bg-[#090909]" />
    <div className="absolute top-1/2 left-1/2 flex h-20.5 w-20.5 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 p-0">
      {child}
    </div>
  </div>
);

/**
 * Icon-style wallet card that preserves WalletItem logic (connect/install).
 * Icons come from each wallet’s `icon` field via WalletItem.Icon.
 */
function IconWalletCard({ wallet, onConnect }: WalletRowProps) {
  const installRequired = isInstallRequired(wallet);

  if (installRequired) {
    return (
      <WalletItem wallet={wallet} onConnect={onConnect}>
        <div className="cursor-default border-none bg-transparent p-0">
          {gridCard(
            <>
              <div className="h-14 w-14">
                <WalletItem.Icon className="h-full w-full object-contain" />
              </div>
              <div className="flex h-4.5 w-20.5 items-center justify-center text-center font-display text-lg leading-[100%] font-normal tracking-[-0.06em] text-white">
                {cleanWalletName(wallet.name)}
              </div>
              <div className="absolute top-[-1rem] left-1/2 z-9999 hidden h-5 w-28 -translate-x-1/2 items-center justify-center overflow-hidden rounded-t-lg bg-[var(--color-cyan-300)]/80 group-hover/wallet:inline-flex">
                <span className="font-display text-xs leading-[14px] font-bold tracking-[0.40px] text-black uppercase">
                  INSTALL
                </span>
              </div>
            </>,
          )}
        </div>
      </WalletItem>
    );
  }

  return (
    <WalletItem wallet={wallet} onConnect={onConnect}>
      <WalletItem.ConnectButton asChild>
        <button className="relative cursor-pointer border-none bg-transparent p-0">
          {gridCard(
            <>
              <div className="h-14 w-14">
                <WalletItem.Icon className="h-full w-full object-contain" />
              </div>
              <div className="flex h-4.5 w-20.5 items-center justify-center text-center font-display text-lg leading-[100%] font-normal tracking-[-0.06em] text-white">
                {cleanWalletName(wallet.name)}
              </div>
            </>,
          )}
          <span className="pointer-events-none absolute bottom-[-0.5rem] left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-white/60 opacity-0 transition-opacity duration-200 ease-in-out hover:opacity-100">
            Click to connect
          </span>
        </button>
      </WalletItem.ConnectButton>
    </WalletItem>
  );
}

