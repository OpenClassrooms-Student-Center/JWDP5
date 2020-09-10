const url = `http://localhost:3000/api/teddies/`;

function getFromTeddy() { // Fonction qui vient appeler la fonction display teddy pour chaque item de la réponse.
    retrieveContent(url).then(teddies => {
        for (let teddy of teddies) {
            displayTeddy(teddy);
        }
        addClickListenerToButton();
    });
}

function displayTeddy(teddy) { // Fonction qui vient créer un div et ajouter les élements de notre classe Teddy.
    let newTeddy = new Teddy(teddy); //instanciation de la classe Teddy
    const div = document.createElement('div');
    div.classList.add("card"); // Ajoute la classe card à l'élément
    div.classList.add("col-lg-3"); // Ajoute la classe col à l'élément
    div.innerHTML = newTeddy.displayInList(); //appel de la fonction displayInList présente dans la class teddy.
    document.getElementById('produits').appendChild(div);
}



function addClickListenerToButton() { //Fonction qui vient ajouter un eventlistener sur nos buttons.
    const buttons = Array.from(document.getElementsByClassName('btn')); // on vient créer un tableau avec nos boutons.
    buttons.forEach(button => { // pour chaque bouton on vient ajouter l'eventListener qui nous redirigera vers la page du produit grâce à l'ID produit.
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const redirect = `produit.html`;
            location.assign(redirect + `?id=${id}`);
        })
    })
}

getFromTeddy(url);

async function retrieveContent(url) { //Fonction asynchrone qui va récuperer la reponse de l'API.
    const response = await fetch(url);
    return response.json();
}