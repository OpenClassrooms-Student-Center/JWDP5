if (!localStorage.getItem('panier')) {  // Création du panier (appliqué sur chaque page js)
    localStorage.setItem('panier', JSON.stringify([]))  
};
const panierAjout = JSON.parse(localStorage.getItem('panier')); // Récupération et affichage des éléments depuis le localSorage


fetch('http://localhost:3000/api/cameras', {              // Fonction fetch pour récupérer les données avec l'url
    method: 'GET' , headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
})                                                                      

.then(response => response.json())         // L'appel de then() déclenche l'objet Promise
.then(response => {
    console.log(response);
    
    const allProduits = document.getElementById('productsContainer'); //Création du contenu HTML pour chaque Produit
    response.forEach(element => {                                   // forEach pour executer la fonction sur l'ensemble des elements

        const myDiv = document.createElement('div');            
        myDiv.className = "article col-lg-4 col-md-6 mb-4";        //Div englobant l'ensemble du produit
                                                                    
        const card = document.createElement('div');         
        card.className = "card h-100"
        myDiv.append(card);

        const img = document.createElement('img');         //Image positionné en haut de la carte produit
        img.className = "card-img-top";
        img.src = element.imageUrl;
        img.innerHTML = ` alt="${element.name}" src="${element.imageUrl}"`;
        card.append(img);

        const myDivB = document.createElement('div');       //Div d'infos générales enfant de card englobant toutes les informations du produit
        myDivB.className = "card-body";
        card.append(myDivB);

        const nom = document.createElement('h3');       // Nom du produit <h3>
        nom.textContent = element.name;
        myDivB.append(nom);

        const prix = document.createElement('h4');      //prix de produit <h4>
        prix.textContent = element.price / 100 +',00'+ " €";
        myDivB.append(prix);

        const descriptText = document.createElement('P');       //Description du produit <p>
        descriptText.textContent = element.description;
        myDivB.append(descriptText);

        const myDivEnfantB = document.createElement('div');             //Div enfant de la div précédente, englobant les 3 boutons
        myDivEnfantB.className = "d-flex justify-content-around align-items-end";
        myDivB.append(myDivEnfantB);

        const btn = document.createElement('button');           //Bouton "voir le produit"
        btn.className = "btn btn-outline-info ml-auto mr-auto";
        const lien = document.createElement('a');
        const link = document.createTextNode('Voir le produit'); // La méthode creatTextNode() sert a créer un noeud textuel (de type : text)
        myDivEnfantB.append(btn);

        lien.appendChild(link);  
        lien.href = "front/produit.html?id=" + element._id;  // lien menant vers la page du produit grâce à son _id
        btn.append(lien);

        allProduits.append(myDiv);
        
    });
})
.catch ((error) =>{
    alert ('Désolé le serveur ne répond pas ! Réessayez ultérieurement.');
})
;