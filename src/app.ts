interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: string;
}

let products: Product[] = [];

const savedProducts = localStorage.getItem("products");

if (savedProducts) {
    products = JSON.parse(savedProducts) as Product[];
}

const form = document.getElementById("productForm") as HTMLFormElement;
const table = document.getElementById("productTable") as HTMLTableSectionElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;

function saveProducts(): void {
    localStorage.setItem("products", JSON.stringify(products));
}

function displayProducts(search: string = ""): void {
    table.innerHTML = "";

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

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

function addProduct(product: Product): void {
    const exists = products.some(p => p.id === product.id);

    if (exists) {
        alert("Product ID already exists!");
        return;
    }

    products.push(product);
    saveProducts();
    displayProducts(searchInput.value);
}

function deleteProduct(id: number): void {
    products = products.filter(product => product.id !== id);
    saveProducts();
    displayProducts(searchInput.value);
}

function updateSummary(): void {
    const totalProducts = products.length;

    const totalValue = products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

    document.getElementById("totalProducts")!.textContent =
        totalProducts.toString();

    document.getElementById("totalValue")!.textContent =
        totalValue.toFixed(2);
}

form.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const id = Number(
        (document.getElementById("productId") as HTMLInputElement).value
    );

    const name =
        (document.getElementById("productName") as HTMLInputElement).value.trim();

    const price = Number(
        (document.getElementById("productPrice") as HTMLInputElement).value
    );

    const quantity = Number(
        (document.getElementById("productQuantity") as HTMLInputElement).value
    );

    const category =
        (document.getElementById("productCategory") as HTMLInputElement).value.trim();

    if (
        !Number.isSafeInteger(id) ||
        id <= 0 ||
        !name ||
        !Number.isFinite(price) ||
        price < 0 ||
        !Number.isSafeInteger(quantity) ||
        quantity < 0 ||
        !category
    ) {
        alert("Please enter valid product details.");
        return;
    }

    const product: Product = {
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