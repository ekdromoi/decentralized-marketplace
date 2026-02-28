import {
  ProductDeleted as ProductDeletedEvent,
  ProductEvent as ProductEventEvent,
  SellerAdded as SellerAddedEvent
} from "../generated/product-registry/product_registry"
import { loadSeller, loadProduct } from "./lib"

export function handleProductDeleted(event: ProductDeletedEvent): void {
  let entity = loadProduct(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
    event
  )
  entity.isDeleted = true;

  entity.save()
}

export function handleProductEvent(event: ProductEventEvent): void {
  let entity = loadProduct(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
    event
  )
  entity.sellerId = event.params.sellerId
  entity.category = event.params.category
  entity.description = event.params.description
  entity.price = event.params.price
  entity.isDeleted = event.params.isDeleted
  entity.isSold = event.params.isSold

  entity.save()
}

export function handleSellerAdded(event: SellerAddedEvent): void {
  let entity = loadSeller(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
    event
  )
  entity.name = event.params.name
  entity.email = event.params.email
  entity.phone = event.params.phone
  entity.city = event.params.city
  entity.country = event.params.country
  entity.streetAddress = event.params.streetAddress

  entity.save()
}
