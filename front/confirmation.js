document.querySelector('footer').className += 'fixed-bottom';       // On fixe le footer en bas

const montantTotal = JSON.parse(localStorage.getItem('prixTotal')); // Récupération du prix total
const orderId = JSON.parse(localStorage.getItem('orderId')); // Récupération du prix total
const nom = JSON.parse(localStorage.getItem('firstName')); // Récupération du prix total
const prenom = JSON.parse(localStorage.getItem('lastName')); // Récupération du prix total

const confirmation = document.getElementById('confirmation');

const titreConfirmation = document.createElement('h2');
titreConfirmation.className = 'display-5 m-3';
titreConfirmation.innerHTML = 'Confirmation de commande ';
confirmation.append(titreConfirmation);

const imgValidation = document.createElement ('i');          //image de validation
imgValidation.className = "fas fa-check";
titreConfirmation.append(imgValidation);

const thanksMessage = document.createElement('p');
thanksMessage.innerHTML = nom + " " + prenom + " " +  `toute l'équipe vous remercie pour votre commande!`;
confirmation.append(thanksMessage);

const totalMessage = document.createElement('p');
totalMessage.innerHTML = "Le montant de votre commande est de " + montantTotal + "€";
confirmation.append(totalMessage);


const numeroCommande = document.createElement('p');
numeroCommande.innerHTML = "Votre numéro de commande est le : " + orderId ;
confirmation.append(numeroCommande);

const retourAccueil = document.createElement ('button');
retourAccueil.className = 'mb-4 btn btn-success';
retourAccueil.innerHTML = "Retour à l'accueil";
confirmation.append(retourAccueil);


retourAccueil.addEventListener('click', function () {      //Evenement click sur le bouton de retour a l'acceuil
    localStorage.clear();                       // Vide le localStorage à la fin de la commande
    window.location.href = "../index.html";      
});




