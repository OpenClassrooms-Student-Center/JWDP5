/*recupération Id*/
let params = (new URL(document.location)).searchParams;
	let id = params.get('id');

/*création fonction récupére par Id*/
function detail(elts){

  /* recuperation de la balise html abev ID*/
	 const teddies=document.getElementById('teddies');

   /*structure html du code
      -------------------------------------------------------------------------
			<div class="col-12 col-lg-2firstTeddies">
            <img id="imageUrl">
            <h4 id="name"></h4>
            <h5 id="price"></h5 >
            <h7 id="description"></h7>
            </div>
----------------------------------------------------------------------------------
      Création des balises html*/
		    const div=document.createElement("div");
        const h4=document.createElement("h4");
        const img=document.createElement("img");
        const h5=document.createElement("h5");
        const h7=document.createElement("h7");

        /*ajout des class*/
        div.classList.add("col-12", "col-lg-6");

        /*ajout du contenu*/
        h4.textContent=elts.name;
        h5.textContent=(elts.price/100)+"€";
        img.src=elts.imageUrl;
        h7.textContent=elts.description;

        /*mise en place bloc html*/
        div.appendChild(img);
        div.appendChild(h4);
        div.appendChild(h5);
        div.appendChild(h7);
        
        teddies.appendChild(div);
	};

/*Choix personnalisation couleur*/

function personalisation(elts){

  /*recuperation balise html par Id*/
  const colors=document.getElementById('colors');
  /*Structure du html
  -----------------------------------------------------------------------
    <div>
        <label for="optionSelect">Choisissez votre option :</label>
        <select name="option">
          <option value="">Faites votre choix</option>
        </select>
      </div>
------------------------------------------------------------------------
  Creation des balises html*/
    const div=document.createElement("div");
    const label=document.createElement("label");
    const select=document.createElement("select");
    elts.colors.forEach(function(color)
        {
        const option=document.createElement("option");
        option.textContent=color;
        select.appendChild(option);
        });
    
    let newText=document.createTextNode('Choissez votre option');
    
    label.appendChild(newText);
    
    div.appendChild(label);
    div.appendChild(select);

    colors.appendChild(div);


/* Ajouter produit au panier*/

  const elt=document.getElementById('ajouterProduitPanier');

  let qt=document.getElementById('qt');
/*Création de l'évènement*/
  elt.addEventListener('click',function(event){
    /*enregistrement dans localstorage*/
    let panier=JSON.parse(localStorage.getItem('userPanier')) ?? [];
   let produit={
      nom:elts.name,
      prix:(elts.price/100),
quantite:qt.options[qt.selectedIndex].text,
_id:elts._id
};
/*pousse information de produit a panier*/
panier.push(produit);
  localStorage.setItem('userPanier',JSON.stringify(panier));
  elt.innerHTML="Ajouter au panier";
  /*lien vers la page panier*/
 document.location.href="panier.html";
  });
};
/*Appel ajax avec id*/
ajax("http://localhost:3000/api/teddies/"+id).then(produits=>{
    detail(produits)
    personalisation(produits)
})
