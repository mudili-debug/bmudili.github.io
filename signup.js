import { auth, createUserWithEmailAndPassword } from "./firebaseConfig.js";

document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Signup successful! You can now log in.");
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => {
            alert(error.message);
        });
});
