"use client";

import {
  type AdapterWallet,
  type AdapterNotDetectedWallet,
  WalletItem,
  type WalletSortingOptions,
  groupAndSortWallets,
  isInstallRequired,
  useWallet,
  WalletReadyState,
} from "@aptos-labs/wallet-adapter-react";

import { useMemo, useState, useEffect } from "react";
import { OKXWallet } from "@okwallet/aptos-wallet-adapter";
import { MSafeWalletAdapter } from "@msafe/aptos-wallet-adapter";
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

const nightlyWallet: AdapterNotDetectedWallet = {
  name: "Nightly Wallet",
  url: "https://nightly.app/download",
  icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI5IiBoZWlnaHQ9IjEyOSIgdmlld0JveD0iMCAwIDEyOSAxMjkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMTMuMzgxIDAuMjVDMTA0LjAwOCAxMy4zMjI1IDkyLjI4NzQgMjIuMzg0NyA3OC40MTcyIDI4LjQ1NTZDNzMuNjA5MiAyNy4xNDg0IDY4LjY2ODIgMjYuNDM5NCA2My44MTU5IDI2LjQ4MzdDNTguOTYzNSAyNi40Mzk0IDU0LjAyMjUgMjcuMTI2MiA0OS4yMTQ1IDI4LjQ1NTZDMzUuMzY2NSAyMi4zODQ3IDIzLjYyMzQgMTMuMzIyNSAxNC4yNTEgMC4yNUMxMS40MTUgNy4zNjIzNCAwLjUxMzc5NiAzMS45MzQzIDEzLjYwODUgNjYuMjU1MkMxMy42MDg1IDY2LjI1NTIgOS40MjA4NCA4NC4xODAxIDE3LjEwOTMgOTkuNTc5MUMxNy4xMDkzIDk5LjU3OTEgMjguMjU0MSA5NC41NDk1IDM3LjA3MjYgMTAxLjYxN0M0Ni4zMTIgMTA5LjEyOSA0My4zNjUxIDExNi4zMyA0OS44NzkyIDEyMi41MzRDNTUuNDYyNyAxMjguMjUgNjMuODE1OSAxMjguMjUgNjMuODE1OSAxMjguMjVDNjMuODE1OSAxMjguMjUgNzIuMTY5IDEyOC4yNSA3Ny43NTI1IDEyMi41MzRDODQuMjY2NiAxMTYuMzMgODEuMzQxOSAxMDkuMTI5IDkwLjU1OTIgMTAxLjYxN0M5OS4zNzc2IDk0LjUyNzMgMTEwLjUyMiA5OS41NzkxIDExMC41MjIgOTkuNTc5MUMxMTguMjExIDg0LjE4MDEgMTE0LjAyMyA2Ni4yNTUyIDExNC4wMjMgNjYuMjU1MkMxMjcuMTE4IDMxLjkzNDMgMTE2LjIxNyA3LjM2MjM0IDExMy4zODEgMC4yNVpNMjAuNTY1NyA2MS40OTE1QzEzLjQ1MzQgNDYuODkwMSAxMS40ODE0IDI2LjgzODIgMTYuMDAxNCAxMC45OTYxQzIxLjkzOTUgMjYuMDE4NCAzMC4wMDQ1IDMyLjc3NjIgMzkuNjIwNiAzOS44ODg2QzM1LjUyMTYgNDguMzUyNSAyNy44Nzc1IDU2LjMyODkgMjAuNTY1NyA2MS40OTE1Wk00MS4wMzg2IDg3LjIxNTZDMzUuNDU1MSA4NC43MzQgMzQuMjM2NSA3OS44MzczIDM0LjIzNjUgNzkuODM3M0M0MS44ODA2IDc1LjAyOTMgNTMuMTE0MSA3OC43MDczIDUzLjQ2ODYgOTAuMDk1OUM0Ny41NTI3IDg2LjUyODcgNDUuNjAyOSA4OS4yMzE4IDQxLjAzODYgODcuMjE1NlpNNjMuODE1OSAxMjcuNjA3QzU5LjgwNTUgMTI3LjYwNyA1Ni41NDg0IDEyNC43NDkgNTYuNTQ4NCAxMjEuMjA0QzU2LjU0ODQgMTE3LjY1OSA1OS44MDU1IDExNC44MDEgNjMuODE1OSAxMTQuODAxQzY3LjgyNjMgMTE0LjgwMSA3MS4wODMzIDExNy42NTkgNzEuMDgzMyAxMjEuMjA0QzcxLjA4MzMgMTI0Ljc0OSA2Ny44MjYzIDEyNy42MDcgNjMuODE1OSAxMjcuNjA3Wk04Ni41OTMxIDg3LjIxNTZDODIuMDI4OCA4OS4yMDk3IDgwLjA3OSA4Ni41MDY1IDc0LjE2MzEgOTAuMDk1OUM3NC41MTc2IDc4LjcwNzMgODUuNzUxMSA3NS4wMjkzIDkzLjM5NTIgNzkuODM3M0M5My4zOTUyIDc5Ljg1OTUgOTIuMTk4OCA4NC43NTYxIDg2LjU5MzEgODcuMjE1NlpNMTA3LjA2NiA2MS40OTE1Qzk5Ljc1NDIgNTYuMzI4OSA5Mi4xMTAxIDQ4LjM1MjUgODguMDMzMyAzOS44ODg2Qzk3LjY0OTQgMzIuNzc2MiAxMDUuNzE0IDI2LjAxODQgMTExLjY1MiAxMC45OTYxQzExNi4xNSAyNi44NjA0IDExNC4xNzggNDYuOTEyMyAxMDcuMDY2IDYxLjQ5MTVaIiBmaWxsPSIjNjA2N0Y5Ii8+Cjwvc3ZnPgo=",
  readyState: WalletReadyState.NotDetected,
};

const cleanWalletName = (name: string) => name.replace(/ Wallet$/i, "");

const IconX = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);

export interface ConnectWalletDialogProps extends WalletSortingOptions {
  onClose: () => void;
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

// Separate content component for reuse in both Drawer and Modal
interface ConnectWalletContentProps extends WalletSortingOptions {
  onClose: () => void;
  showCloseButton?: boolean;
}

function ConnectWalletContent({
  onClose,
  showCloseButton = true,
  ...walletSortingOptions
}: ConnectWalletContentProps) {
  const { wallets } = useWallet();
  const [isMoreWalletsOpen, setIsMoreWalletsOpen] = useState(false);
  const isMobile = useIsMobile();

  const { aptosConnectWallets, availableWallets, installableWallets } =
    useMemo(() => {
      const grouped = groupAndSortWallets(wallets, walletSortingOptions);

      // Add OKX and MSafe as installable wallets if not already present
      const additionalInstallableWallets: (
        | AdapterWallet
        | AdapterNotDetectedWallet
      )[] = [];

      // Check if OKX wallet is already in the lists
      const hasOKX = [
        ...(grouped?.availableWallets ?? []),
        ...(grouped?.installableWallets ?? []),
      ].some((w) => w.name.toLowerCase().includes("okx"));
      if (!hasOKX) {
        additionalInstallableWallets.push(
          new OKXWallet() as AdapterNotDetectedWallet,
        );
      }

      // Check if MSafe wallet is already in the lists
      const hasMSafe = [
        ...(grouped?.availableWallets ?? []),
        ...(grouped?.installableWallets ?? []),
      ].some((w) => w.name.toLowerCase().includes("msafe"));
      if (!hasMSafe) {
        additionalInstallableWallets.push(
          new MSafeWalletAdapter(
            undefined,
            "MOVEMENT",
          ) as unknown as AdapterNotDetectedWallet,
        );
      }
      return {
        aptosConnectWallets: grouped?.aptosConnectWallets ?? [],
        availableWallets: grouped?.availableWallets ?? [],
        installableWallets: [
          ...(grouped?.installableWallets ?? []),
          ...additionalInstallableWallets,
        ],
      };
    }, [wallets, walletSortingOptions]);

  const hasAptosConnectWallets = false; // keep original logic toggle

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-6 p-12 px-6 pb-6 md:max-w-114",
        "z-9999 mx-auto max-h-full overflow-y-auto md:max-h-[80vh]",
        "bg-linear-to-r from-[rgba(4,5,27,0.2)] to-[rgba(4,5,27,0.2)]",
        "bg-[linear-gradient(152.97deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_100%),radial-gradient(100%_100%_at_120.34%_112.85%,rgba(129,255,186,0.4)_0%,rgba(0,27,133,0.4)_100%)]",
        "backdrop-blur-[1.3125rem]",
      )}
    >
      {showCloseButton && !isMobile && (
        <button
          onClick={onClose}
          className={cn(
            "absolute top-6 right-6 z-9999 rounded-sm opacity-70",
            "cursor-pointer border border-white/20 bg-white/10 p-2 text-white",
            "transition-opacity hover:bg-white/20 hover:opacity-100",
            "focus:outline-none",
          )}
        >
          <IconX className="h-4 w-4" />
        </button>
      )}

      <div className="flex w-full max-w-102 flex-col items-center gap-4 p-0">
        <div className="w-full max-w-76 text-center font-['TWK_Everett_Mono',monospace] text-[32px] leading-[120%] font-medium tracking-[-1.28px] text-white">
          Connect Wallet
        </div>
        <div className="w-full max-w-[24rem] text-center font-['Neue_Haas_Unica_Pro',sans-serif] text-lg leading-[140%] font-normal text-white/48">
          Securely connect your{" "}
          <a
            className="cursor-pointer text-white/48 underline decoration-dotted hover:text-white"
            href="https://docs.movementnetwork.xyz/general/usingmovement/connect_to_movement"
            target="_blank"
            rel="noopener noreferrer"
          >
            wallet
          </a>{" "}
          to transfer digital assets to and from the Movement network.
        </div>
      </div>

      <div className="flex max-h-168 w-full max-w-102 flex-row flex-wrap content-center items-start justify-center gap-4 overflow-y-auto p-4 py-4">
        {availableWallets.length > 0 ? (
          cleanWalletList(availableWallets).map((wallet) => (
            <div key={wallet.name} className="w-28 shrink-0">
              <IconWalletCard wallet={wallet} onConnect={onClose} />
            </div>
          ))
        ) : (
          <>
            <div className="h-px w-92 bg-(--color-foreground-lighten-2,rgba(255,255,255,0.48))" />
            <span className="font-['TWK_Everett_Mono',monospace] text-lg leading-[21.60px] font-medium text-[#81FFBA]">
              Don&apos;t have a wallet?
            </span>
            <button
              className={cn(
                "h-10 w-full rounded-full bg-[#6067F9] px-4 py-1",
                "flex cursor-pointer items-center justify-center border-none",
                "transition-all duration-200 ease-in-out",
                "hover:bg-white hover:text-black [&:hover_path]:fill-black",
              )}
              onClick={() => window.open(nightlyWallet.url, "_blank")}
            >
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
                <path
                  d="M58.3875 0.51001V15.31H55.5875V0.51001H58.3875Z"
                  fill="white"
                />
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

              <div className="relative h-10 w-[116px] overflow-hidden">
                <svg
                  width="116"
                  height="40"
                  viewBox="0 0 116 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26.9098 7.55835C25.0973 10.094 22.8256 11.8532 20.1431 13.0421C19.2127 12.7873 18.2581 12.6418 17.3156 12.6539C16.3731 12.6418 15.4185 12.7752 14.4881 13.0421C11.8056 11.8532 9.53394 10.094 7.72144 7.55835C7.1656 8.94142 5.0631 13.7215 7.6006 20.3821C7.6006 20.3821 6.79102 23.8641 8.27727 26.8607C8.27727 26.8607 10.4281 25.878 12.1439 27.2611C13.9323 28.7291 13.3644 30.1243 14.621 31.3254C15.7085 32.4294 17.3277 32.4294 17.3277 32.4294C17.3277 32.4294 18.9469 32.4294 20.0344 31.3254C21.3031 30.1243 20.7231 28.717 22.5114 27.2611C24.2152 25.8902 26.3781 26.8607 26.3781 26.8607C27.8644 23.8641 27.0548 20.3821 27.0548 20.3821C29.5681 13.7215 27.4535 8.95356 26.9098 7.55835ZM8.94185 19.4722C7.56435 16.6333 7.18977 12.7388 8.05977 9.65723C9.20768 12.569 10.7664 13.8914 12.6273 15.2745C11.8298 16.9123 10.3556 18.4652 8.94185 19.4722ZM12.8931 24.4707C11.8056 23.9854 11.576 23.0391 11.576 23.0391C13.0623 22.1049 15.2252 22.8207 15.3098 25.0288C14.1619 24.3372 13.7752 24.8589 12.8931 24.4707ZM17.3035 32.3324C16.5302 32.3324 15.8898 31.7743 15.8898 31.0949C15.8898 30.4155 16.5181 29.8574 17.3035 29.8574C18.0889 29.8574 18.7173 30.4155 18.7173 31.0949C18.7173 31.7743 18.0889 32.3324 17.3035 32.3324ZM21.726 24.4707C20.8439 24.8589 20.4573 24.3372 19.3214 25.0288C19.3939 22.8207 21.5689 22.1049 23.0552 23.0391C23.0431 23.0391 22.8014 23.9975 21.726 24.4707ZM25.6773 19.4722C24.2635 18.4774 22.7773 16.9123 21.9919 15.2745C23.8527 13.8914 25.4114 12.5811 26.5594 9.65723C27.4414 12.7388 27.0669 16.6333 25.6773 19.4722Z"
                    fill="#F7F7F7"
                  />
                  <path
                    d="M35.5496 12.9451H38.7396L45.035 22.7237V12.9451H48.2975V28.074H45.1196L38.8 18.2833V28.0618H35.5254L35.5496 12.9451Z"
                    fill="#F7F7F7"
                  />
                  <path
                    d="M51.0645 15.5898C50.7141 15.2622 50.5449 14.8376 50.5449 14.3402C50.5449 13.8549 50.7141 13.4303 51.0645 13.1027C51.4149 12.763 51.8258 12.5931 52.3333 12.5931C52.8287 12.5931 53.2637 12.763 53.602 13.1027C53.9524 13.4424 54.1216 13.8549 54.1216 14.3402C54.1216 14.8376 53.9524 15.2622 53.602 15.5898C53.2516 15.9295 52.8408 16.0872 52.3333 16.0872C51.8258 16.0872 51.4028 15.9295 51.0645 15.5898ZM50.6899 17.6887H53.9645V28.0739H50.6899V17.6887Z"
                    fill="#F7F7F7"
                  />
                  <path
                    d="M59.8492 32.854C59.1484 32.7326 58.5684 32.5506 58.0971 32.3323V29.9301C59.1967 30.4154 60.4775 30.658 61.9275 30.658C63.0875 30.658 63.9213 30.4154 64.4288 29.9422C64.9242 29.4691 65.19 28.7533 65.19 27.7948V27.1518C64.755 27.5522 64.1992 27.8676 63.5467 28.0739C62.9063 28.2801 62.2175 28.3893 61.4805 28.3893C60.4171 28.3893 59.4625 28.1588 58.6288 27.6856C57.783 27.2125 57.1305 26.5573 56.6592 25.7323C56.188 24.8952 55.9463 23.9368 55.9463 22.8691C55.9463 21.7772 56.1759 20.8066 56.6471 19.9695C57.1184 19.1324 57.7588 18.4894 58.5805 18.0405C59.4021 17.5916 60.3567 17.3611 61.42 17.3611C62.2296 17.3611 62.9305 17.4824 63.5588 17.7129C64.175 17.9434 64.755 18.3074 65.2988 18.817V17.6887H68.4405V27.4187C68.4405 29.2143 67.9088 30.6095 66.8455 31.5922C65.7821 32.5749 64.1388 33.0602 61.9275 33.0602C61.2388 33.0481 60.538 32.9874 59.8492 32.854ZM64.0663 25.3198C64.598 24.9559 64.9725 24.4584 65.178 23.8518V21.9107C64.9484 21.3041 64.5738 20.8188 64.0421 20.4548C63.5105 20.103 62.9184 19.921 62.2417 19.921C61.3717 19.921 60.6467 20.1879 60.0909 20.7217C59.535 21.2555 59.2571 21.9713 59.2571 22.8691C59.2571 23.779 59.535 24.507 60.0909 25.0529C60.6467 25.5989 61.3596 25.8658 62.2417 25.8658C62.9184 25.8658 63.5225 25.6838 64.0663 25.3198Z"
                    fill="#F7F7F7"
                  />
                  <path
                    d="M70.6877 12.0836H73.9502V18.8777C74.4336 18.3803 74.9894 17.992 75.6057 17.7372C76.2219 17.4825 76.8744 17.3611 77.5873 17.3611C79.0011 17.3611 80.0523 17.7372 80.7411 18.5016C81.4419 19.2659 81.7802 20.285 81.7802 21.5589V28.0739H78.5177V21.9229C78.5177 20.5883 77.9015 19.9089 76.669 19.9089C76.1252 19.9089 75.6177 20.0424 75.1344 20.3093C74.6632 20.5762 74.2644 20.9766 73.9261 21.4982V28.0739H70.6636L70.6877 12.0836Z"
                    fill="#F7F7F7"
                  />
                  <path
                    d="M85.5262 27.3945C84.8978 26.7151 84.5837 25.793 84.5837 24.5919V20.0423H83.0732V17.6887H84.5837V14.5707H87.8462V17.6887H90.2749V20.0423H87.8462V24.1551C87.8462 24.7618 87.967 25.1985 88.1966 25.4654C88.4262 25.7323 88.837 25.8658 89.4291 25.8658C89.9003 25.8658 90.3595 25.7445 90.7945 25.514V27.9525C90.1299 28.2437 89.2962 28.3893 88.2932 28.3893C87.0728 28.3893 86.1545 28.0617 85.5262 27.3945Z"
                    fill="#F7F7F7"
                  />
                  <path
                    d="M92.2808 12.0836H95.5433V28.0739H92.2808V12.0836Z"
                    fill="#F7F7F7"
                  />
                  <path
                    d="M99.3132 32.2717C98.8661 32.2111 98.5157 32.1383 98.2861 32.0291V29.5905C98.697 29.7482 99.1561 29.8331 99.6636 29.8331C100.183 29.8331 100.57 29.7118 100.848 29.4813C101.114 29.2508 101.331 28.899 101.512 28.4015L101.863 27.5159L97.3799 17.6766H100.654L103.591 24.8347L106.37 17.6766H109.632L105.234 28.7776C104.751 30.003 104.147 30.9008 103.422 31.4831C102.697 32.0655 101.778 32.3445 100.667 32.3445C100.207 32.3566 99.7724 32.3324 99.3132 32.2717Z"
                    fill="#F7F7F7"
                  />
                </svg>
              </div>
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
                "h-9 px-3 hover:bg-white/10",
              )}
            >
              Other wallets
              <svg
                className={cn(
                  "h-4 w-4 fill-white transition-transform duration-200",
                  isMoreWalletsOpen ? "rotate-180" : "rotate-0",
                )}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0001 10.9767L14.1251 6.85168L15.3034 8.03002L10.0001 13.3334L4.69678 8.03002L5.87511 6.85168L10.0001 10.9767Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {isMoreWalletsOpen && (
              <div className="animate-in fade-in overflow-hidden duration-200">
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

      {hasAptosConnectWallets && (
        <div className="flex flex-col gap-3">
          {aptosConnectWallets.map((wallet) => (
            <AptosConnectWalletRow
              key={wallet.name}
              wallet={wallet}
              onConnect={onClose}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function WalletModal({
  onClose,
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
          Securely connect your wallet to transfer digital assets to and from
          the Movement network.
        </DrawerDescription>
        <ConnectWalletContent {...contentProps} showCloseButton={false} />
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
        className="border-0 bg-transparent p-0"
      >
        <DialogTitle className="sr-only">Connect Wallet</DialogTitle>
        <DialogDescription className="sr-only">
          Securely connect your wallet to transfer digital assets to and from
          the Movement network.
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

const gridCard = (child: React.ReactNode) => (
  <div className="group/wallet relative h-28 w-28 cursor-pointer rounded-lg backdrop-blur-[1.3125rem] transition-shadow duration-200 ease-in-out hover:shadow-[0.25rem_0.25rem_0_#81FFBA]">
    <div className="absolute inset-0 rounded-lg bg-linear-to-br from-white/[0.096] to-transparent backdrop-blur-[1.3125rem] group-hover/wallet:bg-gradient-to-br group-hover/wallet:from-white/40 group-hover/wallet:to-transparent" />
    <div className="absolute top-1/2 left-1/2 flex h-20.5 w-[5.125rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 p-0">
      {child}
    </div>
  </div>
);

/**
 * Icon-style wallet card that preserves WalletItem logic (connect/install)
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
                <WalletItem.Icon className="h-full w-full" />
              </div>
              <div className="flex h-[1.125rem] w-[5.125rem] items-center justify-center text-center font-['TWK_Everett_Mono',monospace] text-lg leading-[100%] font-normal tracking-[-0.06em] text-white">
                {cleanWalletName(wallet.name)}
              </div>
              <div className="absolute top-[-1rem] left-1/2 z-[9999] hidden h-5 w-28 -translate-x-1/2 items-center justify-center overflow-hidden rounded-t-lg bg-[rgba(129,255,186,0.80)] group-hover/wallet:inline-flex">
                <span className="font-['TWK_Everett_Mono',monospace] text-xs leading-[14px] font-bold tracking-[0.40px] text-[var(--color-secondary-base,#0337FF)] uppercase">
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
                <WalletItem.Icon className="h-full w-full" />
              </div>
              <div className="flex h-[1.125rem] w-[5.125rem] items-center justify-center text-center font-['TWK_Everett_Mono',monospace] text-lg leading-[100%] font-normal tracking-[-0.06em] text-white">
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

function AptosConnectWalletRow({ wallet, onConnect }: WalletRowProps) {
  return (
    <WalletItem wallet={wallet} onConnect={onConnect}>
      <WalletItem.ConnectButton asChild>
        <button
          className={cn(
            "inline-flex w-full items-center justify-center gap-4 whitespace-nowrap",
            "rounded-md text-sm font-medium transition-colors",
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:opacity-50",
            "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
            "h-11 px-2",
          )}
        >
          <WalletItem.Icon className="h-5 w-5" />
          <WalletItem.Name className="text-sm font-normal md:text-base" />
        </button>
      </WalletItem.ConnectButton>
    </WalletItem>
  );
}
