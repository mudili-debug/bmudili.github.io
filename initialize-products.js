// initialize-products.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAtiqeg_UMXmOMLgYnBfv530_N-n-nwbj8",
  authDomain: "dessertstore-833ea.firebaseapp.com",
  databaseURL: "https://dessertstore-833ea-default-rtdb.firebaseio.com",
  projectId: "dessertstore-833ea",
  storageBucket: "dessertstore-833ea.firebasestorage.app",
  messagingSenderId: "108572510478",
  appId: "1:108572510478:web:e9b3439de30bdd86136f5f",
  measurementId: "G-6BHD0FE9ML"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const dessertProducts = {
  "cakes": [
    {id: "cake1", name: "Chocolate Cake", price: 10, img: "https://tse4.mm.bing.net/th?id=OIP.lBuQauKnT5u_Gu_VeVoBaAHaHa&pid=Api&P=0&h=180", rating: 4, category: "cakes", description: "Rich chocolate cake with chocolate frosting"},
    {id: "cake2", name: "Red Velvet Cake", price: 12, img: "https://tse2.mm.bing.net/th?id=OIP.3kLHfySnFgy5ZTwPeKT_1AHaJC&pid=Api&P=0&h=180", rating: 5, category: "cakes", description: "Classic red velvet with cream cheese frosting"},
    {id: "cake3", name: "Lemon Cake", price: 9, img: "https://tse1.mm.bing.net/th?id=OIP.DKVB8dW253Sl40VOKg3wagHaHa&pid=Api&P=0&h=180", rating: 3, category: "cakes", description: "Zesty lemon cake with lemon glaze"}
  ],
  "cupcakes": [
    {id: "cupcake1", name: "Strawberry Cupcake", price: 5, img: "https://tse4.mm.bing.net/th?id=OIP.lQ09DB_tjS-y4k_i55_cOwHaHa&pid=Api&P=0&h=180", rating: 4, category: "cupcakes", description: "Vanilla cupcake with strawberry frosting"},
    {id: "cupcake2", name: "Chocolate Cupcake", price: 6, img: "https://tse2.mm.bing.net/th?id=OIP.K9wHLIiYtj5cCpwH-TgoDQHaGo&pid=Api&P=0&h=180", rating: 5, category: "cupcakes", description: "Chocolate cupcake with chocolate ganache"},
    {id: "cupcake3", name: "Vanilla Cupcake", price: 5, img: "https://tse2.mm.bing.net/th?id=OIP.1AZ38b3N9OskHCnzleSwhgHaHa&pid=Api&P=0&h=180", rating: 4, category: "cupcakes", description: "Classic vanilla cupcake with buttercream"}
  ],
  "pastries": [
    {id: "pastry1", name: "Cheesecake", price: 8, img: "https://stateofdinner.com/wp-content/uploads/2023/03/philadelphia-cheesecake-featured.jpg", rating: 5, category: "pastries", description: "Creamy New York style cheesecake"},
    {id: "pastry2", name: "Tiramisu", price: 9, img: "https://tse2.mm.bing.net/th?id=OIP.KIKezk9w3iwqRdL__0p6AwHaHa&pid=Api&P=0&h=180", rating: 5, category: "pastries", description: "Classic Italian coffee-flavored dessert"},
    {id: "pastry3", name: "Fruit Tart", price: 9, img: "https://tse4.mm.bing.net/th?id=OIP.Nxg-uO0gSJYCLK1b2KIHJwHaHa&pid=Api&P=0&h=180", rating: 4, category: "pastries", description: "Buttery crust with pastry cream and fresh fruits"}
  ],
  "cookies": [
    {id: "cookie1", name: "Chocolate Chip Cookie", price: 4, img: "https://tse2.mm.bing.net/th?id=OIP.Un61KDv2fbU-Q7MZFvDAmAHaHa&pid=Api&P=0&h=180", rating: 5, category: "cookies", description: "Classic cookie with melty chocolate chips"},
    {id: "cookie2", name: "Oatmeal Raisin Cookie", price: 5, img: "https://tse4.mm.bing.net/th?id=OIP.CdwCWDtoEKQeVgYF04dlsgHaGx&pid=Api&P=0&h=180", rating: 4, category: "cookies", description: "Chewy oatmeal cookie with plump raisins"},
    {id: "cookie3", name: "Sugar Cookie", price: 3, img: "https://tse2.mm.bing.net/th?id=OIP.yFls9-Lt5d2fmBNKdTSg1AHaHa&pid=Api&P=0&h=180", rating: 3, category: "cookies", description: "Buttery sugar cookie with sprinkles"}
  ],
  "special": [
    {id: "special1", name: "Macarons", price: 10, img: "https://tse2.mm.bing.net/th?id=OIP.C-JIvX_nmZC5syuI34MY8AHaHa&pid=Api&P=0&h=180", rating: 5, category: "special", description: "French macarons in assorted flavors"},
    {id: "special2", name: "Mochi", price: 9, img: "https://tse4.mm.bing.net/th?id=OIP.n0cLX0exnl_o7IhQlVpKJwHaHa&pid=Api&P=0&h=180", rating: 4, category: "special", description: "Japanese rice cakes with sweet filling"},
    {id: "special3", name: "Souffle", price: 10, img: "https://tse2.mm.bing.net/th?id=OIP.pd-zQh9k_Qgnqz-eP03o2gHaHa&pid=Api&P=0&h=180", rating: 5, category: "special", description: "Light and airy chocolate soufflé"}
  ]
};

// Add categories to database
set(ref(database, 'categories'), {
  "cakes": "Cakes",
  "cupcakes": "Cupcakes",
  "pastries": "Pastries",
  "cookies": "Cookies",
  "special": "Special Desserts"
});

// Add products to database
Object.entries(dessertProducts).forEach(([category, products]) => {
  products.forEach(product => {
    set(ref(database, `products/${category}/${product.id}`), product)
      .then(() => console.log(`Added ${product.name} to database`))
      .catch(error => console.error("Error adding product:", error));
  });
});

console.log("All products added to database!");