// CREATE PAGE FOR PRODUCT ARRAY
class MyProduct {
    constructor(idCamera, selectedLenses) {
        this.idCamera = idCamera;
        this.selectedLenses = selectedLenses;
    }
}
//----------------------------

//RECUPERATION ID ONE CAMERA IN URL

function getCamera(cameras){
    let urlSearch =  new URLSearchParams(window.location.search);
    console.log(urlSearch);
    let idCamera = urlSearch.get('id');
    console.log(idCamera);
    getCameraItem(cameras, idCamera);
}
//------------------------                                                                                 
function getCameraItem(cameras, idCamera){

    let cameraChoice = cameras.find(cameras => cameras['_id'] == idCamera);
    console.log(cameraChoice);
    createLayoutCamera(cameraChoice, idCamera);

} 
//---------------------------

// CREATION HTML PRODUCT
function createLayoutCamera(cameraChoice, idCamera){

    const productList = document.createElement('div');
    productList.setAttribute("class", 'productList');
    productList.setAttribute("id" , 'productList');
    console.log(productList);
      
    const label = document.createElement('label');
    label.setAttribute("class", 'label');
    label.setAttribute("id", 'label');
      
    const selectQuantity = document.createElement('select');
    selectQuantity.setAttribute("class", 'selectQ');
    selectQuantity.setAttribute("id" , 'selectQ');

    let image = document.createElement('img');
    image.src = cameraChoice.imageUrl;
    image.setAttribute("alt", 'photo de la camera sélectionnée');
    let id = document.createElement('p');
    id.textContent = `Réf : ${cameraChoice._id}`;
    let nom = document.createElement('h2');
    nom.textContent = cameraChoice.name;
    let description = document.createElement('p');
    description.textContent = cameraChoice.description;
    label.textContent = `Optiques : `;
    let prix = document.createElement('p');
    prix.textContent = `Prix : ${cameraChoice.price /100 +',00'+ ' €'}`;
    let quantity = document.createElement('p');
    quantity.textContent = 'Quantité : ';
    let buttonAddToCart = document.createElement('button');
    buttonAddToCart.setAttribute("id", 'btn__addtocart');
    buttonAddToCart.setAttribute("type", 'submit');
    buttonAddToCart.textContent= 'Ajouter au Panier !';
    
      
// DISPLAY DOM


    bloc__product.appendChild(detail__product);
    detail__product.appendChild(productList);
    productList.appendChild(image);
    productList.appendChild(id);
    productList.appendChild(nom);
    productList.appendChild(description);
    productList.appendChild(label);
    productList.appendChild(prix);
    productList.appendChild(quantity);
    quantity.appendChild(selectQuantity);
    productList.appendChild(buttonAddToCart);

   
    choiceLense(label, cameraChoice);
    sQuantity(selectQuantity);
    getCameraSelected(buttonAddToCart, idCamera);
 }  
//--------------------------------
 // LAYOUT SELECT & OPTIONS

function choiceLense(label, cameraChoice){

    let chooseLenses = document.createElement('select');
    label.appendChild(chooseLenses);
    chooseLenses.setAttribute("class",'choice');
    chooseLenses.setAttribute("id" , 'choiceL');

    numLenses = cameraChoice.lenses;
    for (let j = 0; j < numLenses.length; j ++){
    let optLenses = document.createElement('option');
        chooseLenses.appendChild(optLenses);
        optLenses.textContent = cameraChoice.lenses[j];
        
       
        console.log(optLenses);
  } 
}
//--------------------------------
function sQuantity(selectQuantity) {
    let min = 1;
    let max = 5;
      for(let i = min; i <=max; i++ ){
            let selectQopt = document.createElement('option');  
            selectQopt.value = i;
            selectQopt.innerHTML = i;
            selectQuantity.appendChild(selectQopt);
            console.log(selectQopt); 
      }
}
//--------------------------------------
// END SELECT & OPTIONS        
// END HTML PRODUCT

//ADD PRODUCT IN CART

function getCameraSelected(buttonAddToCart, idCamera){
    buttonAddToCart.addEventListener('click', function () {
        let cartContent = JSON.parse(localStorage.getItem("basket"));
        let selectedLenses = document.getElementById('choiceL').value;
        console.log(selectedLenses);
        if (cartContent === null) {
            cartContent = [];
        }
        let product = new MyProduct(idCamera, selectedLenses);
        cartContent.push(product);
        localStorage.setItem("basket", JSON.stringify(cartContent));
        alert (`Votre article a été ajouté au panier!`)
        
        window.location = 'index.html'
      
        
    });
}
//---------------------------------------------
async function getCameras() {
  
        let response = await fetch("http://localhost:3000/api/cameras");
        if(response.ok){
            let cameras = await response.json();
            console.log(cameras);
            getCamera(cameras);
        }else{
            console.log('retour du server :' , response.status);
        }
    }
//---------------------------
getCameras();

 