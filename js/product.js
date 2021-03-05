//RECUPERATION API ONE CAMERA


async function getCamera(){
    let url =  new URL (document.location);
    let params = url.searchParams;
    let idCamera = params.get("id");
    let response = await fetch('http://localhost:3000/api/cameras/' +idCamera, {method: 'GET'});
    let camera = await response.json();
    return camera; //PROMESSE

}

                                                                                       
async function camera(){
    const camera = await getCamera();
    console.log(camera);
   
           
// CREATION HTML PRODUCT
      
    const productList = document.createElement('div');
    productList.setAttribute("class", 'productList');
    productList.setAttribute("id" , 'productList');
    console.log(productList);
      
    const label = document.createElement('label');
    label.setAttribute("class", 'label');
    label.setAttribute("id", 'label');
      
    const chooseLenses = document.createElement('select');
    chooseLenses.setAttribute("class",'choice');
    chooseLenses.setAttribute("id" , 'choiceL');
    chooseLenses.setAttribute("onchange", 'selectedLenses()');
      
    const selectQuantity = document.createElement('select');
    selectQuantity.setAttribute("class", 'selectQ');
    selectQuantity.setAttribute("id" , 'selectQ');


// LAYOUT SELECT & OPTIONS

    let min = 1;
    let max = 5;
      for(let i = min; i <=max; i++ ){
          let selectQopt = document.createElement('option');
          selectQopt.value = i;
          selectQopt.innerHTML = i;
          selectQuantity.appendChild(selectQopt);
          console.log(selectQopt); 
      }
     

    let sLenses = camera.lenses;
      for (let j = 0; j < sLenses.length; j ++){
          let optLenses = document.createElement('option');
          optLenses.value = j;
          optLenses.innerHTML = sLenses[j];
          chooseLenses.appendChild(optLenses);
         console.log(optLenses);
      }


    

 // END SELECT & OPTIONS

    let image = document.createElement('img');
    image.src = camera.imageUrl;
    image.setAttribute("alt", 'photo de la camera sélectionnée');
    let id = document.createElement('p');
    id.textContent = `Réf : ${camera._id}`;
    let nom = document.createElement('h2');
    nom.textContent = camera.name;
    let description = document.createElement('p');
    description.textContent = camera.description;
    label.textContent = `Optiques : `;
    let prix = document.createElement('p');
    prix.textContent = `Prix : ${camera.price /100 +',00'+ ' €'}`;
    let quantity = document.createElement('p');
    quantity.textContent = 'Quantité : ';
    let button = document.createElement('button');
    button.setAttribute("id", 'btn__addtocart');
    button.setAttribute("type", 'submit');
    button.textContent= 'Ajouter au Panier !';
      
      
// DISPLAY DOM


    bloc__product.appendChild(detail__product);
    detail__product.appendChild(productList);
    productList.appendChild(image);
    productList.appendChild(id);
    productList.appendChild(nom);
    productList.appendChild(description);
    productList.appendChild(label);
    label.appendChild(chooseLenses);
    productList.appendChild(prix);
    productList.appendChild(quantity);
    quantity.appendChild(selectQuantity);
    productList.appendChild(button);
   
          
// END HTML PRODUCT
// POPUP WINDOW

    const popupConfirmation = () => {

    if(window.confirm(`${camera.name} à bien été ajouté au panier

Consulter le panier cliquez sur  OK 
Revenir à l'accueil cliquez sur Cancel`)){
        window.location.href = "cart.html";
    }
    else{
        window.location.href = "index.html";
    }
}


  // CLICK TO CART PAGE TO ADD PRODUCT
 
const pageAddToCart = document.getElementById('btn__addtocart');

pageAddToCart.addEventListener('click', (e) => {
   e.preventDefault();


  // GET CART DATA
  let addCart = {

    nom : camera.name,
    id: camera._id,
    image: camera.imageUrl,
    prix: camera.price ,
   
  }   

//LOCALSTORAGE



let addLocalStorage = JSON.parse(localStorage.getItem("basket"));

//IF PRODUCTS IN LOCAL STORAGE
if(addLocalStorage){
    addLocalStorage.push(addCart);
    localStorage.setItem('basket',JSON.stringify(addLocalStorage));
    console.log(addLocalStorage);
    popupConfirmation();
}
//IF NO PRODUCT IN LOCAL STORAGE
else{
    addLocalStorage = [];
    addLocalStorage.push(addCart);
    localStorage.setItem('basket',JSON.stringify(addLocalStorage));
    console.log(addLocalStorage);
    popupConfirmation();
}


});

}
    camera();
 
