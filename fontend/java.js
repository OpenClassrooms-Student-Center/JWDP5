/* creation fonction produit*/
function newproduits(elts){

    const teddies=document.getElementById('teddies');

    for (let i=0;i<elts.length; i++) {
        /*<div class="col-12 col-lg-2 firstTeddies">
            <img id="imageUrl">
            <a href="produit.html"><h4 id="name"></h4></a>
            <h5 id="price"></h5 >
            a href="panier.html" id="ajout"><button type="submit" name="addToCart" class="cart-button">Voir le détail</button></a>
            </div>*/
/* Placement du contenu Html*/
        const div=document.createElement("div");
        const h4=document.createElement("h4");
        const img=document.createElement("img");
        const h5=document.createElement("h5");
        const a=document.createElement("a");

        div.classList.add("col-12", "col-lg-2");
        a.classList.add("cart-button");
        a.href="produit.html?id="+elts[i]._id;

        h4.textContent=elts[i].name;
        h5.textContent=(elts[i].price/100)+"€";
        img.src=elts[i].imageUrl;
        a.textContent="Voir le détail";

        div.appendChild(img);
        div.appendChild(h4);
        div.appendChild(h5);
        div.appendChild(a);

        teddies.appendChild(div);
    }
};
getnewproduits("http://localhost:3000/api/teddies").then(produits=>{
    newproduits(produits)
})