<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "your_database";

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process signup form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $username = $_POST['username'];
    $email = $_POST['email'];
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $apartment = isset($_POST['apartment']) ? $_POST['apartment'] : '';
    $role = isset($_POST['role']) ? $_POST['role'] : 'resident';
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $created_at = date('Y-m-d H:i:s');

    // Check if email already exists
    $check_stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $result = $check_stmt->get_result();

    if ($result->num_rows > 0) {
        $error = "Email already exists! Please use a different email or login.";
        header("Location: signup.html?error=" . urlencode($error));
        exit();
    }
    $check_stmt->close();

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, email, phone, apartment, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $username, $email, $phone, $apartment, $password, $role, $created_at);

    if ($stmt->execute()) {
        // Registration successful, redirect to login page
        header("Location: login.html?success=Registration successful! Please login.");
        exit();
    } else {
        // Registration failed
        $error = "Registration failed: " . $conn->error;
        header("Location: signup.html?error=" . urlencode($error));
        exit();
    }

    $stmt->close();
}

// Close database connection
$conn->close();
?>