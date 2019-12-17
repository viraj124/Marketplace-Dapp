pragma solidity ^0.5.0;

contract Marketplace {
string public name;

event ProductNotification(
    uint id,
    string name,
    uint price,
    address owner,
    bool purchased
);

struct Product {
    uint id;
    string name;
    uint price;
    address payable owner;
    bool purchased;
}

mapping(uint => Product) public product;

uint public productCount;


constructor() public {
    name = "Market";
}

function createProduct(string memory _name, uint price) public {
    require(bytes(_name).length > 0);
    require(price > 0);
    productCount++;
    product[productCount] = Product(productCount, _name, price, msg.sender, false);
    emit ProductNotification(productCount, _name, price, msg.sender, false);
}

function buyProduct(uint id) public payable {
    Product memory existingProduct = product[id];

    require(existingProduct.id > 0 && existingProduct.id <= productCount);
    address payable seller = existingProduct.owner;

    require(existingProduct.purchased == false);

    require(existingProduct.owner != msg.sender);

    seller.transfer(msg.value);

    existingProduct.owner = msg.sender;
    existingProduct.purchased = true;

    product[id] = existingProduct;

    emit ProductNotification(existingProduct.id, existingProduct.name, existingProduct.price, existingProduct.owner, existingProduct.purchased);

}  
}
