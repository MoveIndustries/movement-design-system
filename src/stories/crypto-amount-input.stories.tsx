import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { CryptoAmountInput } from "../components/shadcn/crypto-amount-input";
import { DottedBackground } from "../components/DottedBackground";

const meta = {
  title: "form/CryptoAmountInput",
  component: CryptoAmountInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Current input value",
    },
    balance: {
      control: "text",
      description: "Available balance to display",
    },
    token: {
      control: "text",
      description: "Token symbol (e.g., MOVE, USDC, ETH)",
    },
    error: {
      control: "boolean",
      description: "Whether input is in error state",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display",
    },
    disabled: {
      control: "boolean",
      description: "Whether input is disabled",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    state: {
      control: "select",
      options: ["default", "filled", "error", "disabled"],
      description: "Visual state of the component",
    },
  },
} satisfies Meta<typeof CryptoAmountInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <CryptoAmountInput {...args} />
      </div>
    </DottedBackground>
  ),
  args: {
    balance: "128.01839",
    token: "MOVE",
    placeholder: "0",
  },
};

export const Filled: Story = {
  render: (args) => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <CryptoAmountInput {...args} />
      </div>
    </DottedBackground>
  ),
  args: {
    value: "128.73913",
    balance: "128.01839",
    token: "MOVE",
  },
};

export const Error: Story = {
  render: (args) => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <CryptoAmountInput {...args} />
      </div>
    </DottedBackground>
  ),
  args: {
    value: "128.73913",
    balance: "128.01839",
    token: "MOVE",
    error: true,
    errorMessage: "Insufficient balance",
  },
};

export const Disabled: Story = {
  render: (args) => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <CryptoAmountInput {...args} />
      </div>
    </DottedBackground>
  ),
  args: {
    balance: "128.01839",
    token: "USDC",
    disabled: true,
    placeholder: "0",
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const balance = 128.01839;
    const token = "MOVE";

    const handleMaxClick = () => {
      setValue(balance.toString());
    };

    const isError = value !== "" && parseFloat(value) > balance;

    return (
      <DottedBackground variant="gradient">
        <div className="flex h-full min-h-[400px] items-center justify-center">
          <div className="flex flex-col gap-6">
            <CryptoAmountInput
              value={value}
              onChange={setValue}
              balance={balance.toString()}
              token={token}
              onMaxClick={handleMaxClick}
              error={isError}
              errorMessage="Insufficient balance"
            />
            <div className="text-center text-sm text-white/80">
              <p>Try typing an amount or clicking MAX</p>
              <p className="mt-1 text-xs opacity-60">
                Entering more than {balance} will trigger an error
              </p>
            </div>
          </div>
        </div>
      </DottedBackground>
    );
  },
};

export const DifferentTokens: Story = {
  render: () => {
    const tokens = [
      { symbol: "MOVE", balance: "128.01839" },
      { symbol: "USDC", balance: "1,234.56" },
      { symbol: "ETH", balance: "2.5" },
      { symbol: "BTC", balance: "0.05" },
    ];

    return (
      <DottedBackground variant="gradient">
        <div className="flex h-full min-h-[600px] items-center justify-center p-8">
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
            {tokens.map((token) => (
              <div key={token.symbol} className="flex flex-col gap-2">
                <CryptoAmountInput
                  balance={token.balance}
                  token={token.symbol}
                />
                <p className="text-center text-xs text-white/60">
                  {token.symbol} Input
                </p>
              </div>
            ))}
          </div>
        </div>
      </DottedBackground>
    );
  },
};

export const AllStates: Story = {
  render: () => {
    const states = [
      {
        title: "Default (Empty)",
        props: {
          balance: "128.01839",
          token: "MOVE",
        },
      },
      {
        title: "Filled",
        props: {
          value: "128.73913",
          balance: "128.01839",
          token: "MOVE",
        },
      },
      {
        title: "Error",
        props: {
          value: "128.73913",
          balance: "128.01839",
          token: "MOVE",
          error: true,
          errorMessage: "Insufficient balance",
        },
      },
      {
        title: "Disabled",
        props: {
          balance: "128.01839",
          token: "USDC",
          disabled: true,
        },
      },
    ];

    return (
      <DottedBackground variant="gradient">
        <div className="flex h-full min-h-[800px] items-center justify-center p-8">
          <div className="grid w-full max-w-2xl grid-cols-1 gap-8">
            {states.map((state) => (
              <div key={state.title} className="flex flex-col gap-3">
                <h3 className="text-center text-lg font-bold text-white">
                  {state.title}
                </h3>
                <CryptoAmountInput {...state.props} />
              </div>
            ))}
          </div>
        </div>
      </DottedBackground>
    );
  },
};

export const WithCustomStyling: Story = {
  render: () => (
    <DottedBackground variant="dots">
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="flex flex-col gap-6">
          <CryptoAmountInput
            value="50.0"
            balance="100.5"
            token="ETH"
            className="shadow-2xl"
          />
          <p className="text-center text-sm text-white/80">
            With custom shadow styling
          </p>
        </div>
      </div>
    </DottedBackground>
  ),
};

export const MaxButtonInteraction: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const balance = "1,234.5678";

    return (
      <DottedBackground variant="gradient">
        <div className="flex h-full min-h-[400px] items-center justify-center">
          <div className="flex flex-col gap-6">
            <CryptoAmountInput
              value={value}
              onChange={setValue}
              balance={balance}
              token="USDC"
              onMaxClick={() => setValue(balance.replace(/,/g, ""))}
            />
            <div className="text-center text-sm text-white/80">
              <p>Click MAX to fill with available balance</p>
              <p className="mt-2 text-xs opacity-60">
                Current value: {value || "empty"}
              </p>
            </div>
          </div>
        </div>
      </DottedBackground>
    );
  },
};

export const ZeroBalance: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <div className="flex flex-col gap-6">
          <CryptoAmountInput balance="0" token="MOVE" />
          <p className="text-center text-sm text-white/80">
            MAX button is hidden when balance is 0
          </p>
        </div>
      </div>
    </DottedBackground>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[600px] items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h3 className="text-center font-bold text-white">Mobile Size</h3>
              <div className="mx-auto w-full max-w-[320px]">
                <CryptoAmountInput value="42.0" balance="100.5" token="MOVE" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-center font-bold text-white">Desktop Size</h3>
              <CryptoAmountInput value="42.0" balance="100.5" token="MOVE" />
            </div>
          </div>
        </div>
      </div>
    </DottedBackground>
  ),
};

export const LongNumbers: Story = {
  render: () => (
    <DottedBackground variant="gradient">
      <div className="flex h-full min-h-[600px] items-center justify-center p-8">
        <div className="grid w-full max-w-2xl grid-cols-1 gap-6">
          <CryptoAmountInput
            value="1234567.89012345"
            balance="9999999.99999999"
            token="SATS"
          />
          <CryptoAmountInput
            value="0.000000123456"
            balance="0.000001"
            token="BTC"
          />
          <p className="text-center text-sm text-white/80">
            Testing with very large and very small numbers
          </p>
        </div>
      </div>
    </DottedBackground>
  ),
};

export const CustomErrorMessages: Story = {
  render: () => {
    const errorScenarios = [
      {
        message: "Insufficient balance",
        value: "150",
        balance: "100",
      },
      {
        message: "Amount too low",
        value: "0.001",
        balance: "100",
      },
      {
        message: "Network fee required",
        value: "99.99",
        balance: "100",
      },
    ];

    return (
      <DottedBackground variant="gradient">
        <div className="flex h-full min-h-[700px] items-center justify-center p-8">
          <div className="grid w-full max-w-2xl grid-cols-1 gap-8">
            {errorScenarios.map((scenario, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <CryptoAmountInput
                  value={scenario.value}
                  balance={scenario.balance}
                  token="MOVE"
                  error={true}
                  errorMessage={scenario.message}
                />
                <p className="text-center text-xs text-white/60">
                  {scenario.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DottedBackground>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [amount, setAmount] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const balance = 500.5;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    };

    const isError = amount !== "" && parseFloat(amount) > balance;

    return (
      <DottedBackground variant="gradient">
        <div className="flex h-full min-h-[500px] items-center justify-center p-8">
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-xl flex-col gap-6"
          >
            <div className="text-center text-white">
              <h2 className="mb-2 text-2xl font-bold">Stake MOVE Tokens</h2>
              <p className="text-sm text-white/60">
                Enter the amount you'd like to stake
              </p>
            </div>

            <CryptoAmountInput
              value={amount}
              onChange={setAmount}
              balance={balance.toString()}
              token="MOVE"
              onMaxClick={() => setAmount(balance.toString())}
              error={isError}
              errorMessage="Insufficient balance"
            />

            <button
              type="submit"
              disabled={!amount || isError || amount === "0"}
              className="bg-guild-green-300 text-byzantine-blue-400 hover:bg-guild-green-400 mx-auto w-full max-w-[522px] rounded-lg py-3 font-bold tracking-wider uppercase transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitted ? "Staking..." : "Stake Now"}
            </button>

            {submitted && (
              <p className="text-center text-sm text-green-400">
                Successfully staked {amount} MOVE!
              </p>
            )}
          </form>
        </div>
      </DottedBackground>
    );
  },
};
