"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let products = [];
const savedProducts = localStorage.getItem("products");
if (savedProducts) {
    products = JSON.parse(savedProducts);
}
const form = document.getElementById("productForm");
const table = document.getElementById("productTable");
const searchInput = document.getElementById("searchInput");
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}
function displayProducts(search = "") {
    table.innerHTML = "";
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    filteredProducts.forEach(product => {
        const row = document.createElement("tr");
        const values = [
            product.id.toString(),
            product.name,
            product.price.toString(),
            product.quantity.toString(),
            product.category
        ];
        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => {
            deleteProduct(product.id);
        });
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        table.appendChild(row);
    });
    updateSummary();
}
function addProduct(product) {
    const exists = products.some(p => p.id === product.id);
    if (exists) {
        alert("Product ID already exists!");
        return;
    }
    products.push(product);
    saveProducts();
    displayProducts(searchInput.value);
}
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    saveProducts();
    displayProducts(searchInput.value);
}
function updateSummary() {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    document.getElementById("totalProducts").textContent =
        totalProducts.toString();
    document.getElementById("totalValue").textContent =
        totalValue.toFixed(2);
}
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = Number(document.getElementById("productId").value);
    const name = document.getElementById("productName").value.trim();
    const price = Number(document.getElementById("productPrice").value);
    const quantity = Number(document.getElementById("productQuantity").value);
    const category = document.getElementById("productCategory").value.trim();
    if (!Number.isSafeInteger(id) ||
        id <= 0 ||
        !name ||
        !Number.isFinite(price) ||
        price < 0 ||
        !Number.isSafeInteger(quantity) ||
        quantity < 0 ||
        !category) {
        alert("Please enter valid product details.");
        return;
    }
    const product = {
        id,
        name,
        price,
        quantity,
        category
    };
    addProduct(product);
    form.reset();
});
searchInput.addEventListener("input", () => {
    displayProducts(searchInput.value);
});
displayProducts();
//# sourceMappingURL=app.js.map