// Formatting helpers for the transaction-approval summary. Kept local to the
// component so the modal has no dependency on any app's token/network config.

/** Octas per 1 MOVE (8 decimals), matching the Movement/Aptos coin standard. */
export const OCTAS_PER_MOVE = 100_000_000n;

/** `0x1234…abcd` — keeps long hex readable while preserving the full value elsewhere. */
export function truncateAddress(addr: string): string {
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

/** Base-unit integer → decimal string with `decimals` places, trailing zeros stripped. */
export function formatUnits(amount: bigint, decimals: number): string {
  if (decimals <= 0) return amount.toString();
  const base = 10n ** BigInt(decimals);
  const whole = amount / base;
  const fraction = amount % base;
  if (fraction === 0n) return whole.toString();
  const fracStr = fraction.toString().padStart(decimals, "0").replace(/0+$/, "");
  return `${whole}.${fracStr}`;
}

/** Octas → MOVE with up to 8 decimals, trailing zeros stripped. */
export function formatOctas(octas: bigint): string {
  return formatUnits(octas, 8);
}

/** Coerce an on-chain amount argument (bigint | number | decimal string) to bigint. */
export function parseAmount(raw: unknown): bigint | null {
  if (typeof raw === "bigint") return raw;
  if (typeof raw === "number" && Number.isFinite(raw))
    return BigInt(Math.trunc(raw));
  if (typeof raw === "string" && /^\d+$/.test(raw)) {
    try {
      return BigInt(raw);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * JSON.stringify that survives values you'd otherwise see as "[object Object]":
 * bigints become decimal strings, Uint8Arrays and SDK objects exposing
 * `toUint8Array()` become 0x-hex.
 */
export function prettyJson(value: unknown, indent = 2): string {
  try {
    return JSON.stringify(value, prettyReplacer, indent);
  } catch (e) {
    return `<unserializable: ${e instanceof Error ? e.message : String(e)}>`;
  }
}

function prettyReplacer(_key: string, value: unknown): unknown {
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Uint8Array) return uint8ToHex(value);
  if (
    value !== null &&
    typeof value === "object" &&
    typeof (value as { toUint8Array?: unknown }).toUint8Array === "function"
  ) {
    try {
      const bytes = (value as { toUint8Array(): unknown }).toUint8Array();
      if (bytes instanceof Uint8Array) return uint8ToHex(bytes);
    } catch {
      /* fall through to default serialization */
    }
  }
  return value;
}

function uint8ToHex(bytes: Uint8Array): string {
  let out = "0x";
  for (const b of bytes) out += b.toString(16).padStart(2, "0");
  return out;
}
