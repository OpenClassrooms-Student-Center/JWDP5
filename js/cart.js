
//PRODUCT CART
 const title__cart = document.createElement('h2');
    title__cart.setAttribute("class", 'title');
    title__cart.textContent = `Article(s) Selectionné(s)`;
    
    title.appendChild(title__cart);
    


let addLocalStorage = JSON.parse(localStorage.getItem("basket"));
console.log(addLocalStorage);



//IF CART IS EMPTY : DISPLAY le panier est vide

if(addLocalStorage === null){
    const deleteArticle = document.createElement('div');
    deleteArticle.setAttribute("class", 'container__emptyCart');
    deleteArticle.textContent = `Le panier est vide!!`;
  
    cart__items.appendChild(deleteArticle);


} else{
    // IF CART IS NOT EMPTY : DISPLAY PRODUCTS IN LOCALSTORAGE
    let productCart = addLocalStorage;
    for (k = 0; k < addLocalStorage.length; k++) {
        console.log(addLocalStorage.length);

        const containerRecap = document.createElement('div');
        containerRecap.setAttribute("class", 'container__recap');

        let imageProduct = document.createElement('img');
        imageProduct.src = productCart[k].image;

        const idProducts = document.createElement('div');
        idProducts.setAttribute("class", 'id__product');
        let idProduct = document.createElement('p');
        idProduct = productCart[k].id;

        const nomProducts = document.createElement('div');
        nomProducts.setAttribute("class", 'nom__products');
        let nomProduct = document.createElement('p');
        nomProduct = productCart[k].nom;

        const prixProducts = document.createElement('div');
        prixProducts.setAttribute("class", 'prix__products');
        let prixProduct = document.createElement('p');
        prixProduct = productCart[k].prix;

        const CancelArticle = document.createElement('button');
        CancelArticle.setAttribute("id", 'btn__cancelArticle');
        CancelArticle.setAttribute("class", 'btn__cancelArticle');
        CancelArticle.textContent = `Supprimer l'article`;

        cart__items.appendChild(containerRecap);
        containerRecap.append(imageProduct);
        containerRecap.append(idProducts);
        idProducts.append(idProduct);
        containerRecap.append(nomProducts);
        nomProducts.append(nomProduct);
        containerRecap.append(prixProducts);
        prixProducts.append(prixProduct);
        containerRecap.append(CancelArticle);
       

    }
   console.log(productCart);
   console.log(cart__items);
 

// BUTTON CANCEL ONE ARTICLE

   let removebtnCancelArticle = document.getElementsByClassName('btn__cancelArticle');
   console.log(removebtnCancelArticle);
    for( let h = 0; h < removebtnCancelArticle.length; h++){
        let button = removebtnCancelArticle[h];
    
   button.addEventListener('click' , function(event) {
       
      let buttonClicked = event.target;
      buttonClicked.parentElement.remove();

   });
   
}


    // HTML TOTAL CART
    const total = document.createElement('div');
    total.setAttribute("class", 'container__total');
    total.setAttribute("id", 'container__total');
    total.textContent = `Total de votre panier :`;

    cart__items.appendChild(total);

   


    // NEED ADDEVENTLISTENER
    
    const emptyCart = document.createElement('button');
    emptyCart.setAttribute("class", 'btn__emptyCart');
    emptyCart.setAttribute("type", 'submit');
    emptyCart.setAttribute("id", 'btn__emptyCart');
    emptyCart.textContent = `Vider le panier!!`;
   
    cart__items.appendChild(emptyCart);

    const btnEmptycart = document.getElementById('btn__emptyCart');

    btnEmptycart.addEventListener('click', (e)=>{
        e.preventDefault();


    } )
}

// FORMULAIRE

document.forms["form"].addEventListener("submit",(e) => {

    let error;
    let reg1 = /^[a-zA-Z\s\-]$/;
    let reg2 = /^[a-zA-Z0-9\s\,]$/;
   
   
    let inputs = document.getElementsByTagName("input");

            
    for (let i = 0; i < inputs.length; i++){
        
       if (!inputs[i].value){ 
            error = "Veuillez compléter le formulaire";
            inputs[i].style.borderColor = 'red';
            break; //BREAK THE LOOP
            
        }else{
            inputs[i].style.borderColor = 'black'; 
            
        }
         
    } 
    if (error){
        e.preventDefault();
        document.getElementById("error").innerHTML = error;
        return false;
   } 

} ) 

        
  

   
    














    