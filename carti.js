document.addEventListener("DOMContentLoaded", function () {
    console.log("Pagina a fost încărcată complet!");

    const cardContainer = document.getElementById("cardContainer");
    const paginationContainer = document.getElementById("pagination");
    const sortButton = document.getElementById("applySortButton");
    const sortOptions = document.getElementById("sortOptions");
    let cards = Array.from(document.querySelectorAll(".card-item"));
    const cardsPerPage = 10;
    let currentPage = 1;
    let totalPages = Math.ceil(cards.length / cardsPerPage);

    // Verificam daca elementele exista înainte de a le manipula
    if (!cardContainer || !paginationContainer || !sortButton || !sortOptions) {
        console.error("Unele elemente necesare nu au fost găsite în DOM.");
        return; // Oprim executia scriptului daca elementele nu exista
    }

    function showPage(page) {
        cards.forEach(card => card.style.display = "none");
        const startIndex = (page - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        cards.slice(startIndex, endIndex).forEach(card => card.style.display = "block");
        updatePagination();
    }

    function updatePagination() {
        paginationContainer.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button");
            pageButton.textContent = i;
            pageButton.classList.add("page-button");
            if (i === currentPage) pageButton.classList.add("active");
            pageButton.addEventListener("click", function () {
                currentPage = i;
                showPage(currentPage);
            });
            paginationContainer.appendChild(pageButton);
        }
    }

    function sortCards(criteria) {
        if (criteria === "attack") {
            cards.sort((a, b) => parseInt(b.getAttribute("data-attack")) - parseInt(a.getAttribute("data-attack")));
        } else if (criteria === "defense") {
            cards.sort((a, b) => parseInt(b.getAttribute("data-defense")) - parseInt(a.getAttribute("data-defense")));
        } else if (criteria === "location") {
            cards.sort((a, b) => a.getAttribute("data-location").localeCompare(b.getAttribute("data-location")));
        }

        // Reconstruim cardContainer cu ordinea corecta
        cardContainer.innerHTML = "";
        cards.forEach(card => cardContainer.appendChild(card));

        totalPages = Math.ceil(cards.length / cardsPerPage);
        currentPage = 1;
        showPage(currentPage);
    }

    if (sortButton) {
        sortButton.addEventListener("click", () => {
            const criteria = sortOptions.value;
            sortCards(criteria);
        });
    }

    document.getElementById("searchButton")?.addEventListener("click", () => {
        const searchValue = document.getElementById("searchInput").value.toLowerCase();
        let foundIndex = -1;

        cards.forEach((card, index) => {
            const cardName = card.querySelector("h2").textContent.toLowerCase();
            if (cardName.includes(searchValue)) {
                foundIndex = index;
            }
        });

        if (foundIndex !== -1) {
            currentPage = Math.ceil((foundIndex + 1) / cardsPerPage);
            showPage(currentPage);

            setTimeout(() => {
                const foundCard = cards[foundIndex];
                foundCard.scrollIntoView({ behavior: "smooth", block: "center" });

                foundCard.style.border = "3px solid #007BFF";
                setTimeout(() => foundCard.style.border = "", 2000);
            }, 300);
        } else {
            alert("Nu s-a găsit nicio carte cu acest nume.");
        }
    });

    // functie pentru navigarea la categorii (carti Speciale, Carti normale, Spells)
    function goToCategory(categoryId) {
        // Resetăm sortarea la ordinea initiala
        cards.sort((a, b) => parseInt(a.getAttribute("data-index")) - parseInt(b.getAttribute("data-index")));

        // Mutam cartile din categoria selectată în fata
        const sortedCards = [
            ...cards.filter(card => card.id === categoryId),
            ...cards.filter(card => card.id !== categoryId)
        ];

        cardContainer.innerHTML = "";
        sortedCards.forEach(card => cardContainer.appendChild(card));

        cards = sortedCards;
        totalPages = Math.ceil(cards.length / cardsPerPage);
        currentPage = 1;
        showPage(currentPage);

        const firstCard = sortedCards.find(card => card.id === categoryId);
        if (firstCard) {
            setTimeout(() => {
                firstCard.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 300);
        }
    }

    document.querySelector("a[href='#speciale']")?.addEventListener("click", function (e) {
        e.preventDefault();
        goToCategory("speciale");
    });

    document.querySelector("a[href='#normale']")?.addEventListener("click", function (e) {
        e.preventDefault();
        goToCategory("normale");
    });

    document.querySelector("a[href='#spells']")?.addEventListener("click", function (e) {
        e.preventDefault();
        goToCategory("spells");
    });

    const style = document.createElement("style");
    style.innerHTML = `
        #pagination {
            text-align: center;
            margin-top: 20px;
        }
        .page-button {
            padding: 8px 12px;
            margin: 5px;
            border: none;
            background: #007BFF;
            color: white;
            cursor: pointer;
            border-radius: 5px;
        }
        .page-button.active {
            background: #004C99;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);

    showPage(currentPage);
});

function toggleFavorite(button) {
    console.log("Buton de favorite apăsat!"); // Test
    button.classList.toggle("active");
}
