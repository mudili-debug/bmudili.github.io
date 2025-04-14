// Common functions for all pages
function redirectToWishlist() {
    window.location.href = "wishlist.html";
}

function redirectToCart() {
    window.location.href = "cart.html";
}

function addToCart(product) {
    const user = firebase.auth().currentUser;
    if (!user) {
        // Save the product to localStorage for guest users
        let cart = JSON.parse(localStorage.getItem('guestCart')) || [];
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                quantity: 1
            });
        }
        
        localStorage.setItem('guestCart', JSON.stringify(cart));
        redirectToCart();
        return;
    }

    // For logged-in users
    const cartRef = database.ref('users/' + user.uid + '/cart/' + product.id.replace(/\s+/g, '_'));
    
    cartRef.transaction(currentItem => {
        if (currentItem) {
            currentItem.quantity = (currentItem.quantity || 1) + 1;
        } else {
            currentItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                quantity: 1
            };
        }
        return currentItem;
    }).then(() => {
        redirectToCart();
    });
}

function toggleWishlist(product) {
    const user = firebase.auth().currentUser;
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.findIndex(item => item.id === product.id);
    
    if (index === -1) {
        wishlist.push(product);
        alert(`${product.name} added to wishlist!`);
    } else {
        wishlist.splice(index, 1);
        alert(`${product.name} removed from wishlist!`);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // For logged-in users, sync with Firebase
    if (user) {
        const wishlistRef = database.ref('users/' + user.uid + '/wishlist/' + product.id.replace(/\s+/g, '_'));
        if (index === -1) {
            wishlistRef.set(product);
        } else {
            wishlistRef.remove();
        }
    }
    
    // Redirect to wishlist page if coming from a button
    if (event.target.classList.contains('wishlist-redirect')) {
        redirectToWishlist();
    }
}