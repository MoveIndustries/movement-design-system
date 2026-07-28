import { parseAmount } from "./format";

interface TransactionData {
  function?: string;
  typeArguments?: string[];
  functionArguments?: unknown[];
}

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

/** Who pays gas, as far as the payload reveals it. */
export type FeePayerRole = "none" | "self" | "sponsored";

export type DecodedTx = { feePayer: FeePayerRole } & (
  | { action: "transfer-move"; amount: bigint | null; recipient: string }
  | {
      action: "transfer-coin";
      coinType: string;
      amount: bigint | null;
      recipient: string;
    }
  | {
      action: "transfer-fa";
      asset: string;
      amount: bigint | null;
      recipient: string;
    }
  | {
      action: "generic";
      fn?: string;
      typeArguments?: string[];
      argCount?: number;
    }
);

/**
 * Decode a sign request into the facts the approval UI shows. Pure and
 * separate from rendering so the modal can gate the Approve button on it.
 */
export function decodePayload(payload: unknown): DecodedTx {
  const p = (payload ?? {}) as Payload;
  const data =
    p.data ?? p.payload ?? (p.transactionOrPayload as TransactionData | undefined);
  const fn = data?.function;
  const args = data?.functionArguments ?? [];

  // `asFeePayer` means this signer pays; a bare `feePayer` names someone else
  // (the modal can't see the connected account, so it won't claim which).
  const feePayer: FeePayerRole = p.asFeePayer
    ? "self"
    : p.feePayer
      ? "sponsored"
      : "none";

  // 0x1::aptos_account::transfer(recipient, amount)
  if (fn === "0x1::aptos_account::transfer") {
    return {
      action: "transfer-move",
      amount: parseAmount(args[1]),
      recipient: String(args[0] ?? ""),
      feePayer,
    };
  }

  // transfer_coins<T>(recipient, amount) and coin::transfer<T>(to, amount)
  // share a signature, so they decode identically.
  if (
    fn === "0x1::aptos_account::transfer_coins" ||
    fn === "0x1::coin::transfer"
  ) {
    return {
      action: "transfer-coin",
      coinType: String(data?.typeArguments?.[0] ?? "unknown"),
      amount: parseAmount(args[1]),
      recipient: String(args[0] ?? ""),
      feePayer,
    };
  }

  // 0x1::primary_fungible_store::transfer(asset, recipient, amount)
  if (fn === "0x1::primary_fungible_store::transfer") {
    return {
      action: "transfer-fa",
      asset: String(args[0] ?? ""),
      amount: parseAmount(args[2]),
      recipient: String(args[1] ?? ""),
      feePayer,
    };
  }

  return {
    action: "generic",
    fn,
    typeArguments: data?.typeArguments,
    argCount: data?.functionArguments?.length,
    feePayer,
  };
}

/**
 * True when a recognized transfer's amount could not be read. "I can't decode
 * this" must not look like "there is no amount", so the modal blocks approval
 * rather than showing a bare dash next to a live Approve button.
 */
export function hasUndecodableAmount(decoded: DecodedTx): boolean {
  return decoded.action !== "generic" && decoded.amount === null;
}
