"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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
import { Button } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import { truncateAddress } from "./format";
import { TxPayloadSummary } from "./TxPayloadSummary";

export type TransactionApprovalKind = "sign-and-submit" | "sign";

export interface TransactionApprovalModalProps {
  /** Whether the modal is shown. The parent owns this state. */
  open: boolean;
  /** User approved — proceed to signing. */
  onApprove: () => void;
  /** User rejected, or dismissed via overlay/escape/close. */
  onReject: () => void;
  /**
   * The transaction the dApp asked to sign — the same object passed to
   * `signAndSubmitTransaction` / `signTransaction`. Decoded for display; the
   * modal never mutates it and needs no wallet-adapter dependency.
   */
  payload: unknown;
  /** Whether this is a sign-and-submit or sign-only request. Default "sign-and-submit". */
  kind?: TransactionApprovalKind;
  /** Wallet name shown in the header (e.g. "Continue with Passkey"). */
  walletName?: string;
  /** Signer address, shown truncated next to the wallet name. */
  address?: string;
  /**
   * Pending state — disables both actions and shows a spinner on Approve.
   * Use while the downstream signing prompt (e.g. the passkey biometric) is up.
   */
  loading?: boolean;
  /** Header title. Default "Approve transaction". */
  title?: string;
  /** Approve button label. Default "Approve". */
  approveLabel?: string;
  /** Reject button label. Default "Reject". */
  rejectLabel?: string;
  /** Optional icon rendered above the title (e.g. a passkey fingerprint). */
  icon?: React.ReactNode;
  /**
   * Decimals of the asset being transferred, for coin/FA transfers where the
   * DS can't infer them. When omitted, such amounts render as raw base units.
   * (Native MOVE transfers are always formatted as MOVE and ignore this.)
   */
  assetDecimals?: number;
  /** Ticker shown next to a formatted coin/FA amount (e.g. "USDC"). */
  assetSymbol?: string;
}

/**
 * Responsive transaction-approval modal — a Dialog on desktop and a Drawer on
 * mobile, matching the WalletModal chrome (dark card, hairline white stroke,
 * 24px radius). Purely presentational: it renders a decoded summary of
 * `payload` and reports the user's Approve/Reject decision via callbacks.
 */
export function TransactionApprovalModal(props: TransactionApprovalModalProps) {
  const { open, onReject } = props;
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || typeof window === "undefined") {
    return null;
  }

  const onOpenChange = (next: boolean) => {
    if (!next) onReject();
  };

  return isMobile ? (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="z-9999 border-0 bg-transparent">
        <DrawerTitle className="sr-only">
          {props.title ?? "Approve transaction"}
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          Review the transaction details before signing.
        </DrawerDescription>
        <ApprovalContent {...props} />
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="border-0 bg-transparent p-0 focus:outline-none focus-visible:outline-none"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          (e.currentTarget as HTMLElement | null)?.focus();
        }}
      >
        <DialogTitle className="sr-only">
          {props.title ?? "Approve transaction"}
        </DialogTitle>
        <DialogDescription className="sr-only">
          Review the transaction details before signing.
        </DialogDescription>
        <ApprovalContent {...props} />
      </DialogContent>
    </Dialog>
  );
}

function ApprovalContent({
  onApprove,
  onReject,
  payload,
  kind = "sign-and-submit",
  walletName,
  address,
  loading = false,
  title = "Approve transaction",
  approveLabel = "Approve",
  rejectLabel = "Reject",
  icon,
  assetDecimals,
  assetSymbol,
}: TransactionApprovalModalProps) {
  return (
    <div
      className={cn(
        "z-9999 mx-auto flex w-full max-w-[420px] flex-col items-stretch gap-6 p-6",
        "max-h-[calc(100vh-2rem)] overflow-x-hidden overflow-y-auto",
        "rounded-[24px] border-[0.5px] border-white bg-[#2d2d2d]",
      )}
    >
      <div className="flex w-full flex-col items-center gap-2 text-center">
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center text-[var(--color-cyan-300)]">
            {icon}
          </div>
        )}
        <div className="font-display text-2xl leading-[120%] font-normal tracking-[-0.03em] text-white">
          {title}
        </div>
        {(walletName || address) && (
          <div className="flex max-w-full items-center gap-2 truncate font-display text-sm text-white/48">
            {walletName && <span className="truncate">{walletName}</span>}
            {walletName && address && <span>·</span>}
            {address && (
              <span className="font-mono text-xs" title={address}>
                {truncateAddress(address)}
              </span>
            )}
          </div>
        )}
      </div>

      <TxPayloadSummary
        payload={payload}
        kind={kind}
        decimals={assetDecimals}
        symbol={assetSymbol}
      />

      <div className="flex w-full gap-3">
        <Button
          variant="outline"
          className="flex-1 rounded-xl"
          onClick={onReject}
          disabled={loading}
        >
          {rejectLabel}
        </Button>
        <Button
          className="flex-1 rounded-xl"
          onClick={onApprove}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Approving
            </>
          ) : (
            approveLabel
          )}
        </Button>
      </div>
    </div>
  );
}
