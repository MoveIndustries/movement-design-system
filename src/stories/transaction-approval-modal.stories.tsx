import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Fingerprint } from "lucide-react";
import { TransactionApprovalModal } from "@/components/TransactionApprovalModal";
import type { TransactionApprovalModalProps } from "@/components/TransactionApprovalModal";
import { Button } from "@/components/shadcn/button";
import { GOOGLE_ICON_DATA_URI } from "./fixtures";

const SENDER =
  "0x9aef5b3f7c1e2d4a6b8c0d1e2f3a4b5c6d7e8f90a1b2c3d4e5f60718293a4b5c";
const RECIPIENT =
  "0x1f2e3d4c5b6a798877665544332211ffeeddccbbaa00112233445566778899aa";

// The modal is auth-method-agnostic — the caller supplies the icon + walletName.
// Passkey passes a fingerprint; keyless (social login) passes the provider mark.
const passkeyIcon = <Fingerprint size={28} strokeWidth={2} />;
const keylessIcon = (
  <img src={GOOGLE_ICON_DATA_URI} width={28} height={28} alt="" />
);

/**
 * Interactive harness: a trigger button that opens the modal. Approve/Reject
 * both close it (Approve logs, mirroring how a host app would proceed to sign).
 */
function ModalDemo(props: Omit<TransactionApprovalModalProps, "open" | "onApprove" | "onReject">) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open approval modal</Button>
      <TransactionApprovalModal
        {...props}
        open={open}
        onApprove={() => setOpen(false)}
        onReject={() => setOpen(false)}
      />
    </>
  );
}

const meta: Meta<typeof TransactionApprovalModal> = {
  title: "Movement Design System/TransactionApprovalModal",
  component: TransactionApprovalModal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A responsive transaction-approval modal (Dialog on desktop, Drawer on mobile) that shows a decoded summary of a transaction payload before the user signs. Purely presentational — the host app owns open/approve/reject state and feeds it the payload it already passes to signAndSubmitTransaction. Auth-method-agnostic: the caller supplies `icon` + `walletName`, so it works for keyless (social login) and passkey alike — see the *Keyless* and *Passkey* examples below.",
      },
    },
  },
  tags: ["autodocs"],
  render: (args) => <ModalDemo {...args} />,
};

export default meta;
type Story = StoryObj<typeof meta>;

/** The demo app's default "Sign and submit transaction" payload — 1 Octa MOVE transfer. */
export const SendMove: Story = {
  args: {
    walletName: "Continue with Passkey",
    address: SENDER,
    icon: passkeyIcon,
    payload: {
      data: {
        function: "0x1::aptos_account::transfer",
        typeArguments: [],
        functionArguments: [RECIPIENT, "100000000"],
      },
    },
  },
};

/** Send coin, approved via **passkey** (fingerprint icon). No `assetDecimals`
 *  supplied, so the amount shows as the raw signed integer labeled "base units". */
export const SendCoinPasskey: Story = {
  args: {
    walletName: "Continue with Passkey",
    address: SENDER,
    icon: passkeyIcon,
    payload: {
      data: {
        function: "0x1::aptos_account::transfer_coins",
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: [RECIPIENT, "2500000000"],
      },
    },
  },
};

/** Same transaction, approved via **keyless** (Google social login). Identical
 *  modal — only the `icon` + `walletName` differ. */
export const SendCoinKeyless: Story = {
  args: {
    walletName: "Sign in with Google",
    address: SENDER,
    icon: keylessIcon,
    payload: {
      data: {
        function: "0x1::aptos_account::transfer_coins",
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: [RECIPIENT, "2500000000"],
      },
    },
  },
};

/** Same coin transfer, but the host supplies `assetDecimals` + `assetSymbol`,
 *  so the amount formats to a human-readable token value (`2500 USDC`) instead
 *  of the raw `2500000000` base units. */
export const SendCoinFormatted: Story = {
  args: {
    walletName: "Sign in with Google",
    address: SENDER,
    icon: keylessIcon,
    assetDecimals: 6,
    assetSymbol: "USDC",
    payload: {
      data: {
        function: "0x1::aptos_account::transfer_coins",
        typeArguments: ["0x1::usdc::USDC"],
        functionArguments: [RECIPIENT, "2500000000"],
      },
    },
  },
};

/** Fungible-asset transfer, approved via **keyless**. */
export const FungibleAssetKeyless: Story = {
  args: {
    walletName: "Sign in with Google",
    address: SENDER,
    icon: keylessIcon,
    payload: {
      data: {
        function: "0x1::primary_fungible_store::transfer",
        typeArguments: ["0x1::fungible_asset::Metadata"],
        functionArguments: [RECIPIENT, RECIPIENT, "42"],
      },
    },
  },
};

/** Unrecognized function — falls back to the generic view + raw-payload disclosure. */
export const GenericCall: Story = {
  args: {
    walletName: "Continue with Passkey",
    address: SENDER,
    icon: passkeyIcon,
    payload: {
      data: {
        function: "0x42::marketplace::place_bid",
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: [RECIPIENT, "100", true],
      },
    },
  },
};

/** Sign-only request (no submit) — note the footnote. */
export const SignOnly: Story = {
  args: {
    kind: "sign",
    walletName: "Continue with Passkey",
    address: SENDER,
    icon: passkeyIcon,
    payload: {
      data: {
        function: "0x1::aptos_account::transfer",
        typeArguments: [],
        functionArguments: [RECIPIENT, "100000000"],
      },
    },
  },
};

/** Sign-only request where the signer acts as fee payer (`asFeePayer: true`) —
 *  the footnote reads "Sign only · Fee payer role". */
export const SignAsFeePayer: Story = {
  args: {
    kind: "sign",
    walletName: "Continue with Passkey",
    address: SENDER,
    icon: passkeyIcon,
    payload: {
      transactionOrPayload: {
        function: "0x1::aptos_account::transfer",
        typeArguments: [],
        functionArguments: [RECIPIENT, "100000000"],
      },
      asFeePayer: true,
    },
  },
};

/** Pending state — Approve shows a spinner and both actions are disabled. */
export const Loading: Story = {
  args: {
    loading: true,
    walletName: "Continue with Passkey",
    address: SENDER,
    icon: passkeyIcon,
    payload: {
      data: {
        function: "0x1::aptos_account::transfer",
        typeArguments: [],
        functionArguments: [RECIPIENT, "100000000"],
      },
    },
  },
};

/** Mobile renders as a bottom drawer. */
export const MobileView: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    ...SendMove.args,
  },
};
