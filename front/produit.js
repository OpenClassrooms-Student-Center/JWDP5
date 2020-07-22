if (!localStorage.getItem('panier')) {  // Création du panier (appliqué sur chaque page js)
    localStorage.setItem('panier', JSON.stringify([]))
    
}

// Fonction fetch avec url pour effectuer une requête GET afin de récupérer les données précises
fetch('https://oc-p5-api.herokuapp.com/api/cameras', {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
})

.then(response => response.json())         // L'appel de then() déclenche l'objet Promise
.then(response => {
    console.log(response)
    
    const allProduits = document.getElementById('productsContainer');
    response.forEach(element => {                        //Création contenu HTML pour chaque Produit

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
        prix.textContent = element.price / 100 + "€";
        myDivB.append(prix);

        const descriptText = document.createElement('P');       //Description du produit <p>
        descriptText.textContent = element.description;
        myDivB.append(descriptText);

        const myDivEnfantB = document.createElement('div');             //Div enfant de la div précédente, englobant les 3 boutons
        myDivEnfantB.className = "d-flex justify-content-around align-items-end";
        myDivB.append(myDivEnfantB);

        const btnAjout = document.createElement ('button');             // Bouton d'ajout au panier
        btnAjout.className = "ajouter btn btn-outline-secondary";
        myDivEnfantB.append(btnAjout);

        const imgAjout = document.createElement ('i');          //image d'ajout panier
        imgAjout.className = "fas fa-cart-plus";
        btnAjout.append(imgAjout);

        const btn = document.createElement('button');           //Bouton "voir le produit"
        btn.className = "btn btn-outline-info ml-auto mr-auto";
        const lien = document.createElement('a');
        const link = document.createTextNode('Voir le produit'); // La méthode creatTextNode() sert a créer un noeud textuel (de type : text)
        myDivEnfantB.append(btn);
        
        const btnRetirer = document.createElement ('button');       //Bouton pour retirer le produit
        btnRetirer.className = "retirer btn btn-outline-secondary";
        myDivEnfantB.append(btnRetirer);

        const imgMoins = document.createElement ('i');      //image associé au bouton "retirer"
        imgMoins.className = "fas fa-minus-square";
        btnRetirer.append(imgMoins);

        lien.appendChild(link);  
        lien.href = "../front/produit.html?id=" + element._id;  // lien menant vers la page du produit grâce à son _id
        btn.append(lien);

        allProduits.append(myDiv);

        // On écoute l'événement click 
        btnAjout.addEventListener('click',function(event){ 
          nombreArticlePanier ++;     // on ajouter 1 au panier au clique 
          affichagePanier.innerHTML =  nombreArticlePanier;   // on affiche le nombre d'articles du panier apres l'ajout
          if (nombreArticlePanier > 1){
          articlepluriel.innerHTML = 'Articles';
          }
          else{
          articlepluriel.innerHTML = 'Article';
          };
          });

          // On écoute l'événement click 
          btnRetirer.addEventListener('click',function(event){ 
            nombreArticlePanier --;     // on ajouter 1 au panier au clique 
            affichagePanier.innerHTML =  nombreArticlePanier;   // on affiche le nombre d'articles du panier apres l'ajout
            if (nombreArticlePanier > 1){
            articlepluriel.innerHTML = 'Articles';
          }
          else{
          articlepluriel.innerHTML = 'Article';
          };
          });
    });
});

let nombreArticlePanier =  0;            // variable pour connaître le nombre d'article dans le panier

let affichagePanier = document.getElementById('affichagePanier'); // variable pour afficher le nombre d'artile(s)
affichagePanier.innerHTML =  nombreArticlePanier ; 


let articlepluriel = document.getElementById('articlepluriel');           // variable pour passer Article au pluriel quand il y as plus d'un article
articlepluriel.innerHTML = 'Article';
