<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dessert Store - Login</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.0/firebase-auth-compat.js"></script>
    <script src="firebase-config.js"></script>
<style>/* styles.css */

/* Global styles */
body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.auth-container {
    width: 100%;
    max-width: 400px;
    margin: auto;
    text-align: center;
    padding: 20px;
}

.auth-card {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.auth-card h2 {
    margin-bottom: 20px;
    color: #333333;
}

.form-group {
    margin-bottom: 20px;
    text-align: left;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #555555;
}

input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 16px;
}

.auth-btn {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.auth-btn:hover {
    background-color: #45a049;
}

.auth-links {
    margin-top: 15px;
}

.auth-links a {
    margin-right: 10px;
    color: #007bff;
    text-decoration: none;
    font-size: 14px;
}

.auth-links a:hover {
    text-decoration: underline;
}
</style>
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <h2>Login to Your Account</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label for="loginEmail">Email</label>
                    <input type="email" id="loginEmail" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" required>
                </div>
                <button type="submit" class="auth-btn">Login</button>
                <div class="auth-links">
                    <a href="signup.html">Create account</a>
                    <a href="forgot-password.html">Forgot password?</a>
                </div>
            </form>
        </div>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    window.location.href = "homeindex.html";
                })
                .catch(error => {
                    alert(getAuthErrorMessage(error.code));
                });
        });

        function getAuthErrorMessage(errorCode) {
            switch(errorCode) {
                case 'auth/user-not-found':
                    return 'No account found with this email.';
                case 'auth/wrong-password':
                    return 'Incorrect password.';
                case 'auth/invalid-email':
                    return 'Please enter a valid email address.';
                default:
                    return 'Login failed. Please try again.';
            }
        }
    </script>
</body>
</html>