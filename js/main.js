
document.addEventListener("DOMContentLoaded", function(){ 
    console.log("DOM content loaded");
    let navbar = document.querySelector('.navbar');
    let menuBtn = document.querySelector('#menu-btn');
    let cartBtn = document.querySelector('#cart-btn');
    let searchBox = document.querySelector('#search-box');
    let cartItemsContainer = document.querySelector('.cart-iteams-container');

    console.log(navbar, menuBtn, cartBtn, searchBox, cartItemsContainer);

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            console.log("Menu button clicked");
            navbar.classList.toggle('active');
        });
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            console.log("Cart button clicked");
            cartItemsContainer.classList.toggle('active');
        });
    }

    if (searchBox) {
        searchBox.addEventListener('click', function() {
            console.log("Search box clicked");
            cartItemsContainer.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', function() {
        if (menuBtn) {
            menuBtn.classList.remove('fa-times');
            navbar.classList.remove('active');
        }

        if(window.scrollY > 60) {
            let scrollTopBtn = document.querySelector('#scroll-top');
            if (scrollTopBtn) {
                scrollTopBtn.classList.add('active');
            }
        } else {
            let scrollTopBtn = document.querySelector('#scroll-top');
            if (scrollTopBtn) {
                scrollTopBtn.classList.remove('active');
            }
        }
    });

    function loader() {
        console.log("Loader called");
        let loaderContainer = document.querySelector('.loader-container');
        if (loaderContainer) {
            loaderContainer.classList.add('fade-out');
        }
    }

    function fadeOut() {
        console.log("Fade out called");
        setInterval(loader, 3000);
    }

    window.onload = fadeOut();

    // Add event listeners for quantity change buttons
    document.querySelectorAll('.quantity .increase-btn').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.quantity .decrease-btn').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });

    // Add event listener for cart item removal
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', removeCartItem);
    });

    // Calculate total value initially
    updateTotalValue()
});

// Initialize cart items array
let cartItems = [];

// Function to add an item to the cart
function addToCart(event) {
    // Prevent default link behavior
    event.preventDefault();

    // Get the parent box element of the clicked add to cart button
    const box = event.target.closest('.box');

    // Extract item details from the box
    const itemName = box.querySelector('.content h3').textContent;
    const itemPrice = parseFloat(box.querySelector('.content .price').textContent.replace('$', ''));
    const itemImage = box.querySelector('.image img').src;

    // Check if the item is already in the cart
    const existingItemIndex = cartItems.findIndex(item => item.name === itemName);

    // If item already exists in the cart, increase its quantity
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        // If item is not in the cart, add it
        cartItems.push({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            image: itemImage
        });
    }

    // Update cart display
    updateCartDisplay();
}

// Function to remove item from cart
function removeItemFromCart(index) {
    cartItems.splice(index, 1);
    updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
    const cartBody = document.querySelector('.cart-body');
    let cartTotal = 0;

    // Clear cart body
    cartBody.innerHTML = '';

    // Iterate over cart items and update display
    cartItems.forEach(item => {
        // Create cart item element
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <div class="item-image"><img src="${item.image}" alt="${item.name}"></div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="quantity">
                    <label for="quantity">Quantity:</label>
                    <button class="decrease-btn">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                    <button class="increase-btn">+</button>
                </div>
                <div class="item-price">Price: $${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="remove-btn"><i class="fa-solid fa-trash"></i></button>
        `;

        // Append item to cart body
        cartBody.appendChild(cartItemElement);

        // Calculate total price
        cartTotal += item.price * item.quantity;
    });

    // Update total price display
    document.getElementById('total-value').textContent = cartTotal.toFixed(2);

    // Update cart item count in the cart icon
    document.getElementById('cart-btn').innerHTML = `<sup>${cartItems.length}</sup>`;

    // Add event listeners for quantity input and buttons
    addEventListeners();
}

// Function to add event listeners for quantity input and buttons
function addEventListeners() {
    // Get all quantity input fields
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('input', () => {
            updateCartQuantity(input);
        });
    });

    // Get all decrease buttons
    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            decreaseQuantity(button);
        });
    });

    // Get all increase buttons
    const increaseButtons = document.querySelectorAll('.increase-btn');
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            increaseQuantity(button);
        });
    });
}

// Function to update quantity when input changes
function updateCartQuantity(input) {
    const index = getIndexFromElement(input);
    const newQuantity = parseInt(input.value);
    cartItems[index].quantity = newQuantity;
    updateCartDisplay();
}

// Function to decrease quantity when decrease button is clicked
function decreaseQuantity(button) {
    const input = button.nextElementSibling;
    const index = getIndexFromElement(input);
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        updateCartDisplay();
    }
}

// Function to increase quantity when increase button is clicked
function increaseQuantity(button) {
    const input = button.previousElementSibling;
    const index = getIndexFromElement(input);
    cartItems[index].quantity++;
    updateCartDisplay();
}

// Function to get index of cart item from its associated element
function getIndexFromElement(element) {
    const cartItem = element.closest('.cart-item');
    const index = Array.from(cartItem.parentNode.children).indexOf(cartItem);
    return index;
}

// Initial call to update cart display
function displayCartItems() {
    const cartItemsContainer = document.querySelector('.cart-iteams-container');
    cartItemsContainer.innerHTML = '';
  
    cartItems.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
  
      const itemImage = document.createElement('img');
      itemImage.src = item.image;
      cartItem.appendChild(itemImage);
  
      const itemDetails = document.createElement('div');
      itemDetails.classList.add('item-details');
  
      const itemName = document.createElement('h3');
      itemName.textContent = item.name;
      itemDetails.appendChild(itemName);
  
      const itemPrice = document.createElement('p');
      itemPrice.textContent = `$${item.price}`;
      itemDetails.appendChild(itemPrice);
  
      cartItem.appendChild(itemDetails);
  
      cartItemsContainer.appendChild(cartItem);
    });
}

function storeCartItems() {
    localStorage.setItem('cartTotal', document.getElementById('total-value').textContent);
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const sizeButtons = card.querySelectorAll('.size-btn');
        const productPrice = card.querySelector('.product-price');

        sizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const newPrice = button.getAttribute('data-price');
                const [dollars, cents] = newPrice.split('.');
                productPrice.innerHTML = `<sup>$</sup>${dollars}<small>.${cents}</small>`;
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartBody = document.querySelector('.cart-body');
    const totalValue = document.getElementById('total-value');

    function updateCart() {
        cartBody.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name} (${item.size}) - $${item.price}</span>
            `;
            cartBody.appendChild(itemElement);

            totalPrice += parseFloat(item.price);
        });

        totalValue.textContent = totalPrice.toFixed(2);
    }

    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const sizeButtons = card.querySelectorAll('.size-btn');
        const buyNowButton = card.querySelector('.group a');
        const productName = card.querySelector('h3').textContent;

        buyNowButton.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedSize = card.querySelector('.size-btn.selected').textContent;
            const selectedPrice = card.querySelector('.size-btn.selected').getAttribute('data-price');
            const item = {
                name: productName,
                size: selectedSize,
                price: selectedPrice
            };
            cart.push(item);
            updateCart();
        });

        sizeButtons.forEach(button => {
            button.addEventListener('click', () => {
                sizeButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });
    });

    function storeCartItems() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function clearCart() {
        cart.length = 0;
        updateCart();
    }

    document.querySelector('.cart-clear').addEventListener('click', clearCart);
});
