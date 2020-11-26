/*Récuparation du contenu du panier
---------------------------------------------------------*/
addition=()=>{
    //Vérifie si un prduit est dans le panier
    if(JSON.parse(localStorage.getItem("userPanier","userFormulaire")).length > 0){}
};

  function userPanier(elts){

  	const commande=document.getElementById('commande');
  	commande.textContent=localStorage.getItem('orderid')

  	const section=document.getElementById('confirmation');

			const tableau=document.createElement('table');
  			const ligneArticle=document.createElement('tr');
  			const lignePrix=document.createElement('tr');
  			const ligneQuantite=document.createElement('tr');
  			const ligneTotal=document.createElement('tr');
  			const colonneProduit=document.createElement('th');
  			

  			tableau.classList.add("table");

  			section.appendChild(tableau);
  			tableau.appendChild(colonneProduit);
  			colonneProduit.appendChild(ligneArticle);
  			colonneProduit.appendChild(lignePrix);
  			colonneProduit.appendChild(ligneQuantite);
  			colonneProduit.appendChild(ligneTotal);
  			

  			ligneArticle.textContent="Article(s)";
  			lignePrix.textContent="Montant";
  			ligneQuantite.textContent="Nombre(s)";
  			ligneTotal.textContent="Total";
  		
  	let tt=0;
	JSON.parse(localStorage.getItem("userPanier")).forEach((produit)=>{
  		
		
		const article=document.createElement('td');
		const prix=document.createElement('td');
		const nombre=document.createElement('td');
		const total=document.createElement('td');

		
		ligneArticle.appendChild(article);
		lignePrix.appendChild(prix);
		ligneQuantite.appendChild(nombre);
		ligneTotal.appendChild(total);

		article.textContent=produit.nom;
		prix.textContent=produit.prix+'€';
		nombre.textContent=produit.quantite;
		tt=tt+(produit.prix*produit.quantite);
		total.textContent=(produit.prix*produit.quantite)+'€';  			
  	});	
		const totaux=document.createElement('td');
		const refTotal=document.createElement('td');
		const ligneTotaux=document.createElement('tr');

		refTotal.classList.add("t");
		totaux.classList.add("tx");

		colonneProduit.appendChild(ligneTotaux);
		ligneTotaux.appendChild(totaux);
		ligneTotaux.appendChild(refTotal);
		
		
		refTotal.textContent=tt+'€';
		totaux.textContent="Totaux"
  };
  userPanier();			
  console.log(userPanier);


  function userFormulaire(){

    /*recuperation de la balise html par ID*/
  	const formulaire=document.getElementById('formulaire');

    /*recuperation information du localstorage formulaire*/
  	const user=JSON.parse(localStorage.getItem('userFormulaire'));
  			
        /*affiche contenu html*/
  			const lastName=user.lastName;
  			const name=user.firstName;
  			const adresse=user.address;
  			const city=user.city;


  			const livrer=document.getElementById('livrer');
  			const nom=document.getElementById('civil');
  			const prenom=document.getElementById('civile');

  			nom.textContent=lastName;
  			prenom.textContent=name;
  			livrer.textContent=adresse+' '+city;
        /*vide le panier une fois la commande validé*/
        localStorage.clear();
  			};
  userFormulaire();
  