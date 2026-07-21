import { cn } from "@/lib/utils";
import {
  formatOctas,
  formatUnits,
  parseAmount,
  prettyJson,
  truncateAddress,
} from "./format";
import type { TransactionApprovalKind } from "./TransactionApprovalModal";

interface Payload {
  // signAndSubmitTransaction — InputTransactionData shape
  data?: TransactionData;
  // signTransaction — { transactionOrPayload, asFeePayer? }
  transactionOrPayload?: unknown;
  asFeePayer?: boolean;
  // wallet-standard sign-and-submit / signTransaction v1.1 shape — `payload`
  payload?: TransactionData;
  feePayer?: unknown;
  gasUnitPrice?: number;
  maxGasAmount?: number;
}

interface TransactionData {
  function?: string;
  typeArguments?: string[];
  functionArguments?: unknown[];
}

/**
 * Human-readable summary of a transaction payload.
 *
 * Recognized functions (MOVE/coin/FA transfers) get a structured
 * "Action / Amount / Recipient" block; anything else falls back to a generic
 * "Call function" view with the full payload behind a disclosure. This is the
 * same decode logic used in keyless-playground's approve modal, restyled with
 * the design-system's dark-card tokens.
 */
export function TxPayloadSummary({
  payload,
  kind,
  decimals,
  symbol,
}: {
  payload: unknown;
  kind: TransactionApprovalKind;
  /** Decimals of the coin/FA being moved, when the host knows them. */
  decimals?: number;
  /** Ticker shown next to a formatted amount (e.g. "USDC"). */
  symbol?: string;
}) {
  const p = (payload ?? {}) as Payload;
  const data =
    p.data ?? p.payload ?? (p.transactionOrPayload as TransactionData | undefined);
  const fn = data?.function;

  // Native transfer is always MOVE (8 decimals), so it formats itself. For the
  // generic coin/FA transfers the asset is arbitrary and the modal can't infer
  // decimals — format only when the host supplies them, else show the exact
  // signed integer labeled as base units so it's never misread as a decimal.
  const genericAmount = (amount: bigint | null): string => {
    if (amount === null) return "—";
    if (decimals === undefined) return `${amount.toString()} base units`;
    const formatted = formatUnits(amount, decimals);
    return symbol ? `${formatted} ${symbol}` : formatted;
  };

  // signTransaction can carry a set fee payer (`feePayer`) or ask the signer to
  // act as one (`asFeePayer`); either means the "Fee payer role" note applies.
  const isFeePayer = !!p.feePayer || !!p.asFeePayer;

  // 0x1::aptos_account::transfer(recipient, amount)
  if (fn === "0x1::aptos_account::transfer") {
    const args = data?.functionArguments ?? [];
    const amount = parseAmount(args[1]);
    return (
      <Summary>
        <Pill label="Action" value="Send MOVE" />
        <DetailRow
          label="Amount"
          value={amount !== null ? `${formatOctas(amount)} MOVE` : "—"}
          mono
        />
        <AddressRow label="Recipient" address={String(args[0] ?? "")} />
        <FootnoteRow kind={kind} feePayer={isFeePayer} />
      </Summary>
    );
  }

  // 0x1::aptos_account::transfer_coins<T>(recipient, amount)
  if (fn === "0x1::aptos_account::transfer_coins") {
    const args = data?.functionArguments ?? [];
    const amount = parseAmount(args[1]);
    return (
      <Summary>
        <Pill label="Action" value="Send coin" />
        <DetailRow
          label="Coin type"
          value={String(data?.typeArguments?.[0] ?? "unknown")}
          mono
          truncate
        />
        <DetailRow label="Amount" value={genericAmount(amount)} mono />
        <AddressRow label="Recipient" address={String(args[0] ?? "")} />
        <FootnoteRow kind={kind} feePayer={isFeePayer} />
      </Summary>
    );
  }

  // 0x1::primary_fungible_store::transfer(asset, recipient, amount)
  if (fn === "0x1::primary_fungible_store::transfer") {
    const args = data?.functionArguments ?? [];
    const amount = parseAmount(args[2]);
    return (
      <Summary>
        <Pill label="Action" value="Send fungible asset" />
        <AddressRow label="Asset" address={String(args[0] ?? "")} />
        <DetailRow label="Amount" value={genericAmount(amount)} mono />
        <AddressRow label="Recipient" address={String(args[1] ?? "")} />
        <FootnoteRow kind={kind} feePayer={isFeePayer} />
      </Summary>
    );
  }

  // Fallback: generic function call
  return (
    <Summary>
      <Pill label="Action" value="Call function" />
      {fn && <DetailRow label="Function" value={fn} mono truncate />}
      {data?.typeArguments && data.typeArguments.length > 0 && (
        <DetailRow label="Type args" value={data.typeArguments.join(", ")} mono truncate />
      )}
      {data?.functionArguments && (
        <DetailRow
          label="Args"
          value={`${data.functionArguments.length} argument${
            data.functionArguments.length === 1 ? "" : "s"
          }`}
        />
      )}
      <FootnoteRow kind={kind} feePayer={isFeePayer} />
      <details className="min-w-0 text-xs">
        <summary className="cursor-pointer text-white/48 transition-colors hover:text-white">
          Show raw payload
        </summary>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-black/40 p-3 font-mono text-[11px] leading-relaxed break-words whitespace-pre-wrap text-white/80">
          {prettyJson(payload)}
        </pre>
      </details>
    </Summary>
  );
}

function Summary({ children }: { children: React.ReactNode }) {
  return <div className="flex w-full min-w-0 flex-col gap-3">{children}</div>;
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border-[0.5px] border-white/16 bg-white/8 px-4 py-3">
      <span className="shrink-0 font-display text-xs font-medium tracking-wider text-white/48 uppercase">
        {label}
      </span>
      <span className="truncate font-display text-white">{value}</span>
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
  truncate,
}: {
  label: string;
  value: string;
  mono?: boolean;
  truncate?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-3 px-1 text-sm">
      <span className="shrink-0 font-display text-white/48">{label}</span>
      <span
        className={cn(
          "text-right text-white",
          mono && "font-mono text-xs",
          truncate && "min-w-0 flex-1 truncate",
        )}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

/** Addresses render as `0x1234…abcd` with the full hex in the title attribute. */
function AddressRow({ label, address }: { label: string; address: string }) {
  const display = address.length > 12 ? truncateAddress(address) : address;
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-3 px-1 text-sm">
      <span className="shrink-0 font-display text-white/48">{label}</span>
      <span className="truncate font-mono text-xs text-white" title={address}>
        {display}
      </span>
    </div>
  );
}

function FootnoteRow({
  kind,
  feePayer,
}: {
  kind: TransactionApprovalKind;
  feePayer: boolean;
}) {
  const bits: string[] = [];
  bits.push(kind === "sign-and-submit" ? "Sign and submit" : "Sign only");
  if (feePayer) bits.push("Fee payer role");
  return (
    <p className="border-t border-white/16 pt-3 font-display text-xs text-white/48">
      {bits.join(" · ")}
    </p>
  );
}
