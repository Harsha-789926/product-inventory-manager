interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
}

let products: Product[] = [];

function addProduct(product: Product): void {
    products.push(product);
    console.log("Product added successfully!");
}

const product1: Product = {
    id: 101,
    name: "Laptop",
    price: 45000,
    quantity: 5,
    category: "Electronics"
};

addProduct(product1);

console.log(products);