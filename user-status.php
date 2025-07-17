<?php
session_start();

// Verifica daca utilizatorul este logat
if (isset($_SESSION['username'])) {
    echo json_encode([
        'loggedIn' => true,
        'username' => $_SESSION['username']
    ]);
} else {
    echo json_encode([
        'loggedIn' => false
    ]);
}
?>
