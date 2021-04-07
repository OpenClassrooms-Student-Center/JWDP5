
//CART TITLE
function titleCart(){
    const title__cart = document.createElement('h2');
    title__cart.setAttribute("class", 'title');
    title__cart.textContent = `Article(s) Selectionné(s)`;
    title.appendChild(title__cart);
}
//CREATE ARRAY FOR PRICES
let arrayPrice = [];

//CREATE ARRAY TO SEND TO SERVER WITH ID CAMERAS
let products = [];

//CREATE OBJ CONTACT TO SEND TO SERVER
let contact = {};
//------------------------------------
// CLASS FOR OBJ CONTACT
class ContactData {
    constructor(lastName, firstName, address, city, email) {
        this.lastName = lastName ;
        this.firstName = firstName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

//-------------------------------------------

//STRUCTURE OF CART PAGE
//CREATE HTML FROM PRODUCT CHOOSEN
function createCart(itemCamera, key) {

    let containerRecap = document.createElement('div');
    containerRecap.setAttribute("class", 'container__recap');
    containerRecap.setAttribute("id", 'container__recap');

    let imageProduct = document.createElement('img');
    imageProduct.src = itemCamera.imageUrl;
    imageProduct.setAttribute("alt", 'image de la photo sélectionée');

    let idProducts = document.createElement('div');
    idProducts.setAttribute("class", 'id__products');
    let idProduct = document.createElement('p');
    idProduct.textContent = `Réf : ` + itemCamera._id;

    let nomProducts = document.createElement('div');
    nomProducts.setAttribute("class", 'nom__products');
    let nomProduct = document.createElement('p');
    nomProduct.textContent = `Article : ` + itemCamera.name; 
        
    let lenseCamera = document.createElement('p');
    lenseCamera.setAttribute("class", 'lenseS')
    nomProduct.appendChild(lenseCamera);
    lenseCamera.textContent = `Optiques : ` + key[i].selectedLenses;

    let priceProducts = document.createElement('div');
    priceProducts.setAttribute("class", 'prix__products');
    let priceProduct = document.createElement('p');
    priceProduct.setAttribute("id", 'price__product');
    priceProduct.textContent =`Prix : ` + itemCamera.price*key[i].selectedQ/100 + ",00" + "€";

    let quantity = document.createElement('p');
    quantity.setAttribute("class", 'quantity');
    quantity.textContent = 'Quantité : ' + key[i].selectedQ ;

    let divCancelArticle = document.createElement('div');
    divCancelArticle.setAttribute("id", 'btn-cancelArticle');
    divCancelArticle.setAttribute("class", 'btn-cancelArticle');
    let cancelArticle = document.createElement('button');
    cancelArticle.setAttribute("id", 'btn__cancelArticle');
    cancelArticle.setAttribute("class", 'btn__cancelArticle');
    cancelArticle.textContent = `Supprimer l'article`;

    cart__items.appendChild(containerRecap);
    containerRecap.append(imageProduct);
    containerRecap.append(idProducts);
    idProducts.append(idProduct);
    containerRecap.append(nomProducts);
    nomProducts.append(nomProduct);
    
    containerRecap.append(priceProducts);
    priceProducts.append(priceProduct);
    priceProduct.appendChild(quantity);
    containerRecap.append(divCancelArticle);
    divCancelArticle.appendChild(cancelArticle);
    
    deleteOneArticle(i);
}  
console.log(cart__items);
    
//-------------------------------
 // CALCULATE THE TOTAL OF CART
function totalOrder(arrayPrice){
    let totalPrice = document.getElementById("sum__totals");
    let total = 0;
    
    for(h  = 0; h < arrayPrice.length; h++) {
        total = total + arrayPrice[h] ;
        totalPrice.textContent =  total/100 + ",00" + "€";
        //STOCK THE PRICE FOR CONFIRMATION PAGE
        localStorage.setItem("totalOrder", JSON.stringify(total));
        
    }console.log(total);
}

//---------------------------------------------------
 // HTML TOTAL CART
 function createTotalCart() {
    const total = document.createElement('div');
    total.setAttribute("class", 'container__totals');
    total.setAttribute("id", 'container__total');
    total.textContent = `Total à payer :`  ;

    const sum = document.createElement('div');
    sum.setAttribute("id", 'sum__totals');
    sum.setAttribute("class", 'sum__totals');
   
    const emptyCart = document.createElement('button');
    emptyCart.setAttribute("class", 'btn__emptyCart');
    emptyCart.setAttribute("id", 'btn__emptyCart');
    emptyCart.textContent = `Vider le panier!!`;
    
    cont__total.append(total);
    cont__total.appendChild(sum);
    cont__total.appendChild(emptyCart);
}   
    console.log(cont__total);
//---------------------------------------
//CREATE CART
async function getCart() {
    let response = await fetch("http://localhost:3000/api/cameras");
    if(response.ok) {
        let cameras = await response.json();
        let key = JSON.parse(localStorage.getItem("basket"))|| {};

        for (i = 0 ; i < key.length; i++) {
            let itemCamera = cameras.find(cameras => cameras['_id'] ==(key[i].idCamera));
            console.log(itemCamera);
            createCart(itemCamera, key);
            store.addItemPrice(itemCamera, key);
            store.addIdProduct(key); 
        }
        totalOrder(arrayPrice);   
        }else{
        console.error('retour du server', response.status);
    }    
} 

//---------------------------------
//DELETE ONE ARTICLE

function deleteOneArticle(i) {
    const RemoveBtnCancelArticle = document.getElementsByClassName('btn__cancelArticle');
     
        for( let h = 0; h < RemoveBtnCancelArticle.length; h++){ 
        
        RemoveBtnCancelArticle[h].addEventListener('click', (e) => {
        e.preventDefault();
     
      
        let products = store.getProducts();

      
        products.splice(i,1);
            
        
          
         // SEND VARIABLE TO LOCALSTORAGE TO BE DELETED
        
        localStorage.setItem('basket', JSON.stringify(products));
        window.location.href = 'cart.html';
        console.log(products)
        
        });
    }
}

//--------------------------
//DELETE ALL ARTICLE
function deleteAllArticle (){
let  removeBtnEmptyCart = document.getElementsByClassName('btn__emptyCart');

    for( let l = 0; l < removeBtnEmptyCart.length; l++){
        let button = removeBtnEmptyCart[l];
        button.addEventListener('click' ,(e) => {
        e.preventDefault();
        store.reset()
           
            localStorage.removeItem('totalOrder');
            window.location.href = "index.html";
       });
    }
}
//------------------------------------------
//GET ID OF ORDER SENT FROM API AND POST TO LOCALSTORAGE
function getOrderConfId(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfId", orderId)
}
//--------------------------------------------------
// GET FORM FROM OBJ CONTACT
function getForm(){
    let lastName = document.getElementById('lastName').value;
    let firstName = document.getElementById('firstName').value;
    let address = document.getElementById('address').value;
    let city= document.getElementById('city').value;
    let email = document.getElementById('email').value;
     return {lastName, firstName, address, city, email};
}
//-----------------------------------
//POST REQUESTED TO SEND TO API
async function sendForm(dataToSend) {
   console.log(dataToSend)
        let response = await fetch("http://localhost:3000/api/cameras/order", {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(dataToSend),
        });
        if (response.ok) {
            let responseId = await response.json()
            getOrderConfId(responseId);
            window.location = 'confirmation.html'
        }else{
        console.error('retour du server : ', response.status);
        }
}
//-----------------------------
//VALIDATE ORDER OBJ CONTACT AND ARRAY TO API
function confirmOrder() {
    let contact = getForm();
    let dataToSend = {contact, products};
    console.log(dataToSend);
    sendForm(dataToSend);
    console.log(contact);
}
//-------------------------
//VALIDATE FORM
function validateForm(){
    let btnValidate = document.getElementById('check-cart');
    btnValidate.addEventListener('click', (e) => {
        e.preventDefault();
        
        let lastName = document.getElementById('lastName').value;
        let firstName = document.getElementById('firstName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;

        if (/^[a-zA-Z-]*$/.test(lastName)){
            console.log("nom accepté");
            document.getElementById('lastName').style.borderColor = 'black';
        }else{
            alert ('Veuillez renseigner votre nom correctement!!')
            document.getElementById('lastName').style.borderColor = 'red';
            return false
        }
        if(/^[a-zA-Z-]*$/.test(firstName)){ 
            console.log("prénom accepté");
            document.getElementById('firstName').style.borderColor = 'black'; 
        }else{
            alert ('Veuillez renseigner votre Prénom correctement!!')
            document.getElementById('firstName').style.borderColor = 'red';
            return false;
        }
        if(/^[0-9,a-zA-Zé,è,ï,ä,î,ô\s]*$/.test(address)){
            console.log("adresse acceptée");
            document.getElementById('address').style.borderColor = 'black'; 
        }else{
            alert ('Veuillez renseigner votre adresse correctement!!')
            document.getElementById('address').style.borderColor = 'red';
            return false;
        }
        if(/^[a-zA-Z-]*$/.test(city)){
            console.log("ville acceptée");
            document.getElementById('city').style.borderColor = 'black'; 
        }else{
            alert ('Veuillez renseigner votre ville correctement!!')
            document.getElementById('city').style.borderColor = 'red';
            return false;
        }
        if( /^[a-z0-9-.]+@[a-z0-9-]+.[a-z]{1,4}$/.test(email)){
            console.log("email accepté");
            document.getElementById('email').style.borderColor = 'black'; 
        }else{
            alert ('Veuillez renseigner un email valide!!')
            document.getElementById('email').style.borderColor = 'red';
            return false;
        }
            confirmOrder();
            localStorage.removeItem('basket')
             return true;
    });
}
//CALLING FUNCTION

titleCart();
getCart()
createTotalCart();
store.deleteDiv() 
deleteAllArticle()
validateForm()
store.nombreIndexPanier();
