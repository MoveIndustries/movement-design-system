import type { Meta, StoryObj } from "@storybook/react";
import {
  HeartIcon,
  StarIcon,
  UserIcon,
  PiggyBankIcon,
  HouseIcon,
  GearIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ShoppingCartIcon,
} from "@phosphor-icons/react";
import {
  UsdcIcon,
  UsdtIcon,
  MoveIconIcon,
  EthIcon,
  MetamaskIcon,
  AptosLogoIcon,
  AvalancheIcon,
  BinanceIcon,
  CoinbaseIcon,
  DaiIcon,
  PolygonNetworkIcon,
  WethIcon,
  WbtcIcon,
} from "./index";

const meta: Meta = {
  title: "Components/Icons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The Movement Design System includes 1,200+ Phosphor icons and custom asset icons for crypto, wallets, and blockchains. All icons are tree-shakeable and fully typed.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/** Basic Phosphor icon usage */
export const Default: Story = {
  render: () => <PiggyBankIcon size={32} weight="duotone" />,
};

/** Different sizes */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <StarIcon size={12} />
      <StarIcon size={16} />
      <StarIcon size={20} />
      <StarIcon size={24} />
      <StarIcon size={32} />
      <StarIcon size={40} />
      <StarIcon size={48} />
    </div>
  ),
};

/** Different weights */
export const Weights: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <HeartIcon weight="thin" size={32} />
      <HeartIcon weight="light" size={32} />
      <HeartIcon weight="regular" size={32} />
      <HeartIcon weight="bold" size={32} />
      <HeartIcon weight="fill" size={32} />
      <HeartIcon weight="duotone" size={32} />
    </div>
  ),
};

/** Different colors */
export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <HeartIcon color="red" size={32} weight="fill" />
      <StarIcon color="gold" size={32} weight="fill" />
      <HouseIcon color="blue" size={32} weight="fill" />
      <BellIcon color="orange" size={32} weight="fill" />
      <ShoppingCartIcon color="green" size={32} weight="fill" />
      <GearIcon color="gray" size={32} weight="fill" />
    </div>
  ),
};

/** Crypto and blockchain asset icons */
export const AssetIcons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <EthIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>ETH</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <UsdcIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>USDC</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <UsdtIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>USDT</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <WethIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>WETH</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <WbtcIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>WBTC</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <DaiIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>DAI</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <MoveIconIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>MOVE</p>
      </div>
    </div>
  ),
};

/** Blockchain network icons */
export const NetworkIcons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <AptosLogoIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>Aptos</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <AvalancheIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>Avalanche</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <BinanceIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>Binance</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <PolygonNetworkIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>Polygon</p>
      </div>
    </div>
  ),
};

/** Wallet icons */
export const WalletIcons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "24px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <MetamaskIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>MetaMask</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <CoinbaseIcon size={40} />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>Coinbase</p>
      </div>
    </div>
  ),
};

/** Phosphor icon showcase */
export const PhosphorShowcase: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "24px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <HeartIcon size={32} color="red" weight="fill" />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>Heart</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <StarIcon size={32} color="gold" weight="fill" />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>Star</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <UserIcon size={32} color="blue" />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>User</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <HouseIcon size={32} color="green" />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>House</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <GearIcon size={32} color="gray" />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>Settings</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <MagnifyingGlassIcon size={32} color="purple" />
        <p style={{ fontSize: "12px", marginTop: "8px" }}>Search</p>
      </div>
    </div>
  ),
};

/** Usage examples */
export const UsageExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3>Phosphor Icons (1,200+ icons):</h3>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        >
          {`import { 
  Heart as HeartIcon, 
  Star as StarIcon, 
  User as UserIcon 
} from "@movementlabsxyz/movement-design-system";

<HeartIcon size={24} color="red" weight="fill" />
<StarIcon weight="duotone" size={32} />
<UserIcon size={20} color="blue" />`}
        </pre>
      </div>

      <div>
        <h3>Asset Icons (Crypto, Wallets, Networks):</h3>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "12px",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        >
          {`import { 
  UsdcIcon, 
  EthIcon, 
  MetamaskIcon,
  AptosLogoIcon 
} from "@movementlabsxyz/movement-design-system";

<UsdcIcon size={32} />
<EthIcon size={32} />
<MetamaskIcon size={32} />
<AptosLogoIcon size={32} />`}
        </pre>
      </div>

      <div>
        <h3>Features:</h3>
        <ul style={{ lineHeight: "1.8" }}>
          <li>✅ Tree-shakeable - only bundle icons you use</li>
          <li>✅ Fully typed with TypeScript</li>
          <li>
            ✅ Multiple weights (thin, light, regular, bold, fill, duotone)
          </li>
          <li>✅ Customizable size and color</li>
          <li>✅ Optimized SVGs for performance</li>
        </ul>
      </div>
    </div>
  ),
};
