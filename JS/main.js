const url = `http://localhost:3000/api/teddies/`;
const productsContainer = document.getElementById('produits');
const descriptionContainer = document.getElementById('description');



function getFromTeddy() { // Fonction qui vient appeler la fonction display teddy pour chaque item de la réponse.
    retrieveContent(url).then(teddies => {
         const div = document.createElement('div');
        div.classList.add("row"); // Ajoute la classe row à l'élément
        for (let teddy of teddies) {
            let teddyCard = displayTeddy(teddy);
            div.appendChild(teddyCard);
        }
        productsContainer.appendChild(div);

    });
}

function displayTeddy(teddy) { // Fonction qui vient créer un div et ajouter les élements de notre classe Teddy.
    let newTeddy = new Teddy(teddy); //instanciation de la classe Teddy
    const div = newTeddy.displayInList(); //appel de la fonction displayInList présente dans la class teddy.
    div.classList.add("col-lg-3"); // Ajoute la classe col à l'élément
    div.querySelector('button').addEventListener('click', addProductDetailButtonListener);
    return div;
}



function addProductDetailButtonListener(e) { //Fonction qui vient ajouter un eventlistener sur nos buttons.
    let button = e.currentTarget;
    window.location.href = 'produits.html?id=' + button.dataset.id;
    }

getFromTeddy(url);





