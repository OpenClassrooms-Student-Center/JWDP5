
//RECUPERATION API
async function getAllCameras(){
    let response = await fetch('http://localhost:3000/api/cameras');
    let cameras = response.json();
    return cameras;

}



getAllCameras().then(function(cameras){
     console.log(cameras);

        
     //structure HTML
     
    cameras.forEach( camera =>{

        const productList = document.createElement('div');
        productList.setAttribute("class", 'productList');
        console.log(productList);
        bloc__image1.appendChild(productList);

        const btn__product = document.createElement('button');
        btn__product.setAttribute("class", 'btn__product');
       
        

        let image = document.createElement('img');
        image.src = camera.imageUrl;
        let id = document.createElement('p');
        id.textContent = `Réf : ${camera._id}`;
        let nom = document.createElement('h2');
        nom.textContent = camera.name;
        let description = document.createElement('p');
        description.textContent = camera.description;
        let lenses = document.createElement('p');
        lenses.textContent = `Lenses : ${camera.lenses}`;
        let quantity = document.createElement('p');
        quantity.textContent = 'Quantité :';
        btn__product.textContent = 'Ajouter au Panier';
        
        
        console.log(id);

       
        productList.appendChild(image);
        productList.appendChild(id);
        productList.appendChild(nom);
        productList.appendChild(description);
        productList.appendChild(lenses);
        productList.appendChild(quantity);
        productList.appendChild(btn__product);
        
     

    })


 })   
    

  

