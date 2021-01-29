
//RECUPERATION API
fetch("http://localhost:3000/api/cameras")
    .then((response) =>
        response.json()
    .then((data) => { 
        console.log(data);
        let affichage = '<div>';
        for(let camera of data){
            
            affichage += `<img src=" ${camera.imageUrl}"/>`;
            affichage += `<p> ref : ${camera._id}</p>`;
            affichage += `<h2> ${camera.name}</h2>`;
            affichage += `<p> ${camera.description}</p>`;
            affichage += `<p> Lenses : ${camera.lenses}</p>`;
            affichage += `<p> Prix : ${camera.price}</p>`;
            affichage += `<p> Quantity :
                <select><option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select></p>`;
                
            affichage += `<button class="btn__product">Ajouter au panier</button>`;
        }
            affichage += '</div>';
            document.querySelector("#bloc__image1").innerHTML = affichage;
        })
        .catch(function(error){
            alert(error);
    }));

   
    














