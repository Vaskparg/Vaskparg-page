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

// Process login form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = isset($_POST['role']) ? $_POST['role'] : 'resident';

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? AND role = ?");
    $stmt->bind_param("ss", $email, $role);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['password'])) {
            // Start session and store user data
            session_start();
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['email'] = $row['email'];
            $_SESSION['role'] = $row['role'];
            $_SESSION['apartment'] = $row['apartment'];

            // Redirect based on user role
            switch ($role) {
                case 'admin':
                    header("Location: admin/dashboard.html");
                    break;
                case 'security':
                    header("Location: security/dashboard.html");
                    break;
                default:
                    header("Location: index.html");
                    break;
            }
            exit();
        } else {
            $error = "Invalid password! Please try again.";
        }
    } else {
        $error = "No user found with this email and role combination!";
    }

    // If there was an error, redirect back to login page with error message
    if (isset($error)) {
        header("Location: login.html?error=" . urlencode($error));
        exit();
    }

    $stmt->close();
}

// Close database connection
$conn->close();
?>