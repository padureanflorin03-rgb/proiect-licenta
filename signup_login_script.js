<script>
    const signupForm = document.getElementById("signupForm");
    const signupMessage = document.getElementById("signupMessage");

    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(signupForm);

        const response = await fetch("signup.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            signupMessage.textContent = result.message;
            signupMessage.style.color = "green";

            // redirectioneaza utilizatorul 
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            signupMessage.textContent = result.message;
            signupMessage.style.color = "red";
        }
    });
</script>
