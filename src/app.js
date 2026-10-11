"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let products = [];
function addProduct(product) {
    products.push(product);
    console.log("Product added successfully!");
}
const product1 = {
    id: 101,
    name: "Laptop",
    price: 45000,
    quantity: 5,
    category: "Electronics"
};
addProduct(product1);
console.log(products);
//# sourceMappingURL=app.js.map