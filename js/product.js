

//RECUPERATION API


async function getAllCameras(){
    let response = await fetch('http://localhost:3000/api/cameras');
    let cameras = response.json();
    return cameras;//PROMESSE

}
 
getAllCameras().then(function(cameras){
     console.log(cameras);

        
     //structure HTML
     
    
    cameras.forEach( camera =>{

    
        // creation element html

        
        const productList = document.createElement('div');
        productList.setAttribute("class", 'productList');
        console.log(productList);
        
        const label = document.createElement('label');
        label.setAttribute("class", 'label');
        
        const chooseLenses = document.createElement('select');
        chooseLenses.setAttribute("class",'choice');
        
        const selectQuantity = document.createElement('select');
        selectQuantity.setAttribute("class", 'selectQ');


        // mise en place select et option
        let min = 1;
        let max = 5;
        for(let i = min; i <=max; i++ ){
            let selectQ = document.createElement('option');
            selectQ.value = i;
            selectQ.innerHTML = i;
            selectQuantity.appendChild(selectQ);
        }

        let cameras = camera.lenses;
        for (let i = 0; i < cameras.length; i ++){
            let optLenses = document.createElement('option');
            optLenses.setAttribute("class",'choice' );
            optLenses.value = i;
            optLenses.innerHTML = cameras[i];
            chooseLenses.appendChild(optLenses);
        }
        
        // fin select et option


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
        label.textContent = `Optiques : `;
        let prix = document.createElement('p');
        prix.textContent = `Prix : ${camera.price /100 +',00'+ ' €'}`;
        let quantity = document.createElement('p');
        quantity.textContent = 'Quantité : ';
        btn__product.textContent = 'Ajouter au Panier';
        
        

        bloc__image1.appendChild(productList);
        productList.appendChild(image);
        productList.appendChild(id);
        productList.appendChild(nom);
        productList.appendChild(description);
        productList.appendChild(label);
        label.appendChild(chooseLenses);
        productList.appendChild(prix);
        productList.appendChild(quantity);
        quantity.appendChild(selectQuantity);
        productList.appendChild(btn__product);
        
        
        // fin HTML page product


    });
}); 



        

