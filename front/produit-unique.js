if (!localStorage.getItem('panier')) { // getItem pour Lire/Récupération une donnée
    localStorage.setItem('panier', JSON.stringify([])) // setItem pour Enregistrer/Stocker une donnée
}


//URLSearchParams() constructor créée et retourne un new objet URLSearchParams
const url = new URL(window.location.href);// Cette objet retourne l'url de la page actuel
const Params = new URLSearchParams(url.search);  // récupère params via url.search (doc.dev-moz)

const elementId = Params.get('id'); // récupère l'id du produit

async function adress(url) {  // fonction async/await. Le mot clef async devant une fonction va faire que la fonction en question va toujours retourner une promesse.
    let result = await fetch(url)
    return result.json()
}



adress('http://localhost:3000/api/cameras' + '/' + elementId).then(element => { // element désigne chaque teddy
    console.log(element)

    // Construction de la page du produit

    const pageProduitCameras = document.getElementById('article__camera-1');
    const nom = document.getElementById('camera-name');
    const prix = document.getElementById('prix');
    const description = document.getElementById('description');

    const image = document.createElement('img');
    image.className = 'img-fluid';
    image.src = element.imageUrl;
    image.innerHTML = ` alt="${element.name}" src="${element.imageUrl}" `;
    pageProduitCameras.append(image);

    prix.innerHTML = element.price / 100 + "€";
    nom.innerHTML = element.name;
    description.innerHTML = "<strong>Description : </strong>" + "<br>" + element.description + "<br> <br>" + element.description + " " + element.description + "<br> <br>" + element.description;

    const chooselenses = document.getElementById('chooselenses');  // selection couleur
    console.log(element);

    for (let i = 0; i < element.lenses.length; i++) {     // Boucle pour les couleurs disponibles par article
        const couleur = element.lenses[i];
        const mylenses = document.createElement('option');
        chooselenses.append(mylenses);
        mylenses.textContent = couleur;
        mylenses.value = couleur;
    }


    // Bouton Panier

    const panier = document.getElementById('panier')

    const btnPanier = document.createElement('button');
    btnPanier.className = "btn btn-outline-info ml-auto mr-auto";
    btnPanier.innerHTML = 'Ajouter au panier';
    panier.append(btnPanier);


    // l'objet Event fournit une multitude d'informations sur l'événement actuellement déclenché, ici il se récupère dans l'argument "ajout"
    btnPanier.addEventListener('click', function (ajout) {

        ajout.preventDefault() // Fait en sorte que l’action par défaut de l'évènement ne soit pas prise en compte par le navigateur.

        const panierAjout = JSON.parse(localStorage.getItem('panier')); // Récupération et affichage des éléments depuis le localSorage

        // Permet de récupérer les valeurs d'un select multiple ici les couleurs
        let elementlenses = chooselenses.options[chooselenses.selectedIndex].value;

        // La méthode find() permet de récupérer dans le tableau le premier produit qui correspond au id et a la couleur sélectionnée
        let elementDuPanier = panierAjout.find(teddy => {
            return teddy.elementId == elementId && teddy.elementlenses == elementlenses
        });
        console.log(elementDuPanier);

        if (elementDuPanier == undefined) {
            let elementName = element.name;
            let elementPrice = element.price;
            let elementQuantity = 1;
            panierAjout.push({elementId, elementName, elementlenses, elementPrice, elementQuantity}); // Ajout du produit dans le localStorage
        } else {
            panierAjout.forEach(produit => {
                if (produit.elementId === elementId) {
                    produit.elementQuantity++
                }
            });
            console.log('ok')
        }

        localStorage.setItem('panier', JSON.stringify(panierAjout));
        ajout.target.innerHTML = 'Article ajouté'; // Target modifie le contenu de l'élément qui a été déclenché/cliqué

        window.location.href = './panier.html'

    });


    /*function onLoadCartNumbers() { // Affiche le nombre d'article dans le panier sur chaque page

        const panierAjout = JSON.parse(localStorage.getItem('panier'));

        if (panierAjout) {
            document.querySelector('.menuPanier span').textContent = panierAjout;
        }
    }*/

    //onLoadCartNumbers();



});