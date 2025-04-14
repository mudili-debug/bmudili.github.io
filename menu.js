import { database } from './firebase-config.js';

function loadDesserts() {
    const dessertsRef = firebase.database().ref('desserts');
    
    dessertsRef.on('value', (snapshot) => {
        const desserts = snapshot.val();
        const menuContainer = document.getElementById('menu-container');
        
        menuContainer.innerHTML = '';
        
        for (const dessertId in desserts) {
            if (desserts.hasOwnProperty(dessertId)) {
                const dessert = desserts[dessertId];
                
                const dessertCard = `
                    <div class="dessert-card" data-id="${dessertId}">
                        <img src="${dessert.imageUrl}" alt="${dessert.name}">
                        <h3>${dessert.name}</h3>
                        <p>${dessert.description}</p>
                        <span class="price">$${dessert.price.toFixed(2)}</span>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                `;
                
                menuContainer.innerHTML += dessertCard;
            }
        }
        
        // Add event listeners to all "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    });
}

function addToCart(event) {
    const userId = firebase.auth().currentUser?.uid;
    if (!userId) {
        alert('Please login to add items to cart');
        return;
    }
    
    const dessertId = event.target.closest('.dessert-card').dataset.id;
    const cartRef = firebase.database().ref(`users/${userId}/cart/${dessertId}`);
    
    cartRef.transaction((currentQuantity) => {
        return (currentQuantity || 0) + 1;
    });
}

// Load desserts when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('menu.html')) {
        loadDesserts();
    }
});