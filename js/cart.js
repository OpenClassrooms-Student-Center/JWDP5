

let addLocalStorage = JSON.parse(localStorage.getItem("basket"));
localStorage.setItem('basket',JSON.stringify(addLocalStorage));
console.log(addLocalStorage);

//PRODUCT CART TITLE
 const title__cart = document.createElement('h2');
    title__cart.setAttribute("class", 'title');
    title__cart.textContent = `Article(s) Selectionné(s)`;
    
    title.appendChild(title__cart);


//IF CART IS EMPTY : DELETE DIV

if(addLocalStorage === null || addLocalStorage == 0) {
  
    
    document.getElementById('hide-page').style.display = 'none';
    
    alert(`Vous n'avez pas d'article dans votre panier!!

Vous allez être redigérer vers la page d'accueil.`)
    window.location.href  = "index.html"
} else{
    // IF CART IS NOT EMPTY : DISPLAY PRODUCTS IN LOCALSTORAGE
    let productCart = addLocalStorage;
    for (k = 0; k < addLocalStorage.length; k++) {
        console.log(addLocalStorage.length);

        const containerRecap = document.createElement('div');
        containerRecap.setAttribute("class", 'container__recap');
        containerRecap.setAttribute("id", 'container__recap');

        let imageProduct = document.createElement('img');
        imageProduct.src = productCart[k].image;
        imageProduct.setAttribute("alt", 'image de la photo sélectionée');

        const idProducts = document.createElement('div');
        idProducts.setAttribute("class", 'id__products');
        let idProduct = document.createElement('p');
        idProduct.textContent = `Réf : ` + productCart[k].id;

        const nomProducts = document.createElement('div');
        nomProducts.setAttribute("class", 'nom__products');
        let nomProduct = document.createElement('p');
        nomProduct.textContent = `Article : ` + productCart[k].nom; 
        
    
        const prixProducts = document.createElement('div');
        prixProducts.setAttribute("class", 'prix__products');
        let prixProduct = document.createElement('p');
        prixProduct.textContent = `Prix : `+ productCart[k].prix/100 + `,00` + `€`;
        
        const divCancelArticle = document.createElement('div');
        divCancelArticle.setAttribute("id", 'btn-cancelArticle');
        const cancelArticle = document.createElement('button');
        cancelArticle.setAttribute("id", 'btn__cancelArticle');
        cancelArticle.setAttribute("class", 'btn__cancelArticle');
        cancelArticle.textContent = `Supprimer l'article`;

        cart__items.appendChild(containerRecap);
        containerRecap.append(imageProduct);
        containerRecap.append(idProducts);
        idProducts.append(idProduct);
        containerRecap.append(nomProducts);
        nomProducts.append(nomProduct);
     
        containerRecap.append(prixProducts);
        prixProducts.append(prixProduct);
        containerRecap.append(divCancelArticle);
        divCancelArticle.appendChild(cancelArticle);
       

    }
    
   console.log(productCart);
   console.log(cart__items);
} 

 

 // HTML TOTAL CART
    const total = document.createElement('div');
    total.setAttribute("class", 'container__totals');
    total.setAttribute("id", 'container__total');
    const sum = document.createElement('div');
    sum.setAttribute("id", 'sum__totals');
    sum.setAttribute("class", 'sum__totals');

    cont__total.append(total);
    cont__total.appendChild(sum);
    
    console.log(cont__total);

// BUTTON CANCEL ONE ARTICLE   

    
    let removebtnCancelArticle = document.getElementsByClassName('btn__cancelArticle');
    console.log(removebtnCancelArticle);
     for( let h = 0; h < removebtnCancelArticle.length; h++){
         let button = removebtnCancelArticle[h];
     
    button.addEventListener('click' , (event) => {
        event.preventDefault();

      
    
    // ALERT ARTICLE DELETE WHEN LOADING THE PAGE
        

        if(window.confirm(`
Cliquez sur OK pour supprimer l'article.
  
Si vous ne souhaitez pas supprimer l'article choisi cliquez sur Cancel`)){
        // SELECT ID TO BE DELETED
        let buttonRemoveArticle = addLocalStorage[h].id;
  
        // METHOD FILTER CHOSE ELEMENT TO KEEP AND DELETE ELEMENT WHERE LE BTN HAS BEEN CLICK
        addLocalStorage = addLocalStorage.filter( el => el.id !== buttonRemoveArticle);
        
        // SEND VARIABLE TO LOCALSTORAGE
        localStorage.setItem('basket', JSON.stringify(addLocalStorage)
        );
        window.location.href = "cart.html";
      
            } else{
             
            
            }
           
        })  
   
    
}   
    // DELETE ALL ARTICLE IN CART
    
    const emptyCart = document.createElement('button');
    emptyCart.setAttribute("class", 'btn__emptyCart');
    emptyCart.setAttribute("id", 'btn__emptyCart');
    emptyCart.textContent = `Vider le panier!!`;
    cont__total.appendChild(emptyCart);


    let  removeBtnEmptyCart = document.getElementsByClassName('btn__emptyCart');
    console.log(removeBtnEmptyCart);

     for( let l = 0; l < removeBtnEmptyCart.length; l++){
        let button = removeBtnEmptyCart[l];
    
    button.addEventListener('click' ,(e) => {
        e.preventDefault();
        
             // SEND VARIABLE TO LOCALSTORAGE
        let addLocalStorage = JSON.parse(localStorage.getItem("basket"));
        localStorage.setItem('basket', JSON.stringify(addLocalStorage));
     
        if(window.confirm(`Cliquez sur OK pour supprimer vos articles et être
redirigé vers la page d'accueil.

Cliquez sur Cancel pour garder vos articles dans le panier.`)){
    
        // ALERT ALL ARTICLE WILL BE DELETED WHEN LOADING THE PAGE
        localStorage.removeItem('basket');
        window.location.href = "index.html";
        
       } else{
        // ARTICLE WILL STAY ON THE CART PAGE
       }
            
       });

    };
    

 // CALCULATE THE TOTAL OF CART
const reducer = (value, prix) => value + prix; 

let prices = addLocalStorage.map(camera => camera.prix/100);

let sumTotal = prices.reduce(reducer);
   console.log(sumTotal) ;


document.getElementById("container__total").textContent = `Total de votre panier :   `;
document.getElementById("sum__totals").textContent = sumTotal + `,00`  + `€`;


   
//---------FORMULAIRE

checkInput = ()  => {

    
    let hideForm = document.getElementById('form');

    if(hideForm === null || hideForm == 0) {
  
        let none = document.getElementById('form');
        document.getElementById('form').style.display = 'none';
    
    }else{
        
    }
    console.log(hideForm)
    // REGEX

    let checkNumber = /[0-9]/;
    let checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let checkSpecialCharacter = /[§!@#$%^&*().?":{}|<>]/;

    // MESSAGE END CONTROL
    let checkMessage = "";

    // GET INPUTS

    let lastName = document.getElementById("lastName").value;
    let firstName = document.getElementById("firstName").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;

    //TEST OF EACH INPUTS

    //FIRST NAME TEST
    if (                        //  L'égalité faible (==) effectuera une conversion des deux éléments à comparer avant d'effectuer la comparaison
        checkNumber.test(lastName) == true ||
        checkSpecialCharacter.test(lastName) == true ||
        lastName == ""
    ) {
        checkMessage = "Veuillez vérifier les informations concernant votre nom";
        
    }else {
        console.log("nom accepté" );
    }

    //FIRSTNAME TEST
    if (
        checkNumber.test(firstName) == true ||
        checkSpecialCharacter.test(firstName) == true ||
        firstName == ""
    ) {
        checkMessage = "Veuillez vérifier les informations concernant  votre prénom";
        
    }else {
        console.log("prénom accepté");
    }

    //ADDRESS TEST
    if (
        checkSpecialCharacter.test(address) == true ||
        address == ""
    ) {//\n = new line or jump line
        checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre adresse";
        
    }else {
        console.log("adresse acceptée");
    }

    //CITY TEST
    if (
        checkSpecialCharacter.test(city) == true ||
        city == ""
    ) {
        checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre ville";
        
    }else {
        console.log("ville acceptée");
    }

    //EMAIL TEST
    if (
        checkMail.test(email) == false ||
        email == ""
    ) {//\n = new line or jump line
        checkMessage = checkMessage + "\n" + "Veuillez vérifier les informations concernant votre email";
        
    }else {
        console.log("email accepté");
    }

    // IF ONE OF THE IMPUTS IS NOT CORRECT > ALERT MESSAGE
    if (checkMessage!=""){
        
    }

    //IF FORM IS CORRECT THEN > OBJ CONTACT
    else{
        contact = {
            lastName: lastName,
            firstName : firstName,
            address : address,
            city : city,
            email : email,
        }; 
        return contact;
    }
};

// VERIFY THE CART
checkCart = () => {
    //VERIFY IF THERE IS A LEAST ONE PRODUCT            //BASKET KEY CREATED BEFORE
    let stateCart = JSON.parse(localStorage.getItem("basket"));
    //IF THE CART IS EMPTY      // RETURN EXPR1 IF CAN BE CONVERTED FALSE OTHERWISE RETURN EXPR2
    if (stateCart.length < 1 || stateCart == null) {
        alert("Votre panier est vide");
        console.log("le panier est vide")
        
        return false;
    }else{
        console.log("Le panier n'est pas vide");
        return true ;
    }
};

//SENDING TO API
    //ARRAY AND OBJ ASKED BY API FOR ORDER
    let contact;
    let products = addLocalStorage.map(camera => camera.id); //ARRAY
    let url = "http://localhost:3000/api/cameras/order";// FIND IN FOLDER ROUTE

    const sendFormCart = (sendForm, url) => {
    return new Promise((resolve) => { //SEE https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises
        let request = new XMLHttpRequest();// SEE https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
        request.onload = function (){               // " && " in Javascript is the operator for AND. 
            if(this.readyState === XMLHttpRequest.DONE && this.status === 201) {//201 MEAN THE REQUEST IS SUCCESSFULL WITH METHOD POST
                sessionStorage.setItem("order", this.responseText);// responseText return the response into string (chaine de caracteres)
                resolve(JSON.parse(this.responseText));
                window.location = "confirmation.html";
                console.log(sendForm);
        } else{
            } 
        }; 
        request.open("POST", url); //La méthode open() de XMLHttpRequest instancie une nouvelle requête ou réinitialise un déjà existante
        request.setRequestHeader("Content-type", "application/json");//https://developer.mozilla.org/fr/docs/Web/HTTP/Headers/Accept
        request.send(sendForm);
        console.log(sendForm);
    })
};


confirmOrder = ()  => {
    let validCommand = document.getElementById('form');
    validCommand.addEventListener("submit", (e) => {
        e.preventDefault();
        //IF THE CART IS NOT EMPTY AND AND THE FORM IS VALID > BUILD A PRODUCTS ARRAY TO API


        if (checkCart() == true && checkInput() != null) {
            console.log("envoie effectué");
            
            let products = JSON.parse(localStorage.getItem("basket"))
            
            console.log("tableau envoyé à l'API : " + products);
        
            // CREATING OBJ TO SEND
            let order = {
                contact : contact,
                products : products.map(camera => camera.id)
            };

            let sendForm = JSON.stringify(order);
            sendFormCart(sendForm, url)
            console.log(order);
        
            //RETURN ORIGINAL STATE LOCALSTORAGE
            contact = {};
            products = [];
            localStorage.clear();
        } else {
        console.log("ERROR");
        }
    });
};




checkInput();
checkCart();
confirmOrder();

