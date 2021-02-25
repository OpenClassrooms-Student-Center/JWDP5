//RECUPERATION API


async function getAllCameras(){
    let response = await fetch('http://localhost:3000/api/cameras/');
    let cameras = response.json();
    return cameras;//PROMESSE

}
 
getAllCameras().then(function(cameras){
     console.log(window.location);
     console.log(cameras);

        
     //structure HTML
     
    
    cameras.forEach( camera =>{

    
        // creation element html

        
        const productList = document.createElement('div');
        productList.setAttribute("class", 'productList');
        productList.setAttribute("id" , 'productList');
        console.log(productList);

        let image = document.createElement('img');
        image.src = camera.imageUrl;
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


// CLICK TO CART PAGE FROM PANIER HEADER
const pageCart = document.getElementById('btn__cart');
pageCart.addEventListener('click', function (){
    window.location.href = "cart.html";
    });
