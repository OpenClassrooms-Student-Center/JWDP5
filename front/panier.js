const apiUrl = 'http://localhost:3000/api/cameras' + '/';         // Constante apiUrl pour la partie panier

if (!localStorage.getItem('panier')) {
    localStorage.setItem('panier', JSON.stringify([]))
};

const panierAjout = JSON.parse(localStorage.getItem('panier')); // Récupération et affichage des éléments depuis le localSorage

let bigtotal = 0;           // Sous total général de l'ensemble des articles avant l'ajout des frais 

let sousTotalPanier = document.getElementById('prixSousTotal');     // Récupération de la l'id prixSousTotal pour le afficherprix global des articles sans les frais
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

    for (let i = 0; i < panierAjout.length; i++) 
    {                  // Pour obtenir les paires clé/valeur du panier en localStorage
        
    const articleDansPanier = panierAjout[i];

    const elementId = articleDansPanier.elementId;                  // ** Creation de constante en fonction des elements à récupérer
    const elementName = articleDansPanier.elementName;
    const elementlenses = articleDansPanier.elementlenses;
    const elementQuantity = articleDansPanier.elementQuantity;
    const elementImg = articleDansPanier.elementImg;
    const elementPrice = articleDansPanier.elementPrice / 100;
    const soustotal = elementPrice * elementQuantity;

    panierAjout.forEach(article => {                // Pour l'ensemble des elements du panier on va vérifier si  
        if ( article.elementId === elementId && article.elementlenses === elementlenses){     
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

    sousTotalPanier.textContent = bigtotal + '.00 €';       // Le sous total du panier correspond au bigtotal

    let montantTotal = bigtotal + 9.99;

    totalPanier.textContent = montantTotal + ' €';       //Le total du panier correspond au bigtotal et les frais de livraisons
    
    localStorage.setItem('prixTotal', montantTotal);    //Enregistrement du prix total dans le localStorage
    
    };

    checkPanier = () => {
        if (panierAjout > 0) { // Si panier il y a au moins un produit
            panierAjout.forEach(produit => { // Chaque produit est envoyés vers l'Api
                products.push(produit.elementId); // Insertion des produits dans le tableau products envoyé à l'Api
            });
            console.log(products);
            return true;
        } else {
            console.log('Panier vide');
            return false;
        };
    };


    // Partie formulaire

    //Récupération des informations des inputs

    let nomInput = document.getElementById("nom");
    let prenomInput = document.getElementById("prenom");
    let emailInput = document.getElementById("email");
    let adresseInput = document.getElementById("adresse");
    let villeInput = document.getElementById("ville");

    let formatInfosNom = document.getElementById("formatInfosNom");
    let formatInfosPrenom = document.getElementById("formatInfosPrenom");
    let formatInfosVille = document.getElementById("formatInfosVille");
    let formatInfosTest = /^[a-zA-Z ,.'-]+$/;

    let formatInfosMail = document.getElementById('formatinfosMail');
    let FormatMailValid = /^[a-z0-9._-]+@[a-z0-9.-]{2,}[.][a-z]{2,3}$/;

    let formatInfosAdresse = document.getElementById('formatInfosAdresse');
    let formatAdresseValide = /[0-9a-zA-Z]{1,3}[a-z ,.'-]+$/;

    const btnValider = document.getElementById('valider');
    console.log(btnValider);

    let products = [];      // informations necessaires pour la confirmation de commande
    let contact;
    
    btnValider.addEventListener('click', function (event) {  
    
        event.preventDefault();

        if (formatInfosTest.test(nomInput.value) == false){             // Vérification de la validité de chaque elements du formulaire
            formatInfosNom.textContent = "Format de votre nom incorrect";
            formatInfosNom.style.color = 'red';
            return event.preventDefault();
        }
        else if (formatInfosTest.test(prenomInput.value) == false){
            formatInfosPrenom.textContent = "Format de votre prénom incorrect";
            formatInfosPrenom.style.color = 'red';
            return event.preventDefault();
        }
        else if (formatInfosTest.test(villeInput.value) == false){
            formatInfosVille.textContent = "Format de votre Ville incorrect";
            formatInfosVille.style.color = 'red';
            return event.preventDefault();
        }
        else if (FormatMailValid.test(emailInput.value) == false){
            formatInfosMail.textContent = "Format de votre email incorrect";
            formatInfosMail.style.color = 'red';
            return event.preventDefault();
        }
        else if (formatAdresseValide.test(adresseInput.value) == false){
            formatInfosAdresse.textContent = "Format de votre adresse incorrect";
            formatInfosAdresse.style.color = 'red';
            return event.preventDefault();
        }
        contact = {
            firstName: nomInput.value,
            lastName: prenomInput.value,
            address: adresseInput.value,
            city: villeInput.value,
            email: emailInput.value
        };

        donneesAttendu({contact: contact, products: products}); // Appel de la fonction

    });

    

    const donneesAttendu = async function (data){

        try{        //instruction permettant de tester un bloc de code pour les erreurs     
            
            let response = await fetch (apiUrl + "order", {     //fetch pour envoyer les infos au serveurs avec POST
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'          // Indique quel type de données vont être envoyées
                },
                body: JSON.stringify(data)                      // converti la valuer Javascript en chaîne JSON.
            })
            if(response.ok){                            // Si aucun problémes rencontré alors:
                let data = await response.json();       // Attendre la reponse au format JSON
                localStorage.setItem("orderId", JSON.stringify(data.orderId));      //Enregistrement des infos dans localStorage pour la page confirmation de commande
                localStorage.setItem("firstName", JSON.stringify(data.contact.firstName));
                localStorage.setItem("lastName", JSON.stringify(data.contact.lastName));
                window.location.href = "./confirmation-de-commande.html";       // Window.location utilisé pour charger la page confirmation 
                console.log(data)
                alert('Validation de votre commande !');
            }
            else{                                       // Sinon renvoyer un message d'erreur dans la console
                console.error('Retour du serveur :', response.status)
                alert('Retour du serveur :'+ response.status);
            }
        }
        catch (erreur){         //instruction permettant de gérer l'erreur.
           alert ('Désolé le serveur ne répond pas ! Réessayez ultérieurement.')
        }
    };
    
};
    