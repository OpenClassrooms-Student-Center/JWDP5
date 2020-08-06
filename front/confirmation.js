const url = new URL(window.location.href);// Cette objet retourne l'url de la page actuel
const Params = new URLSearchParams(url.search);  // récupère params via url.search (doc.dev-moz)

const orderId = Params.get("orderId");
const orderName = Params.get("nom");
const orderFirstName = Params.get("prenom");
const orderTotal = Params.get("bigTotal");

const confirmation = document.getElementById('confirmation');

const responseMessage = document.createElement('span');
const thanksMessage = document.createElement('p');
thanksMessage.innerHTML = `Merci pour votre commande cher ${orderName} ${orderFirstName} !`;
const totalMessage = document.createElement('p');
totalMessage.innerHTML = `Le montant de votre commande est ${orderTotal},00€`;
const numeroCommande = document.createElement('p');
numeroCommande.innerHTML = `Votre numéro de commande est : ${orderId} ` ;

confirmation.append(responseMessage);
confirmation.append(thanksMessage);
confirmation.append(totalMessage);
confirmation.append(numeroCommande);

localStorage.clear(); // Vide le localStorage à la fin de la commande