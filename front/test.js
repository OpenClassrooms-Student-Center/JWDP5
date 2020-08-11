let productsContainer = document.getElementById('productsContainer');         // variable pour insérer la liste des produits de la page index 
productsContainer.innerHTML = 
    ` <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="images/vcam_1.jpg" alt=""></a>
              <div class="card-body" id="modif_color">
                <h3 class="card-title" >
                  <a href="#" id="name"></a>
                </h3>
                <h5 id="price">Prix : 138 €</h5>
                <p  class="card-text" id="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                <div class="d-flex justify-content-around align-items-end">
                  <button  type="button" id ="ajouter" class="ajouter btn btn-outline-secondary"><i class="fas fa-cart-plus"></i></button>
                  <button type="button" class="btn btn-outline-info ml-auto mr-auto">Voir le produit</button>
                  <button  type="button" id="retirer" class="retirer btn btn-outline-secondary"><i class="fas fa-minus-square"></i></button></div>
              </div>
            </div>
          </div>
      </div>`;


let por = document.getElementById('modif_color');
por.style.color = "#f26659";
por.style.fontWeight = "bold";

const newElt = document.createElement("div"); // Création d'un nouvelle element div 
por.appendChild(newElt); // ajout de cette element <div>  au partent ayant pour id "por"



--------------------------




function Products (id,pic,name,price,description){ // 
    this.id = id,
    this.pic = pic,
    this.name = name,
    this.price = price,
    this.description = description
};

var request = new XMLHttpRequest();
request.open("GET", "https://oc-p5-api.herokuapp.com/api/cameras");
request.send();

let products = [];
products.push(request);

function populateTableListe(){
    let listeProducts = " ";

    products.forEach(prod =>
    listeProducts += ` <p>bonjour</p>
};

    document.getElementById('productsContainer').innerHTML = listeProducts;


    -------------------------------------------------


    
var appareilPhoto = function (url) {
  return new Promise(function (resolve,reject) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {

      if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        resolve(xhr.responseText);
      }
      else{
        reject(xhr);
        alert('Désolé. Le serveur ne répond pas !')
      };
    };
  xhr.open('GET','https://oc-p5-api.herokuapp.com/api/cameras', true);
  xhr.send();
  });
};

let productsContainer = document.getElementById('productsContainer');         // variable pour insérer la liste des produits de la page index 
productsContainer.innerHTML = 
    ` <div class="row">
          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="images/vcam_1.jpg" alt=""></a>
              <div class="card-body" id="por">
                <h3 class="card-title" >
                  <a href="#" id="name"></a>
                </h3>
                <h5 id="price">Prix : 138 €</h5>
                <p  class="card-text" id="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur!</p>
                <div class="d-flex justify-content-around align-items-end">
                  <button  type="button" id ="ajouter" class="ajouter btn btn-outline-secondary"><i class="fas fa-cart-plus"></i></button>
                  <button type="button" class="btn btn-outline-info ml-auto mr-auto">Voir le produit</button>
                  <button  type="button" id="retirer" class="retirer btn btn-outline-secondary"><i class="fas fa-minus-square"></i></button></div>
              </div>
            </div>
          </div>
      </div>`;


let por = document.getElementById('por');
por.style.color = "#f26659";
por.style.fontWeight = "bold";

const newElt = document.createElement("div"); // Création d'un nouvelle element div 
por.appendChild(newElt); // ajout de cette element <div>  au partent ayant pour id "por"






