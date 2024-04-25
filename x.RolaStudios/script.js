// Sample data for demonstration
const cartItems = [
    { id: 1, name: 'T-shirt', price: 20 },
    { id: 2, name: 'Hoodie', price: 40 },
    { id: 3, name: 'Jeans', price: 30 }
];

// Function to display items in the shopping cart
function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-items');

    // Clear existing content
    cartItemsContainer.innerHTML = '';

    // Iterate through each item in the cart and create HTML elements
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="images/${item.id}.jpg" alt="${item.name}">
            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

// Function to calculate and display the total price of items in the cart
function displayTotalPrice() {
    const totalPriceElement = document.querySelector('.cart-total');
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    totalPriceElement.textContent = `Total: $${totalPrice}`;
}

// Function to handle removing items from the cart
function removeCartItem(itemId) {
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cartItems.splice(index, 1);
        displayCartItems();
        displayTotalPrice();
    }
}

// Event listener for removing items from the cart
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
        const itemId = parseInt(event.target.dataset.id);
        removeCartItem(itemId);
    }
});

// Function to handle form submission and process the order
function handleCheckout(event) {
    event.preventDefault();

    // Get form input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    // Validate form inputs
    if (!name || !email || !address) {
        alert('Please fill in all fields.');
        return;
    }

    // Assuming a successful order processing
    alert(`Thank you, ${name}! Your order has been placed successfully.`);
    // Clear form inputs after successful submission
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
}

// Event listener for form submission
const checkoutForm = document.getElementById('checkout-form');
checkoutForm.addEventListener('submit', handleCheckout);

// Initial display of cart items and total price
displayCartItems();
displayTotalPrice();
