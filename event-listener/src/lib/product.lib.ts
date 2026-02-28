import { Bytes, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { Product } from "../../generated/schema";

export function loadProduct(key: Bytes, event: ethereum.Event): Product {
  let product = Product.load(key);
  if (!product) {
    product = new Product(key);
    product.sellerId = BigInt.zero();
    product.seller = Bytes.empty();
    product.category = 0;
    product.description = "";
    product.price = "";
    product.isDeleted = false;
    product.isSold = false;
  }

  product.blockNumber = event.block.number;
  product.blockTimestamp = event.block.timestamp;
  product.transactionHash = event.transaction.hash;

  return product;
}
