/*recupération Id*/
let params = (new URL(document.location)).searchParams;
	let id = params.get('id');

/*création bloc produit récupére par Id*/
function detail(elts){

	 const teddies=document.getElementById('teddies');

			/*<div class="col-12 col-lg-2firstTeddies">
            <img id="imageUrl">
            <h4 id="name"></h4>
            <h5 id="price"></h5 >
            <h7 id="description"></h7>
            </div>*/

		    const div=document.createElement("div");
        const h4=document.createElement("h4");
        const img=document.createElement("img");
        const h5=document.createElement("h5");
        const h7=document.createElement("h7");

        div.classList.add("col-12", "col-lg-6");

        h4.textContent=elts.name;
        h5.textContent=(elts.price/100)+"€";
        img.src=elts.imageUrl;
        h7.textContent=elts.description;

        div.appendChild(img);
        div.appendChild(h4);
        div.appendChild(h5);
        div.appendChild(h7);
        
        teddies.appendChild(div);
	 }
console.log(detail);

/*Choix personnalisation*/

function personalisation(elts){

  const colors=document.getElementById('colors');

    /*<div>
        <label for="optionSelect">Choisissez votre option :</label>
        <select name="option">
          <option value="">Faites votre choix</option>
        </select>
      </div>*/

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


/* envoi formulaire du panier a la page panier*/

const elt=document.getElementById('ajouterProduitPanier');
console.log(elt);

let qt=document.getElementById('qt');
/*Création de l'évènement*/
elt.addEventListener('click',function(event){
  let panier=JSON.parse(localStorage.getItem('userPanier')) ?? [];
  let produit={
nom:elts.name,
prix:(elts.price/100),
quantite:qt.options[qt.selectedIndex].text,
_id:elts._id
};
panier.push(produit);
  localStorage.setItem('userPanier',JSON.stringify(panier));
  elt.innerHTML="Ajouter au panier";
  /*lien vers la page panier*/
 document.location.href="panier.html";
});

};
console.log(qt)
getnewproduits("http://localhost:3000/api/teddies/"+id).then(produits=>{
    detail(produits)
    personalisation(produits)
})