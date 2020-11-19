/*Récuparation du contenu du panier
---------------------------------------------------------*/
addition = () =>{
    //Vérifie si un prduit est dans le panier
    if(JSON.parse(localStorage.getItem("userPanier")).length > 0){
      //S'il n'est pas vide on supprime le message et on créé le tableau récapitulatif
      document.getElementById("panierVide").remove();
 }
  };
  let products=[];
 /*création du tableau panier
 ******************************************************************************/
  function userPanier(){

  	const panier=document.getElementById('panier');
/*   construction du bloc htlm pour le tableau de facturation

		<div id="panier">
			 <table class="table">
                   
                        <tr>
                            <th>Article</th>
                            <th>Prix</th>
                            <th>Quantité</th>
                            <th>Total</th>
                        </tr>
                            <td id="article"></td>
                            <td id="prix"></td>
                            <td id="nombre"></td>
                            <td id="total"></td>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr id="totaux">
                        	<th>Total</th>
                        	<td id="montant"></td>
                        </tr>
             </table> 
        </div>      
                        -------------------------------*/
const tableau=document.createElement('table');
const ligneTableau=document.createElement('tr');
const colonneNom=document.createElement('th');
const colonnePrix=document.createElement('th');
const colonneNombre=document.createElement('th');
const colonneRefTotal =document.createElement("th");

tableau.classList.add("table");
/*Placement du contenu dans la page html
                       ----------------------------------*/
panier.appendChild(tableau);
tableau.appendChild(ligneTableau);
ligneTableau.appendChild(colonneNom);
ligneTableau.appendChild(colonnePrix);
ligneTableau.appendChild(colonneNombre);
ligneTableau.appendChild(colonneRefTotal);

colonneNom.textContent="Nom de l'article";
colonnePrix.textContent="Prix Unitaire";
colonneNombre.textContent="Quantité";
colonneRefTotal.textContent="Total";

let total=0;
let quantite=0;
JSON.parse(localStorage.getItem("userPanier")).forEach((produit)=>{
  products.push(produit._id);
/*Création de la ligne produit
                       -----------------------------------*/
        let ligneProduit = document.createElement("tr");
        let nomProduit = document.createElement("td");
        let prixUnitProduit = document.createElement("td");
        let nombreProduit=document.createElement("td");
        let prixTotalProduit=document.createElement("td");

/*Insertion dans le HTML
                      -----------------------------------*/
        tableau.appendChild(ligneProduit);
        ligneProduit.appendChild(nomProduit);
        ligneProduit.appendChild(prixUnitProduit);
        ligneProduit.appendChild(nombreProduit);
        ligneProduit.appendChild(prixTotalProduit);
/*Contenu des lignes produits
                       ----------------------------------*/
        nomProduit.innerHTML=produit.nom;
        prixUnitProduit.textContent=produit.prix;
        nombreProduit.textContent=produit.quantite;
        total=total+(produit.prix*produit.quantite);
        quantite=quantite+parseInt(produit.quantite);
        prixTotalProduit.textContent=produit.prix*produit.quantite;
 });
/*Création ligne total
                        -------------------------------------*/
		let ligneTotal=document.createElement("tr");
		let totalFinal=document.createElement("th");
		let totalQuantite=document.createElement("td");
		let prixTotalProduit=document.createElement("td");
		let final=document.createElement("td");
/*Insertion HTML
                        -------------------------------------*/
		tableau.appendChild(ligneTotal);
		ligneTotal.appendChild(totalFinal);
		ligneTotal.appendChild(prixTotalProduit);
		ligneTotal.appendChild(totalQuantite);
		ligneTotal.appendChild(final);
/*Contenu ligne total
                        --------------------------------------*/
	totalFinal.textContent="Total";
	final.textContent=total;
	totalQuantite.textContent=quantite;
 };
 userPanier();
 console.log(userPanier);
                       /*********************************************/

 /*Création formaulaire
                        ----------------------------------------*/
function userFormulaire(){

const div=document.getElementById('info');

div.classList.add("display_page_panier");

const elt=document.getElementById('confirmation');

 /*Création de l'évènement*/
elt.addEventListener('submit',function(event){
	const nom=document.getElementById('lastName').value;
	const prenom=document.getElementById('name').value;
	const mail=document.getElementById('email').value;
	const phone=document.getElementById('phoneNumber').value;
	const adress=document.getElementById('adresse').value;
	const codePostal=document.getElementById('CodePostal').value;
	const vill=document.getElementById('ville').value;

  let contact={
lastName:nom,
firstName:prenom,
email:mail,
address:adress,
city:vill,
};
localStorage.setItem('userFormulaire',JSON.stringify(contact));
  })
};
postnewformulaire("http://localhost:3000/api/teddies/order").then(produits=>{
    userPanier(produits)
    userFormulaire(produits)
})
userFormulaire();
console.log(userFormulaire)