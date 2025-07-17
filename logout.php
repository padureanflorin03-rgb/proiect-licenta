<?php
session_start();
session_unset();
session_destroy();

// JavaScript pentru a sterge favoritele din localStorage la logout
echo "<script>
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('favorites');
    localStorage.removeItem('username');
    window.location.href = 'html.html'; // Redirectioneaza utilizatorul la pagina de start
</script>";
?>
