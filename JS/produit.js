function getIdFromUrl() { // Fonction qui vient récupérer l'ID de notre URL.
    const params = location.search; // on vient récuperer le querystring de notre URL => la partie après le ?.
    const id = params.split("id=")[1]; // on vient enlever "id" et retourner la string qui suit donc l'id.
    return id;
}

function displayTeddy(url) { // Fonction qui vient récupérer les informations de nos produits.
    retrieveContent(url).then(response => {
        let teddy = new Teddy(response) //Instanciation de notre classe teddy.
        const div = document.createElement('div');
        div.innerHTML = teddy.displayDetails(); // Appel de la fonction présente dans notre classe teddy.
        document.getElementById('description').appendChild(div);

        const select = document.getElementById('color_select'); // Ajout du menu de selection de la couleur.
        for (let i = 0; i < teddy.color.length; i++) {
            const color = teddy.color[i];
            const option = select.appendChild(document.createElement("option"));
            option.setAttribute("value", color);
            option.textContent = color;
        }

        const selectQuantity = document.getElementById('quantity_select'); // Ajout du menu de selection de la quantité.
        for (let i = 1; i <= 10; i++) {
            const option = selectQuantity.appendChild(document.createElement("option"));
            option.textContent = i;
        }

        // récupérations données et envoie au panier
        const addTeddy = document.getElementById('add__to__cart'); // Ajout du bouton panier
        addTeddy.addEventListener("click", function (event) {
            event.preventDefault();

            // stockage des données du/des teddy souhaité dans localStorage
            let teddiesChoosen = {
                teddyName: teddy.name,
                teddyId: teddy._id,
                teddyColor: select.value,
                quantity: selectQuantity.value,
                teddyPrice: teddy.price / 100,
            };
            console.log(teddiesChoosen);

            let storedTeddies = JSON.parse(localStorage.getItem('newArticle'));
            const teddyColor = select.value;
            if (storedTeddies) {
                storedTeddies.push(teddiesChoosen);
                localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                console.log(storedTeddies);
                if (window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) {
                    window.location.href = "panier.html";
                } else {
                    window.location.href = "index.html";
                }
            } else {
                storedTeddies = [];
                storedTeddies.push(teddiesChoosen);
                localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                console.log(storedTeddies);
                if (window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) {
                    window.location.href = "panier.html";
                } else {
                    window.location.href = "index.html";
                }
            }
        });

       
    })
}

function getDetailsOfProductsToAdd() { // Fonction qui récupère les élements qu'on store dans notre local storage.
    const color = document.getElementById("color_select");
    const qte = document.getElementById("quantity_select");
    const id = document.getElementById("photo");
    const dataId = id.getAttribute('data-id');
    return {
        "id": dataId,
        "qte": parseInt(qte.value),
        "color": color.value,
    }
}


const id = getIdFromUrl();
let url = `http://localhost:3000/api/teddies/${id}`;

displayTeddy(url);