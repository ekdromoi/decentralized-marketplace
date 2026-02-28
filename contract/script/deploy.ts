import { createWalletClient, createPublicClient, http } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const { MNEMONIC_KEY, BASE_SEPOLIA_RPC } = process.env as {
  MNEMONIC_KEY?: string;
  BASE_SEPOLIA_RPC?: string;
};
if (!MNEMONIC_KEY || !BASE_SEPOLIA_RPC) {
  throw new Error("Missing MNEMONIC_KEY or BASE_SEPOLIA_RPC in .env");
}

const artifact = JSON.parse(
  readFileSync(
    resolve(__dirname, "../out/product-registry.sol/ProductRegistry.json"),
    "utf-8"
  )
);

async function main() {
  const account = mnemonicToAccount(MNEMONIC_KEY!);

  const walletClient = createWalletClient({
    account,
    chain: baseSepolia,
    transport: http(BASE_SEPOLIA_RPC),
  });

  const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(BASE_SEPOLIA_RPC),
  });

  console.log(`Deploying ProductRegistry from ${account.address} ...`);

  const hash = await walletClient.deployContract({
    abi: artifact.abi,
    bytecode: artifact.bytecode.object as `0x${string}`,
  });

  console.log(`Transaction hash: ${hash}`);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log(`ProductRegistry deployed at: ${receipt.contractAddress}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
