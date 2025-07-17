<?php
$plaintext_password = "parola123"; // inlocuieste cu parola dorita
$hashed_password = password_hash($plaintext_password, PASSWORD_DEFAULT);
echo "Parola criptata: " . $hashed_password;
?>
