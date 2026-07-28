import { cn } from "@/lib/utils";
import { formatOctas, formatUnits, prettyJson, truncateAddress } from "./format";
import type { DecodedTx, FeePayerRole } from "./decode";
import type { TransactionApprovalKind } from "./TransactionApprovalModal";

const UNDECODABLE = "⚠ Could not decode amount";

/**
 * Human-readable summary of a decoded transaction.
 *
 * Recognized transfers get a structured "Action / Amount / Recipient" block;
 * anything else falls back to a generic "Call function" view with the full
 * payload behind a disclosure.
 */
export function TxPayloadSummary({
  decoded,
  payload,
  kind,
  decimals,
  symbol,
}: {
  decoded: DecodedTx;
  /** Raw sign request, shown verbatim in the generic view's disclosure. */
  payload: unknown;
  kind: TransactionApprovalKind;
  /** Decimals of the coin/FA being moved, when the host knows them. */
  decimals?: number;
  /** Ticker shown next to a formatted amount (e.g. "USDC"). */
  symbol?: string;
}) {
  // Native transfer is always MOVE (8 decimals), so it formats itself. For the
  // generic coin/FA transfers the asset is arbitrary and the modal can't infer
  // decimals — format only when the host supplies them, else show the exact
  // signed integer labeled as base units so it's never misread as a decimal.
  const genericAmount = (amount: bigint | null): string => {
    if (amount === null) return UNDECODABLE;
    if (decimals === undefined) return `${amount.toString()} base units`;
    const formatted = formatUnits(amount, decimals);
    return symbol ? `${formatted} ${symbol}` : formatted;
  };

  if (decoded.action === "transfer-move") {
    return (
      <Summary>
        <Pill label="Action" value="Send MOVE" />
        <FeePayerNotice role={decoded.feePayer} />
        <DetailRow
          label="Amount"
          value={
            decoded.amount !== null
              ? `${formatOctas(decoded.amount)} MOVE`
              : UNDECODABLE
          }
          mono
          warn={decoded.amount === null}
        />
        <AddressRow label="Recipient" address={decoded.recipient} />
        <FootnoteRow kind={kind} />
      </Summary>
    );
  }

  if (decoded.action === "transfer-coin") {
    return (
      <Summary>
        <Pill label="Action" value="Send coin" />
        <FeePayerNotice role={decoded.feePayer} />
        <DetailRow label="Coin type" value={decoded.coinType} mono truncate />
        <DetailRow
          label="Amount"
          value={genericAmount(decoded.amount)}
          mono
          warn={decoded.amount === null}
        />
        <AddressRow label="Recipient" address={decoded.recipient} />
        <FootnoteRow kind={kind} />
      </Summary>
    );
  }

  if (decoded.action === "transfer-fa") {
    return (
      <Summary>
        <Pill label="Action" value="Send fungible asset" />
        <FeePayerNotice role={decoded.feePayer} />
        <AddressRow label="Asset" address={decoded.asset} />
        <DetailRow
          label="Amount"
          value={genericAmount(decoded.amount)}
          mono
          warn={decoded.amount === null}
        />
        <AddressRow label="Recipient" address={decoded.recipient} />
        <FootnoteRow kind={kind} />
      </Summary>
    );
  }

  return (
    <Summary>
      <Pill label="Action" value="Call function" />
      <FeePayerNotice role={decoded.feePayer} />
      {decoded.fn && <DetailRow label="Function" value={decoded.fn} mono truncate />}
      {decoded.typeArguments && decoded.typeArguments.length > 0 && (
        <DetailRow
          label="Type args"
          value={decoded.typeArguments.join(", ")}
          mono
          truncate
        />
      )}
      {decoded.argCount !== undefined && (
        <DetailRow
          label="Args"
          value={`${decoded.argCount} argument${decoded.argCount === 1 ? "" : "s"}`}
        />
      )}
      <FootnoteRow kind={kind} />
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

/** Who pays gas is high-consequence, so it gets a callout, not a footnote. */
function FeePayerNotice({ role }: { role: FeePayerRole }) {
  if (role === "none") return null;
  return (
    <div className="rounded-2xl border-[0.5px] border-amber-400/32 bg-amber-400/8 px-4 py-3 font-display text-sm text-amber-200">
      {role === "self"
        ? "You will pay the gas for this transaction."
        : "A separate fee payer is set for this transaction."}
    </div>
  );
}

function DetailRow({
  label,
  value,
  mono,
  truncate,
  warn,
}: {
  label: string;
  value: string;
  mono?: boolean;
  truncate?: boolean;
  warn?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-baseline justify-between gap-3 px-1 text-sm">
      <span className="shrink-0 font-display text-white/48">{label}</span>
      <span
        className={cn(
          "text-right text-white",
          mono && "font-mono text-xs",
          truncate && "min-w-0 flex-1 truncate",
          warn && "font-display text-xs text-amber-300",
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

function FootnoteRow({ kind }: { kind: TransactionApprovalKind }) {
  return (
    <p className="border-t border-white/16 pt-3 font-display text-xs text-white/48">
      {kind === "sign-and-submit" ? "Sign and submit" : "Sign only"}
    </p>
  );
}
