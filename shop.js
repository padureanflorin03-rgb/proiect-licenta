function addToCart(packId, basePrice) {
    const quantityInput = document.getElementById(`quantity${packId}`);
    let quantity = parseInt(quantityInput.value);

    if (quantity < 1) {
        alert("Te rog să selectezi o cantitate validă.");
        return;
    }

    const username = localStorage.getItem("username");
    if (!username) {
        alert("Trebuie să fii logat pentru a adăuga în coș.");
        return;
    }

    fetch("stoc.json")
        .then(res => res.json())
        .then(stoc => {
            const currentStock = stoc[packId];

            if (currentStock === undefined) {
                alert("❌ Pachetul nu există în stoc.");
                return;
            }

            const key = `cart_${username}`;
            let cart = JSON.parse(localStorage.getItem(key)) || [];

            const existing = cart.find(item => item.id === packId);
            const alreadyInCart = existing ? existing.quantity : 0;

            if (quantity + alreadyInCart > currentStock) {
                const ramase = currentStock - alreadyInCart;
                alert(`❌ Stoc insuficient. Mai poți adăuga doar ${ramase > 0 ? ramase : 0} bucăți din acest pachet.`);
                return;
            }

            const imageMap = {
                1: "packs/Pack1.png",
                2: "packs/Pack2.png",
                3: "packs/Pack3.png",
                4: "packs/Pack4.png"
            };

            const nameMap = {
                1: "Special Edition Pack",
                2: "Booster Pack (6 cărți)",
                3: "Mega Bundle - 3 Booster Packs",
                4: "Booster Pack (12 cărți)"
            };

            const product = {
                id: packId,
                name: nameMap[packId],
                image: imageMap[packId],
                price: basePrice,
                quantity: quantity
            };

            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push(product);
            }

            localStorage.setItem(key, JSON.stringify(cart));

            let discount = Math.min(quantity * 5, 30);
            let finalPrice = basePrice * quantity;
            finalPrice = finalPrice.toFixed(2);

            alert(`Ai adăugat ${quantity} x ${product.name} în coș.\nTotal cu reducere: ${finalPrice} $`);
        })
        .catch(() => {
            alert("❌ Nu s-a putut verifica stocul.");
        });
}

fetch("stoc.json")
    .then(res => res.json())
    .then(stoc => {
        document.querySelectorAll(".pack").forEach(pack => {
            const id = pack.dataset.packId;
            const stock = stoc[id];

            if (stock <= 0) {
                pack.classList.add("out-of-stock");
            } else {
                const stockInfo = document.createElement("p");
                stockInfo.textContent = `În stoc: ${stock}`;
                stockInfo.style.color = "green";
                stockInfo.style.fontWeight = "bold";
                pack.appendChild(stockInfo);
            }
        });
    })
    .catch(() => {
        console.error("❌ Eroare la încărcarea stocului.");
    });
