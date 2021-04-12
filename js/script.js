
// Url produit
let urlProduct = "";


// Appel de produits index.html

const indexCam = document.querySelector("#indexCam");
const indexRow1 = document.querySelector("#indexRow1");
const indexRow2 = document.querySelector("#indexRow2");

async function getProducts () {
    const response = await fetch("http://localhost:3000/api/cameras" + '/' + urlProduct);
    const data = await response.json();

    console.log(data);
    return data;
}


async function getIndex() {
    if (indexCam != null) {
        const allProducts = await getProducts()

        for(i=0; i < allProducts.length; i++) {
            let indexCol = document.createElement("div");
            let indexCard = document.createElement("div");
            let indexLink = document.createElement("a");
            let indexImg = document.createElement("img");
            let indexBodyCard = document.createElement("div");
            let indexProductTitle = document.createElement("h5");
            let indexProductPrice = document.createElement("p");
            
            indexRow1.appendChild(indexCol);
            indexCol.classList.add("col-lg-4");
            indexCol.appendChild(indexCard);
            indexCard.classList.add("card");
            indexCard.appendChild(indexLink);
            indexLink.classList.add("stretched-link")
            indexLink.appendChild(indexImg);
            indexImg.classList.add("card-img-top");
            indexLink.appendChild(indexBodyCard);
            indexBodyCard.classList.add("card-body");
            indexBodyCard.appendChild(indexProductTitle)
            indexProductTitle.classList.add("card-title");
            indexBodyCard.appendChild(indexProductPrice);
            indexProductPrice.classList.add("card-text");
    
            indexRow2.appendChild(indexCol);
            indexCol.classList.add("col-lg-4");
            indexCol.appendChild(indexCard);
            indexCard.classList.add("card");
            indexCard.appendChild(indexLink);
            indexLink.classList.add("stretched-link")
            indexLink.appendChild(indexImg);
            indexImg.classList.add("card-img-top");
            indexLink.appendChild(indexBodyCard);
            indexBodyCard.classList.add("card-body");
            indexBodyCard.appendChild(indexProductTitle)
            indexProductTitle.classList.add("card-title");
            indexBodyCard.appendChild(indexProductPrice);
            indexProductPrice.classList.add("card-text");
    
            indexProductTitle.innerHTML = allProducts[i].name;
            indexProductPrice.innerHTML = parseInt(allProducts[i].price / 100).toFixed(2) + " €";
            indexLink.setAttribute("href", "product.html?id="+ allProducts[i]._id)
            indexImg.setAttribute("src", allProducts[i].imageUrl);
                
        }  
    }   
}

getIndex()


// Page produit

const pictureProduct = document.getElementById("pictureProduct");
const nameProduct = document.getElementById("nameProduct");
const textProduct = document.getElementById("textProduct");
const priceProduct = document.getElementById("priceProduct");
const lensesChoices = document.getElementsByClassName("lensesChoice");



// Création de l'URL

const product = document.querySelector("#pageProduct");

async function pageProduct(){
    if (product != null) {
        let url = window.location.search
        const urlParams = new URLSearchParams(url)
        urlProduct = urlParams.get('id')

        const allProducts = await getProducts()
    
        pictureProduct.setAttribute('src', allProducts.imageUrl)
        nameProduct.innerHTML = allProducts.name
        textProduct.innerHTML = allProducts.description
        priceProduct.innerHTML = parseInt(allProducts.price / 100).toFixed(2) + ' €'

        
        // Ajout du choix de lentilles
        allProducts.lenses.forEach(function(choice) {
            const lensesProduct = document.querySelector("#lensesProduct");
            let lensesChoice = document.createElement("option");
            lensesChoice.classList.add("lensesChoice")

            lensesProduct.appendChild(lensesChoice)
            lensesChoice.innerHTML = choice
        })
    }
}

console.log(lensesChoices)

// Evenement onclick pour appel de produit

indexLink = document.getElementsByClassName("stretched-link")
indexLink = addEventListener('click', pageProduct())






// Panier



if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready () {
    let removeButton = document.getElementsByClassName("btn-danger");
    for (let i = 0; i < removeButton.length; i++) {
        let button = removeButton[i]
        button.addEventListener("click", removeCartItem)
    }

    let quantityInputsProduct = document.getElementsByClassName("quantityProductCart")
    for ( let i = 0; i < quantityInputsProduct.length; i++) {
        let input = quantityInputsProduct[i] 
        input.addEventListener("change", quantityChanged)
    } 
    
    let addToLocalStorageButton = document.querySelector("#buttonProduct");
    addToLocalStorageButton.addEventListener("click", addToLocalStorage)

    let addToCartButton = document.getElementById("buttonProduct");
    addToCartButton.addEventListener("click", addToCartItem)
}

    
function addToLocalStorage(event){
    event.preventDefault()
            
    let productToStorage = JSON.parse(localStorage.getItem("LocalStorageCartProducts"));
    console.log(productToStorage)

    let optionProduct = {
        pictureProductCart : pictureProduct.src,
        nameProductCart : nameProduct.innerHTML,
        priceProductCart : priceProduct.innerHTML,
        lensesChoiceCart : lensesChoices.innerHTML
        };
    console.log(optionProduct)

    if(localStorage.getItem("LocalStorageCartProducts")){

    } else {
        productToStorage = [];
        productToStorage.push(optionProduct)
        localStorage.setItem("LocalStorageCartProducts", JSON.stringify(productToStorage))
    }
}

function addToCartItem() {
    let rowCart = document.createElement("div");
    rowCart.classList.add("rowCart")
    let productCart = document.getElementsByClassName("rowCartItem")[0]
    let rowCartContents = `
        <div class="row rowCartItem">
            <div class="col-2 border-bottom border-secondary border-2 pb-3 pictureProduct">
                <img class="img-fluid" src="${optionProduct.nameProductCart}" alt="Image caméra" />
            </div>
            <div class="col-3 border-bottom border-secondary border-2 pb-3">
                <h3 class="titleProduct"></h3>
            </div>
            <div class="col-1"></div>
            <div class="col-2 border-bottom border-secondary border-2 pb-3">
                <h3 class="priceProduct"></h3>
            </div>
            <div class="col-1"></div>
            <div class="col-1 border-bottom border-secondary border-2 pb-3">
                <input class="quantityProduct" type="number" value="2">
            </div>
            <div class="col-2 border-bottom border-secondary border-2 pb-3 text-right">
                <button class="btn btn-danger" type="button">Supprimer</button>
            </div>
        </div>`
    rowCart.innerHTML = rowCartContents
    productCart.append(rowCart)
}






function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}



function updateCartTotal() {
    let rowCarts = document.getElementsByClassName("rowCartItem")
    let total = 0
    for (let i = 0; i < rowCarts.length; i++) {
        let rowCart = rowCarts[i]
        let priceProductCart = rowCart.getElementsByClassName("priceProductCart")[0]
        let quantityProductCart = rowCart.getElementsByClassName("quantityProductCart")[0]
        let price = parseFloat(priceProductCart.innerText.replace("€", " "))
        let quantity = quantityProductCart.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName("totalPriceCart")[0].innerText = total + "€"
}


