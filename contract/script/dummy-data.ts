import { createWalletClient, createPublicClient, http } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const CONTRACT_ADDRESS = "0xcfbe4ba24cef57f5572bfed92901d0e9082a7c7d";

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

const Category = {
  LUXURY_WATCHES: 0,
  FINE_JEWELLERY: 1,
  FINE_ART: 2,
  AUTOMOTIVE: 3,
  COLLECTIBLES: 4,
  ANTIQUES: 5,
  OTHER: 6,
} as const;

const sellers = [
  {
    id: 1n,
    sellerAddress: "0x0000000000000000000000000000000000000000",
    name: "Prestige Timepieces",
    email: "contact@prestigetime.com",
    phone: "+1-212-555-0101",
    city: "New York",
    country: "United States",
    streetAddress: "450 Fifth Avenue, Suite 3200",
    isBlacklisted: false,
  },
  {
    id: 2n,
    sellerAddress: "0x0000000000000000000000000000000000000000",
    name: "Maison Lumière Jewellers",
    email: "sales@maisonlumiere.fr",
    phone: "+33-1-4256-7890",
    city: "Paris",
    country: "France",
    streetAddress: "28 Place Vendôme",
    isBlacklisted: false,
  },
  {
    id: 3n,
    sellerAddress: "0x0000000000000000000000000000000000000000",
    name: "Galeria Arte Moderna",
    email: "info@galeriaartemoderna.it",
    phone: "+39-02-8901-2345",
    city: "Milan",
    country: "Italy",
    streetAddress: "Via Monte Napoleone 15",
    isBlacklisted: false,
  },
  {
    id: 4n,
    sellerAddress: "0x0000000000000000000000000000000000000000",
    name: "Heritage Motors Ltd",
    email: "enquiries@heritagemotors.co.uk",
    phone: "+44-20-7946-0958",
    city: "London",
    country: "United Kingdom",
    streetAddress: "77 Berkeley Square, Mayfair",
    isBlacklisted: false,
  },
  {
    id: 5n,
    sellerAddress: "0x0000000000000000000000000000000000000000",
    name: "Tokyo Rare Collectibles",
    email: "hello@tokyorarecollect.jp",
    phone: "+81-3-6721-4400",
    city: "Tokyo",
    country: "Japan",
    streetAddress: "4-12-8 Ginza, Chuo-ku",
    isBlacklisted: false,
  },
];

const products = [
  // Seller 1 – Prestige Timepieces (watches)
  { id: 1n,  sellerId: 1n, category: Category.LUXURY_WATCHES, description: "Rolex Daytona 116500LN – White Dial, 2024",               price: "32500"  },
  { id: 2n,  sellerId: 1n, category: Category.LUXURY_WATCHES, description: "Patek Philippe Nautilus 5711/1A – Blue Dial",              price: "128000" },
  { id: 3n,  sellerId: 1n, category: Category.LUXURY_WATCHES, description: "Audemars Piguet Royal Oak 15500ST – Grey Dial",            price: "45000"  },
  { id: 4n,  sellerId: 1n, category: Category.LUXURY_WATCHES, description: "Omega Speedmaster Moonwatch Professional 310.30.42.50",    price: "6500"   },
  { id: 5n,  sellerId: 1n, category: Category.LUXURY_WATCHES, description: "Cartier Santos de Cartier Large – WSSA0018",               price: "8200"   },

  // Seller 2 – Maison Lumière Jewellers
  { id: 6n,  sellerId: 2n, category: Category.FINE_JEWELLERY, description: "18K White Gold 3ct Diamond Solitaire Necklace",            price: "24500"  },
  { id: 7n,  sellerId: 2n, category: Category.FINE_JEWELLERY, description: "Burmese Ruby & Diamond Platinum Ring – 2.8ct",             price: "67000"  },
  { id: 8n,  sellerId: 2n, category: Category.FINE_JEWELLERY, description: "Art Deco Emerald Bracelet – Colombian Origin",             price: "41000"  },
  { id: 9n,  sellerId: 2n, category: Category.FINE_JEWELLERY, description: "South Sea Pearl Drop Earrings – 14mm Golden",              price: "9800"   },
  { id: 10n, sellerId: 2n, category: Category.FINE_JEWELLERY, description: "Kashmir Sapphire Brooch – 5.2ct, Vintage Setting",         price: "115000" },

  // Seller 3 – Galeria Arte Moderna
  { id: 11n, sellerId: 3n, category: Category.FINE_ART,       description: "Abstract Oil on Canvas – 'Urban Pulse' by Luca Moretti, 2023",    price: "18000"  },
  { id: 12n, sellerId: 3n, category: Category.FINE_ART,       description: "Bronze Sculpture – 'The Thinker Reimagined', Edition 3/10",        price: "34000"  },
  { id: 13n, sellerId: 3n, category: Category.FINE_ART,       description: "Limited Edition Print – Banksy 'Balloon Girl' Signed AP",          price: "52000"  },
  { id: 14n, sellerId: 3n, category: Category.FINE_ART,       description: "Mixed Media Installation – 'Digital Bloom' by Yuki Tanaka",        price: "27500"  },
  { id: 15n, sellerId: 3n, category: Category.FINE_ART,       description: "Watercolour on Paper – 'Amalfi Dawn' by Sofia Bianchi, 2022",      price: "7200"   },

  // Seller 4 – Heritage Motors Ltd
  { id: 16n, sellerId: 4n, category: Category.AUTOMOTIVE,     description: "1967 Ferrari 275 GTB/4 – Rosso Corsa, Matching Numbers",           price: "3200000" },
  { id: 17n, sellerId: 4n, category: Category.AUTOMOTIVE,     description: "1955 Mercedes-Benz 300SL Gullwing – Silver, Full Restoration",     price: "1450000" },
  { id: 18n, sellerId: 4n, category: Category.AUTOMOTIVE,     description: "1961 Jaguar E-Type Series 1 Roadster – British Racing Green",      price: "285000"  },
  { id: 19n, sellerId: 4n, category: Category.AUTOMOTIVE,     description: "1973 Porsche 911 Carrera RS 2.7 – Grand Prix White/Green",         price: "950000"  },
  { id: 20n, sellerId: 4n, category: Category.AUTOMOTIVE,     description: "1969 Aston Martin DB6 Vantage – California Sage",                  price: "680000"  },

  // Seller 5 – Tokyo Rare Collectibles
  { id: 21n, sellerId: 5n, category: Category.COLLECTIBLES,   description: "Pokémon Base Set 1st Edition Charizard – PSA 10 Gem Mint",         price: "420000"  },
  { id: 22n, sellerId: 5n, category: Category.COLLECTIBLES,   description: "1952 Topps Mickey Mantle #311 – SGC 8 NM-MT",                     price: "3800000" },
  { id: 23n, sellerId: 5n, category: Category.ANTIQUES,       description: "Edo Period Katana – Signed Masamune School, 16th Century",         price: "185000"  },
  { id: 24n, sellerId: 5n, category: Category.ANTIQUES,       description: "Chinese Ming Dynasty Blue & White Porcelain Vase – 15th Century",  price: "320000"  },
  { id: 25n, sellerId: 5n, category: Category.OTHER,          description: "Rare 1st Edition Gutenberg Bible Leaf – Circa 1455",               price: "95000"   },
];

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

  console.log(`Seeding data from ${account.address} ...`);
  console.log(`Contract: ${CONTRACT_ADDRESS}\n`);

  // --- Add Sellers ---
  for (const s of sellers) {
    const seller = { ...s, sellerAddress: account.address };
    const hash = await walletClient.writeContract({
      address: CONTRACT_ADDRESS,
      abi: artifact.abi,
      functionName: "addSeller",
      args: [seller],
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(`Seller #${s.id} "${s.name}" added  (tx: ${receipt.transactionHash})`);
  }

  console.log("\nAll sellers added. Now adding products...\n");

  // --- Add Products ---
  for (const p of products) {
    const product = { ...p, isDeleted: false, isSold: false };
    const hash = await walletClient.writeContract({
      address: CONTRACT_ADDRESS,
      abi: artifact.abi,
      functionName: "addProduct",
      args: [product],
    });
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(`Product #${p.id} added  (tx: ${receipt.transactionHash})`);
  }

  console.log("\nDone! 5 sellers and 25 products seeded.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
