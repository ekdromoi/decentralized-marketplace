import { Bytes, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Seller } from "../../generated/schema";

export function loadSeller(key: Bytes, event: ethereum.Event): Seller {
  let seller = Seller.load(key);
  if (!seller) {
    seller = new Seller(key);
    seller.name = "";
    seller.email = "";
    seller.phone = "";
    seller.city = "";
    seller.country = "";
    seller.streetAddress = "";
  }

  seller.blockNumber = event.block.number;
  seller.blockTimestamp = event.block.timestamp;
  seller.transactionHash = event.transaction.hash;

  return seller;
}
