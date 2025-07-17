<?php
session_start();
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "elden_card_game";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexiune eșuată: " . $conn->connect_error);
}

$user = $_POST['username'];
$pass = $_POST['password'];
$user = $conn->real_escape_string($user);

// Include email-ul in query
$sql = "SELECT id, username, password, email FROM users WHERE username = '$user'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $hashed_password = $row['password'];

    if (password_verify($pass, $hashed_password)) {
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['username'] = $row['username'];

        //  Salvez username + email in localStorage
        echo "
        <script>
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', '" . $row['username'] . "');
            localStorage.setItem('email', '" . $row['email'] . "');
            window.location.href = 'html.html?success=1';
        </script>";
        exit();
    } else {
        echo "<script>window.location.href = 'login.html?error=invalid_credentials';</script>";
        exit();
    }
} else {
    echo "<script>window.location.href = 'login.html?error=invalid_credentials';</script>";
    exit();
}

$conn->close();
?>
