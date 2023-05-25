// script.js

// Product Listing Page - Sample Data
const products = [
    { id: 1, name: 'Smart Watch 1', price: 199.99 },
    { id: 2, name: 'Smart Watch 2', price: 249.99 },
    { id: 3, name: 'Smart Watch 3', price: 299.99 },
  ];
  
  // Cart Page - Sample Data
  let cartItems = [];
  
  // Product Detail Page - Add to Cart
  function addToCart() {
    // Get product details from the page (assuming a single product)
    const productId = 1; // Sample value for the product ID
    const product = products.find(item => item.id === productId);
  
    // Add product to cart
    cartItems.push(product);
    alert('Product added to cart!');
  }
  
  // Cart Page - Checkout
  function checkout() {
    // Perform checkout process (e.g., payment gateway integration)
    alert('Checkout successful! Thank you for shopping with Easeebuy!');
    cartItems = []; // Empty the cart after checkout
    updateCart(); // Update the cart view
  }
  
  // Product Listing Page - Display Products
  function displayProducts() {
    const productList = document.getElementById('product-list');
  
    // Clear existing product list
    productList.innerHTML = '';
  
    // Generate HTML for each product and append to the list
    products.forEach(product => {
      const listItem = document.createElement('li');
      listItem.innerText = `${product.name} - $${product.price}`;
      productList.appendChild(listItem);
    });
  }
  
  // Cart Page - Update Cart
  function updateCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
  
    // Clear existing cart items
    cartList.innerHTML = '';
  
    // Generate HTML for each cart item and append to the list
    cartItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.innerText = `${item.name} - $${item.price}`;
      cartList.appendChild(listItem);
    });
  
    // Calculate and display the total cart value
    const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    cartTotal.innerText = total;
  }
  
  // Ratings and Reviews - Submit Review
  document.querySelector('#ratings-reviews form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const nameInput = document.querySelector('#ratings-reviews form input[type="text"]');
    const reviewInput = document.querySelector('#ratings-reviews form textarea');
    const reviewsList = document.getElementById('reviews');
  
    // Get review details from the form
    const name = nameInput.value;
    const review = reviewInput.value;
  
    // Create a new review element
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${name}</strong>: ${review}`;
    reviewsList.appendChild(listItem);
  
    // Clear the input fields
    nameInput.value = '';
    reviewInput.value = '';
  });
  
  // Recommendations - Sample Data
  const recommendations = [
    { id: 4, name: 'Smart Watch 4', price: 349.99 },
    { id: 5, name: 'Smart Watch 5', price: 399.99 },
  ];
  
  // Recommendations - Display Recommendations
  function displayRecommendations() {
    const recommendationsList = document.querySelector('#recommendations ul');
  
    // Clear existing recommendations
    recommendationsList.innerHTML = '';
  
    // Generate HTML for each recommendation and append to the list
    recommendations.forEach(recommendation => {
      const listItem = document.createElement('li');
      listItem.innerText = `${recommendation.name} - $${recommendation.price}`;
      recommendationsList.appendChild(listItem);
    });
  }
  
  // Load event listeners
  document.addEventListener('DOMContentLoaded', function () {
    displayProducts();
    updateCart();
    displayRecommendations();
  });
  // Function to perform search and filter based on user input
function searchAndFilter() {
  const searchInput = document.getElementById('searchInput').value;
  const categoryFilter = document.getElementById('categoryFilter').value;

  // Make an HTTP request to the backend API
  fetch(`/api/products?search=${encodeURIComponent(searchInput)}&category=${encodeURIComponent(categoryFilter)}`)
    .then(response => response.json())
    .then(data => {
      // Handle the response and update the UI with the filtered results
      const productListElement = document.getElementById('productList');
      productListElement.innerHTML = '';

      // Iterate over the filtered products and display them
      data.forEach(product => {
        // Create HTML elements to display the product details
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>Category: ${product.category}</p>
          <p>Price: ${product.price}</p>
        `;

        productListElement.appendChild(productElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Attach event listener to the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchAndFilter);
