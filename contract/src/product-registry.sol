// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ProductRegistry {
    enum Category {
        LUXURY_WATCHES,
        FINE_JEWELLERY,
        FINE_ART,
        AUTOMOTIVE,
        COLLECTIBLES,
        ANTIQUES,
        OTHER
    }

    struct Seller {
        uint256 id;
        address sellerAddress;
        string name;
        string email;
        string phone;
        string city;
        string country;
        string streetAddress;
        bool isBlacklisted;
    }

    struct Product {
        uint256 id;
        uint256 sellerId;
        Category category;
        string description;
        string price;
        bool isDeleted;
        bool isSold;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => Seller) public sellers;

    event SellerAdded(
        uint256 id,
        string name,
        string email,
        string phone,
        string city,
        string country,
        string streetAddress
    );
    event ProductEvent(
        uint256 id,
        uint256 sellerId,
        Category category,
        string description,
        string price,
        bool isDeleted,
        bool isSold
    );
    event ProductDeleted(uint256 id);

    modifier _onlyProductOwner(uint256 id) {
        Seller memory seller = sellers[products[id].sellerId];
        require(seller.sellerAddress == msg.sender, "Not Authorized");
        _;
    }

    // ADD A NEW PRODUCT TO THE REGISTRY
    function addProduct(Product memory product) public {
        products[product.id] = product;
        emit ProductEvent(
            product.id,
            product.sellerId,
            product.category,
            product.description,
            product.price,
            product.isDeleted,
            product.isSold
        );
    }

    // DELETE A PRODUCT FROM THE REGISTRY
    function deleteProduct(uint256 id) external _onlyProductOwner(id) {
        require(!products[id].isDeleted, "Product already deleted");
        products[id].isDeleted = true;
        emit ProductEvent(
            id,
            products[id].sellerId,
            products[id].category,
            products[id].description,
            products[id].price,
            products[id].isDeleted,
            products[id].isSold
        );
    }

    // MARK A PRODUCT AS SOLD
    function markProductAsSold(uint256 id) external _onlyProductOwner(id) {
        require(!products[id].isSold, "Product already sold");
        products[id].isSold = true;
        emit ProductEvent(
            id,
            products[id].sellerId,
            products[id].category,
            products[id].description,
            products[id].price,
            products[id].isDeleted,
            products[id].isSold
        );
    }

    // ADD A NEW SELLER TO THE REGISTRY
    function addSeller(Seller memory seller) public {
        sellers[seller.id] = seller;
        emit SellerAdded(
            seller.id,
            seller.name,
            seller.email,
            seller.phone,
            seller.city,
            seller.country,
            seller.streetAddress
        );
    }

    // BLACKLIST A SELLER
    function blacklistSeller(uint256 id) public {
        sellers[id].isBlacklisted = true;
    }

    // UNBLACKLIST A SELLER
    function unblacklistSeller(uint256 id) public {
        sellers[id].isBlacklisted = false;
    }

    // ------------------------------------------------------------
    // GETTER FUNCTIONS
    // ------------------------------------------------------------
    function getProduct(uint256 id) public view returns (Product memory) {
        return products[id];
    }

    function getSeller(uint256 id) public view returns (Seller memory) {
        return sellers[id];
    }
}
