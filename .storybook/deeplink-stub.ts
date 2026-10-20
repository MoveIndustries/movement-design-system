/**
 * Stand-in for `@moveindustries/wallet-adapter-deeplink` when it is not linked.
 *
 * The MobileDeeplinkLive story drives the real mobile adapter, which is not a
 * dependency of this library — it belongs to the consuming app. So it may or
 * may not be resolvable, and the Storybook build has to succeed either way.
 * `viteFinal` aliases the specifier to the real package when it is present and
 * to this file when it is not, which keeps the failure inside the story
 * instead of taking the whole build down.
 */

export const MOTION_WALLET = {};

export function registerDeeplinkWallets(): never {
  throw new Error(
    "@moveindustries/wallet-adapter-deeplink is not linked. From this repo: " +
      "pnpm link ../movement-wallet-adapter/packages/wallet-adapter-deeplink " +
      "(after building it there).",
  );
}
