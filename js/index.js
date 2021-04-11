//RECUPERATION API

async function getAllCameras(){

    let response = await fetch('http://localhost:3000/api/cameras')
    if(response.ok){
    let cameras = response.json();
    return cameras;//PROMESSE
    
    }else{
        console.error('retour du server :' , response.status);
        alert('Le serveur ne répond pas!');
    }console.log(cameras)
}
 //------------------------------------
getAllCameras().then(function(cameras){
     console.log(window.location);
     console.log(cameras);

     //structure HTML
     
    cameras.forEach(camera =>{

        // creation element html
        const productList = document.createElement('div');
        productList.setAttribute("class", 'productList');
        productList.setAttribute("id" , 'productList');
        console.log(productList);

        let image = document.createElement('img');
        image.src = camera.imageUrl;
        image.setAttribute("alt", 'photo de la camera');
        let id = document.createElement('p');
        id.textContent = `Réf : ${camera._id}`;
        let nom = document.createElement('h2');
        nom.textContent = camera.name;
       
        let a = document.createElement('a');
        a.setAttribute("href" , 'product.html?id=' + camera._id);
        a.setAttribute("id", 'btn__camera');
        a.textContent = `Voir plus de détails`;

        bloc__image1.appendChild(productList);
        productList.appendChild(image);
        productList.appendChild(id);
        productList.appendChild(nom);
        productList.appendChild(a);
        
    });        
        // FIN PRODUCT HTML
});
//-----------------------------------

function loadSpinner(){
    document.querySelector('#cont__spinner').classList.add('hidden');
}

//------------------------
// CLICK TO CART PAGE FROM PANIER HEADER
function clickCart(){
const pageCart = document.getElementById('btn__cart');
pageCart.addEventListener('click', () =>{

    window.location.href = "cart.html";
    });
}
 //---------------------------------------------   
getAllCameras();
setTimeout(loadSpinner, 3000);
clickCart();
store.nombreIndexPanier()