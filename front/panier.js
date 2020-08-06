const apiUrl = 'http://localhost:3000/api/cameras' + '/';         // Constante apiUrl pour la partie panier

if (!localStorage.getItem('panier')) {
    localStorage.setItem('panier', JSON.stringify([]))
};

const panierAjout = JSON.parse(localStorage.getItem('panier')); // Récupération et affichage des éléments depuis le localSorage

let bigtotal = 0;           // Sous total général de l'ensemble des articles avant l'ajout des frais de port

let sousTotalPanier = document.getElementById('prixSousTotal');     // Récupération de la l'id prixSousTotal pour le prix global des articles sans les frais
let totalPanier = document.getElementById('Total');                 // Récupération de la l'id Total pour le prix net à payer

const panierUtilisateur = document.querySelector('.etatPanier');      // Récupération de la classe permettant de gérer l'etat du panier
const panierUtilisateurTitre = document.createElement('h2');          //Création d'un titre <h2> pour déclarer l'état du panier
panierUtilisateurTitre.className = ('text-center');                   // Classe pour centrer le texte h2
panierUtilisateur.appendChild(panierUtilisateurTitre);                // h2 enfant de la classe etatPanier

const corpsPanier = document.getElementById('corpsPanier');           // Récupération de l'Id corpsPanier
corpsPanier.className = 'col-lg-9 mt-3 mb-3';                         //class pour gérer le côté responsive design (Bootsrap)


if (!panierAjout.length) {      // Si panier vide :

    panierUtilisateurTitre.textContent = "Votre panier est vide !";     // On affiche le texte disant que le panier est vide

    document.querySelector('.formulaire').style.display = 'none';       // On arrête d'afficher le formulaire de commande
    document.querySelector('.soldeEtArticle').style.display = 'none';   // On arrête d'afficher le bloc solde et article   
    document.querySelector('footer').className += 'fixed-bottom';       // On fixe le footer en bas
  
}else {     // Sinon si le panier contient des articles alors :

    panierUtilisateurTitre.textContent = "Finalisez la commande !";     // Le titre <h2> sera :

    for (let i = 0; i < panierAjout.length; i++) {                  // Pour obtenir les paires clé/valeur du panier en localStorage
        
    const articleDansPanier = panierAjout[i];

    const elementId = articleDansPanier.elementId;                  // ** Creation de constante en fonction des elements à récupérer
    const elementName = articleDansPanier.elementName;
    const elementlenses = articleDansPanier.elementlenses;
    const elementQuantity = articleDansPanier.elementQuantity;
    const elementImg = articleDansPanier.elementImg;
    const elementPrice = articleDansPanier.elementPrice / 100;
    const soustotal = elementPrice * elementQuantity;

    panierAjout.forEach(article => {
        if ( article.elementId === elementId){     
            bigtotal += soustotal;
        }
        console.log(bigtotal);
    });


    const carteArticle = document.createElement ('div');            // Div principale pour stocker chaques article indiviuellement
    carteArticle.className = 'cartes d-flex mb-3 border-bottom';
    corpsPanier.append(carteArticle);

    const carteArticleEnfant = document.createElement ('div');      // Div2 enfant de la précédente gérant le côté responsive design
    carteArticleEnfant.className = 'col-lg-6';
    carteArticle.append(carteArticleEnfant);

    const image = document.createElement('img');                    // Création et récupération de l'image
    image.className = "img-fluid mb-3";
    image.src = elementImg;
    image.innerHTML = ` alt="${elementName}" src="${elementImg}"`;
    carteArticleEnfant.append(image);

    const carteArticleEnfantSecond = document.createElement ('div');       // Div3 enfant de la Div principale, contenant l'ensemble des informations et leur côté responsive design
    carteArticleEnfantSecond.className = 'infosArticle col-lg-6 d-flex flex-column align-self-center justify-content-around ml-5';
    carteArticle.append(carteArticleEnfantSecond);

    const nom = document.createElement ('h3');          // Création d'un titre <h3> et récupération du nom de l'article
    nom.className = 'p-2';
    nom.textContent += elementName;
    carteArticleEnfantSecond.append(nom);

    const lenseschoix = document.createElement ('p');       // Création d'un paragraphe indiquant la lentille sélectionnée
    lenseschoix.className = 'p-2 font-weight-bold';
    lenseschoix.innerHTML += "Lentilles : " + elementlenses;
    carteArticleEnfantSecond.append(lenseschoix);
        
    const divQuantite = document.createElement ('div');
    divQuantite.className = 'd-flex p-2';
    carteArticleEnfantSecond.append(divQuantite);

    const btnAjout = document.createElement ('button');             // Bouton d'ajout au panier
    btnAjout.className = "ajouter btn btn-outline-secondary";
    divQuantite.append(btnAjout);

    const imgAjout = document.createElement ('i');          //image d'ajout panier
    imgAjout.className = "fas fa-cart-plus";
    btnAjout.append(imgAjout);

    const quantite = document.createElement ('p');       // Création d'un paragraphe <p> et récupération de la quantité d'un même article
    quantite.className = 'font-weight-bold ml-3 mr-3 my-auto';
    quantite.textContent += elementQuantity;
    divQuantite.append(quantite);

    const btnRetirer = document.createElement ('button');       //Bouton pour retirer le(s) produit(s)
    btnRetirer.className = "retirer btn btn-outline-secondary";
    divQuantite.append(btnRetirer);

    const imgMoins = document.createElement ('i');      //image associé au bouton "retirer"
    imgMoins.className = "fas fa-minus-square";
    btnRetirer.append(imgMoins);

    const prixUnitaire = document.createElement ('h4');      // Création d'un titre <h4> et récupération du prix du groupe d'un même article
    prixUnitaire.className = 'p-2';
    prixUnitaire.textContent += " Prix : " + elementPrice + ' €'; 
    carteArticleEnfantSecond.append(prixUnitaire);


    const sousTotalArticle = document.createElement ('h4');      // Création d'un titre <h4> et récupération du prix du groupe d'un même article
    sousTotalArticle.className = 'p-2';
    sousTotalArticle.textContent += " Total : " + soustotal + ' €'; 
    carteArticleEnfantSecond.append(sousTotalArticle);

    const supprimerArticle = document.createElement('button');       // Création d'un Bouton pour pouvoir supprier le(s) article(s)
    supprimerArticle.className = "btn btn-sm btn-outline-danger w-25 m-2 ";
    carteArticleEnfantSecond.append(supprimerArticle);

    const imgSupprimer = document.createElement ('i');              // image du bouton de suppression
    imgSupprimer.className = 'fa fa-trash';
    supprimerArticle.append(imgSupprimer);

    btnRetirer.addEventListener('click', function () {      //Evenement click sur le bouton (-) 
        if( articleDansPanier.elementQuantity > 1 ){
        articleDansPanier.elementQuantity --;
        }
        localStorage.setItem('panier', JSON.stringify(panierAjout));
        document.location.reload()
    });

    btnAjout.addEventListener('click', function () {      //Evenement click sur le bouton (+)
        articleDansPanier.elementQuantity ++;
        localStorage.setItem('panier', JSON.stringify(panierAjout));
        document.location.reload()
    });

    supprimerArticle.addEventListener('click', function () {      //Evenement click sur le bouton de suppression
        carteArticle.parentNode.removeChild(carteArticle);      // Supressions de l'article
        panierAjout.splice(i, 1); // La méthode splice() modifie le contenu d'un tableau en retirant et/ou en ajoutant des éléments
        localStorage.setItem('panier', JSON.stringify(panierAjout));
        document.location.reload(true) // La méthode location.reload recharge la page, équivalent au clic sur le bouton Actualiser la page du navigateur
    });

    sousTotalPanier.textContent = bigtotal + '.00 €';

    totalPanier.textContent = bigtotal + 9.99 + ' €';

    panierAjout.forEach(article => {
        if ( article.elementId === elementId){     
            bigtotal == soustotal;
        }
        console.log(bigtotal);
    });
        
    };
    

};