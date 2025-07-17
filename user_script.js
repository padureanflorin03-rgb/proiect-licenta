<script>
    const userIcon = document.querySelector(".user-icon");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    userIcon.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // inchide meniul cand utilizatorul da click in afara lui
    document.addEventListener("click", (e) => {
        if (!userIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.style.display = "none";
        }
	document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("isLoggedIn") === "true") {
        console.log("Utilizator logat:", localStorage.getItem("username"));
    } else {
        console.log("Utilizator nelogat.");
    }
	});

    });
</script>
