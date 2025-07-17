<?php
include 'db.php'; // Include conexiunea la baza de date

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    //verifica daca username, email sau parola sunt goale
    if (empty($username) || empty($email) || empty($password)) {
        header("Location: signup.html?status=empty");
        exit();
    }

    // Verifica daca email-ul exista deja
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        header("Location: signup.html?status=email_exists");
        exit();
    }
    $stmt->close();

    // Verifica daca username-ul exista deja
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        header("Location: signup.html?status=username_exists");
        exit();
    }
    $stmt->close();

    // Hash-uim parola
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Creeaza contul
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashedPassword);

    if ($stmt->execute()) {
        header("Location: signup.html?status=success");
    } else {
        header("Location: signup.html?status=error");
    }

    $stmt->close();
    $conn->close();
    exit();
}
?>
