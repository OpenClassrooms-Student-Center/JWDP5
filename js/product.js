

      (async function() {
         const cameras = await getCameras();
         
            for(camera of cameras){
                displayCamera(camera);
                 console.log(camera);
         }
     })();

    function getCameras()  {// RECUPERATION API
    return fetch("http://localhost:3000/api/cameras")
    .then(function(response){
        return response.json();
        })

        .then(function(cameras){ 
            return cameras;
        })
        .catch(function(error){
            alert(error);
        });
    }
  
  
    function displayCamera(camera) {// PERMET DE CLONER LES CAMERAS
        const templateElt = document.getElementById("templateCamera");
        const cloneElt = document.importNode(templateElt.content, true);
        
        cloneElt.getElementById("imageUrl").src = camera.imageUrl;
        cloneElt.getElementById("ref").textContent += camera._id;
        cloneElt.getElementById("name").textContent = camera.name;
        cloneElt.getElementById("description").textContent = camera.description;
        cloneElt.getElementById("lenses").textContent += camera.lenses;
        cloneElt.getElementById("price").textContent += camera.price;
        

        document.getElementById("bloc__image1").appendChild(cloneElt);   
    
}


Object.values(jsonObj)[0].lenses

// AJOUT OPTION QUANTITE



window.onload = function (){

    const selectOpt = document.getElementById('chooseQuantity');
    numbers = ['5', '4' , '3' , '2' , '1'];

    const combo = document.createElement('select');
    
   
    while(numbers.length)

    {
        const nombres = numbers.pop();
        const opt = new Option(nombres, nombres);
        combo.options[combo.options.length] = opt;

   }
    selectOpt.appendChild(combo);
    
}








