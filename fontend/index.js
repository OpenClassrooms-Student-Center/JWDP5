/* creation fonction produit*/
function newproduits(elts){
    /*recuperation de la balise htlm avec  Id*/
    const teddies=document.getElementById('teddies');

    for (let i=0;i<elts.length; i++) {
        /*Structure du htlm produit
---------------------------------------------------------------------------------
        <div class="col-12 col-lg-2 firstTeddies">
            <img id="imageUrl">
            <a href="produit.html"><h4 id="name"></h4></a>
            <h5 id="price"></h5 >
            a href="panier.html" id="ajout"><button type="submit" name="addToCart" class="cart-button">Voir le détail</button></a>
            </div>
------------------------------------------------------------------------------------
        /* Création des balises Html*/
        const div=document.createElement("div");
        const h4=document.createElement("h4");
        const img=document.createElement("img");
        const h5=document.createElement("h5");
        const a=document.createElement("a");

        /*rajout des class*/
        div.classList.add("col-12", "col-lg-2");
        a.classList.add("cart-button");
        a.href="produit.html?id="+elts[i]._id;

        /*Contenu du Html*/
        h4.textContent=elts[i].name;
        h5.textContent=(elts[i].price/100)+"€";
        img.src=elts[i].imageUrl;
        a.textContent="Voir le détail";

        /*mise en place du bloc html*/
        div.appendChild(img);
        div.appendChild(h4);
        div.appendChild(h5);
        div.appendChild(a);

        teddies.appendChild(div);
    }
};
/*promesse appel API*/
ajax("http://localhost:3000/api/teddies").then(produits=>{
    newproduits(produits)
})