<?php
// seteaza detaliile de conectare
$servername = "localhost";
$username = "root";
$password = ""; // in XAMPP, parola implicita pentru MySQL este goala
$dbname = "elden_card_game"; // numele bazei de date creat în phpMyAdmin

// creeaza conexiunea
$conn = new mysqli($servername, $username, $password, $dbname);

// verifica conexiunea
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
