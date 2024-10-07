// Function to show price when a button is clicked
function showPrice(button, price) {
    // Find the nearest price display element in the current product-item div
    const productItem = button.closest('.product-item');
    const priceDisplay = productItem.querySelector('.price-display');

    // Update the price display with the selected price
    priceDisplay.textContent = `Price: $${price.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', function () {
    // Price range input logic
    const priceRangeInput = document.getElementById('priceRange');
    const priceRangeValue = document.getElementById('priceRangeValue');

    // Update the price range value dynamically
    priceRangeInput.addEventListener('input', function () {
        priceRangeValue.textContent = `$${this.value}`;
    });

    // Toggle filter section visibility
    const filterSections = document.querySelectorAll('.filter-section h3');
    filterSections.forEach(header => {
        header.addEventListener('click', function () {
            this.parentElement.classList.toggle('active');
        });
    });

    // Price display logic for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const price = parseFloat(this.getAttribute('data-price'));
            showPrice(this, price);
        });
    });

    // Sample product data (can be replaced with actual data)
    const products = [
        { id: 1, title: 'Product 1', description: 'Description for product 1', price: 19.99, image: 'image1.jpg' },
        { id: 2, title: 'Product 2', description: 'Description for product 2', price: 29.99, image: 'image2.jpg' },
        { id: 3, title: 'Product 3', description: 'Description for product 3', price: 39.99, image: 'image3.jpg' },
        { id: 4, title: 'Product 4', description: 'Description for product 4', price: 49.99, image: 'image4.jpg' },
        { id: 5, title: 'Product 5', description: 'Description for product 5', price: 59.99, image: 'image5.jpg' },
        { id: 6, title: 'Product 6', description: 'Description for product 6', price: 69.99, image: 'image6.jpg' },
        { id: 7, title: 'Product 7', description: 'Description for product 7', price: 79.99, image: 'image7.jpg' },
        { id: 8, title: 'Product 8', description: 'Description for product 8', price: 89.99, image: 'image8.jpg' },
        { id: 9, title: 'Product 9', description: 'Description for product 9', price: 99.99, image: 'image9.jpg' },
        { id: 10, title: 'Product 10', description: 'Description for product 10', price: 109.99, image: 'image10.jpg' },
        // Add more products as needed...
    ];

    let currentPage = 1;
    const itemsPerPage = 3;

    const productContainer = document.getElementById('product-container');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageNumber = document.getElementById('pageNumber');

    // Function to render products
    function renderProducts() {
        // Clear current product list
        productContainer.innerHTML = '';

        // Calculate which products to show on this page
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedProducts = products.slice(start, end);

        // Render each product
        paginatedProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-details">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p class="price-display">Price: $${product.price.toFixed(2)}</p>
                    <button class="btn" data-price="${product.price}">Add to Cart</button>
                </div>
            `;
            productContainer.appendChild(productItem);
        });

        // Update pagination buttons
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = end >= products.length;

        // Update page number display
        pageNumber.textContent = currentPage;
    }

    // Event listeners for pagination buttons
    prevPageBtn.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });

    nextPageBtn.addEventListener('click', function () {
        if ((currentPage * itemsPerPage) < products.length) {
            currentPage++;
            renderProducts();
        }
    });

    // Initial render
    renderProducts();
});
