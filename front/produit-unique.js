if (!localStorage.getItem('panier')){
    localStorage.setItem('panier', JSON.stringify([]))
};
const panierAjout = JSON.parse(localStorage.getItem('panier')); // Récupération et affichage des éléments depuis le localSorage


const url = new URL(window.location.href);      //URLSearchParams() constructor créér et retourne un nouvel objet URLSearchParams qui va retourner l'url de la page actuel
const Params = new URLSearchParams(url.search);  // récupère params via url.search

const elementId = Params.get('id'); // récupération de l'id du produit

async function adress(url) {  
    let result = await fetch(url);            
    return result.json();
};



adress('http://localhost:3000/api/cameras' + '/' + elementId)
    .then(element => { 
    console.log(element);                                                                   // element désigne chaque camera

    // Construction de la page du produit

    const pageProduitCameras = document.getElementById('article__camera');
    pageProduitCameras.className = "w-75"
    const nom = document.getElementById('camera-name');
    const prix = document.getElementById('prix');
    const description = document.getElementById('description');

    const image = document.createElement('img');        //image du produit
    image.className = 'img-fluid rounded';
    image.src = element.imageUrl;
    image.innerHTML = ` alt="${element.name}" src="${element.imageUrl}" `;
    pageProduitCameras.append(image);

    prix.innerHTML = element.price / 100 + ',00' +" €";         // Prix du produit
    nom.innerHTML = element.name;
    description.innerHTML = "<strong>Description : </strong>" + "<br> <br>" + element.description + "<br>" + element.description + " " + element.description + "<br>";

    const chooselenses = document.getElementById('chooselenses');  // selection lentilles

    for (let i = 0; i < element.lenses.length; i++) {     // Boucle pour les lentilles disponibles 
        const lentilles = element.lenses[i];
        const mylenses = document.createElement('option');
        chooselenses.append(mylenses);
        mylenses.textContent = lentilles;
        mylenses.value = lentilles;
    }

    const panier = document.getElementById('panier');       // Bouton du panier

    const btnPanier = document.createElement('button');     // Bouton pour ajouter l'article au panier
    btnPanier.className = "btn btn-outline-info ml-auto mr-auto";
    btnPanier.innerHTML = 'Ajouter au panier';
    panier.append(btnPanier);

    // l'objet Event fournit une multitude d'informations sur l'événement actuellement déclenché, ici il se récupère dans l'argument "ajout"

    btnPanier.addEventListener('click', function (ajout) {

        ajout.preventDefault();         // Annule l'action par defaut du bouton .         

        const panierAjout = JSON.parse(localStorage.getItem('panier')); // Récupération et affichage des éléments depuis le localSorage

        let elementlenses = chooselenses.options[chooselenses.selectedIndex].value;     // Permet de récupérer les valeurs d'une selection multiple (ici les lentilles)

        // La méthode find() permet de récupérer dans le tableau le premier produit qui correspond au id et a la lentille sélectionnée
        let elementDuPanier = panierAjout.find(camera => {
            return camera.elementId == elementId && camera.elementlenses == elementlenses;
        });
        console.log(elementDuPanier);

        if (elementDuPanier == undefined) {
            let elementImg = element.imageUrl;
            let elementName = element.name;
            let elementPrice = element.price;
            let elementQuantity = 1;
            panierAjout.push({elementImg,elementId, elementName, elementlenses, elementPrice, elementQuantity}); // Ajout du produit dans le localStorage
        } else {
            panierAjout.forEach(produit => {
                if (produit.elementId === elementId) {
                    produit.elementQuantity++
                }
            });
            console.log('ok')
        }

        localStorage.setItem('panier', JSON.stringify(panierAjout));

        window.location.href = 'panier.html'

    });
    
    
}
)
.catch ((error) =>{
    alert ('Désolé le serveur ne répond pas ! Réessayez ultérieurement.');
});

