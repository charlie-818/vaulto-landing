// On-chain deployment registry for the /transparency page.
// Source of truth: ../vaulto-tokenization deployments/137-*.json + config/companies.json.
// Uniswap V3 pool addresses fetched live via factory.getPool(token, USDC, 10000)
// on Polygon mainnet (verify-on-update — see DEPLOYMENTS_UPDATED).

export const NETWORK = {
  name: "Polygon",
  chainId: 137,
  explorer: "https://polygonscan.com",
  logo: "/partners/polygon.svg",
} as const;

export const DEPLOYMENTS_UPDATED = "2026-06-18";

export const polygonscanAddress = (a: string) => `${NETWORK.explorer}/address/${a}`;
export const polygonscanToken = (a: string) => `${NETWORK.explorer}/token/${a}`;
export const uniswapPool = (a: string) => `https://app.uniswap.org/explore/pools/polygon/${a}`;

export type AssetStatus = "live" | "staged" | "coming-soon";

export type ProtocolContract = {
  name: string;
  address: string;
  description: string;
};

export type Asset = {
  slug: string; // doubles as CompanyLogo lookup key
  name: string;
  symbolBase: string; // e.g. "vANTHROPIC" -> tokens vANTHROPIC_L / _S
  category: string;
  status: AssetStatus;
  vault?: string;
  longToken?: string;
  shortToken?: string;
  longPool?: string; // Uniswap V3 vLONG/USDC pool (1% fee)
  shortPool?: string; // Uniswap V3 vSHORT/USDC pool (1% fee)
};

// Core protocol contracts (137-pilot.json).
export const PROTOCOL_CONTRACTS: ProtocolContract[] = [
  {
    name: "MintRedeemController",
    address: "0x54d6c19Adb72Ae24900E51F352100B8d6089A761",
    description: "EIP-712 mint / redeem, daily caps, NAV-deviation gates",
  },
  {
    name: "PriceOracle",
    address: "0xa50164490D7383c345e8b82538366576FDdFDc4e",
    description: "Volume-weighted NAV oracle (cron-pushed, staleness-gated)",
  },
  {
    name: "EscrowVault",
    address: "0x6088Dc3Bb98364D8fda5aB544A41D94c52d8a3a8",
    description: "Holds user USDC during pending mint requests",
  },
  {
    name: "TokenFactory",
    address: "0x295Ea5b9a9F386930C0486E4904CdC30339F52B6",
    description: "CREATE2 deployer for each company's long / short token pair",
  },
  {
    name: "VaultoAdminTimelock",
    address: "0xEA043eb1260dC85c6cB13fc42390CFD01Bcc7484",
    description: "48-hour timelock guarding all privileged admin actions",
  },
];

// Deployed + staged assets (real on-chain addresses).
export const ASSETS: Asset[] = [
  {
    slug: "anthropic",
    name: "Anthropic",
    symbolBase: "vANTHROPIC",
    category: "AI",
    status: "live",
    vault: "0x1b91BaF3Aa715dFEFb34A05b9dEd8D61a473a202",
    longToken: "0x61F8Cb13a60040FC70F701eA65928C82d32404f2",
    shortToken: "0xdE3814624dCd569281CDB334D05D915fAceBd0C5",
    longPool: "0x6de2afc4042BFF477Fa3cCD83BAEDA8E573D691e",
    shortPool: "0xa7d91cE244B09ec98c71e9A2Ba9d6f9047ed8844",
  },
  {
    slug: "openai",
    name: "OpenAI",
    symbolBase: "vOPENAI",
    category: "AI",
    status: "staged",
    vault: "0x4A53B34223E7F95f300b84545d4950b4025935A9",
    longToken: "0x316EeaA3E80bb999BC26a114CcFCB9B335819703",
    shortToken: "0xFcE264eFE8e3068C90e8925a58a85a839782CF2F",
    longPool: "0x7DDC598E295541e19b2Dd30877d7827048DeD40a",
    shortPool: "0x64659e65a56517a6e392Fb2F5477E9fA3aaa768B",
  },
  {
    slug: "anduril",
    name: "Anduril",
    symbolBase: "vANDURIL",
    category: "Defense",
    status: "staged",
    vault: "0x10429886F2D854C4863715de51134474EDbdA3a4",
    longToken: "0xD25aE6b9d312b66E0709184507589172388EF418",
    shortToken: "0xE416e29f167e88Bb8f2900cbf9F9e18fb800B78B",
    // pools not yet seeded
  },
];

// Registered, not yet deployed (config/companies.json).
export const COMING_SOON: Asset[] = [
  { slug: "spacex", name: "SpaceX", symbolBase: "vSPACEX", category: "Aerospace", status: "coming-soon" },
  { slug: "stripe", name: "Stripe", symbolBase: "vSTRIPE", category: "Fintech", status: "coming-soon" },
  { slug: "databricks", name: "Databricks", symbolBase: "vDATABRICKS", category: "Tech", status: "coming-soon" },
  { slug: "perplexity", name: "Perplexity", symbolBase: "vPERPLEXITY", category: "AI", status: "coming-soon" },
  { slug: "neuralink", name: "Neuralink", symbolBase: "vNEURALINK", category: "Tech", status: "coming-soon" },
  { slug: "canva", name: "Canva", symbolBase: "vCANVA", category: "Tech", status: "coming-soon" },
  { slug: "lambda", name: "Lambda", symbolBase: "vLAMBDA", category: "AI", status: "coming-soon" },
  { slug: "kraken", name: "Kraken", symbolBase: "vKRAKEN", category: "Crypto", status: "coming-soon" },
  { slug: "epic-games", name: "Epic Games", symbolBase: "vEPIC", category: "Gaming", status: "coming-soon" },
];

// Uniswap V3 config (locked) + infra addresses.
export const UNISWAP = {
  config: {
    dex: "Uniswap V3",
    fee: "1%",
    pair: "vTOKEN / USDC",
    init: "$1.00 entry NAV",
    range: "±20%",
  },
  infra: [
    { name: "Uniswap V3 Factory", address: "0x1F98431c8aD98523631AE4a59f267346ea31F984" },
    { name: "Position Manager (NPM)", address: "0xC36442b4a4522E871399CD717aBDD847Ab11FE88" },
    { name: "SwapRouter02", address: "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45" },
  ],
} as const;

// Collateral + external protocol tokens the vaults interact with.
export const INTEGRATIONS: ProtocolContract[] = [
  {
    name: "USDC (native)",
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    description: "Settlement + collateral asset",
  },
  {
    name: "USDC.e (bridged)",
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    description: "Bridged USDC",
  },
  {
    name: "pUSD",
    address: "0xC011a7E12a19f7B1f670d46F03B03f3342E82DFB",
    description: "Polymarket collateral token",
  },
  {
    name: "CTF (Polymarket)",
    address: "0x4D97DCd97eC945f40cF65F87097ACe5EA0476045",
    description: "Conditional Tokens Framework — basket positions",
  },
];

// Flattened Uniswap pool rows for the liquidity table (deployed assets only).
export type PoolRow = {
  asset: string;
  slug: string;
  symbol: string;
  leg: "Long" | "Short";
  pool?: string;
};

export const POOL_ROWS: PoolRow[] = ASSETS.flatMap((a) => [
  { asset: a.name, slug: a.slug, symbol: `${a.symbolBase}_L`, leg: "Long" as const, pool: a.longPool },
  { asset: a.name, slug: a.slug, symbol: `${a.symbolBase}_S`, leg: "Short" as const, pool: a.shortPool },
]);
