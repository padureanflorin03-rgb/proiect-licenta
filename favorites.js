document.addEventListener("DOMContentLoaded", function () {
    // Verifica daca utilizatorul este logat
    function isLoggedIn() {
        return localStorage.getItem("isLoggedIn") === "true"; //fverifica daca utilizatorul este logat
    }

    // Functie pentru a adauga cartea la favorite
    function toggleFavorite(button, cardId) {
        if (!isLoggedIn()) {
            showLoginMessage(); //afiseaza mesaj de eroare daca nu e logat
            return;
        }

        // Alternare stare buton (favorit / nefavorit)
        button.classList.toggle("active");

        // Obtinem lista curenta de favorite din localStorage
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (button.classList.contains("active")) {
            // adauga cartea în lista de favorite
            favorites.push(cardId);
        } else {
            // indeparteaza cartea din lista de favorite
            favorites = favorites.filter(id => id !== cardId);
        }

        // Salveaza lista actualizata de favorite în localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    // Functie pentru a afisa mesajul de eroare
    function showLoginMessage() {
        let msg = document.getElementById("loginMessage");
        if (!msg) {
            msg = document.createElement("div");
            msg.id = "loginMessage";
            msg.textContent = "Trebuie să fii logat pentru a adăuga la favorite!";
            msg.style.position = "fixed";
            msg.style.top = "10px";
            msg.style.right = "10px";
            msg.style.backgroundColor = "red";
            msg.style.color = "white";
            msg.style.padding = "10px";
            msg.style.borderRadius = "5px";
            msg.style.zIndex = "1000";
            document.body.appendChild(msg);

            setTimeout(() => {
                msg.remove();
            }, 3000);
        }
    }

    // Adaugam event listener la fiecare buton de favorite
    document.querySelectorAll(".favorite-btn").forEach(button => {
        const cardId = button.closest(".card-item").dataset.cardId; // presupunem ca fiecare carte are un atribut `data-card-id`
        button.addEventListener("click", function () {
            toggleFavorite(this, cardId);
        });
    });

    // La încarcarea paginii, verificam dacă utilizatorul este logat si care sunt favoritele
    if (isLoggedIn()) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        document.querySelectorAll(".favorite-btn").forEach(button => {
            const cardId = button.closest(".card-item").dataset.cardId;
            if (favorites.includes(cardId)) {
                button.classList.add("active"); //adaugam clasa activa pentru favoritele deja salvate
            }
        });
    } else {
        // Dacă utilizatorul nu este logat, stergem toate favoritele din localStorage
        localStorage.removeItem("favorites");
    }
});
