//VALID FORM
document.forms["form"].addEventListener("submit",(e) => {

    let error;
    let inputs = document.getElementsByTagName("input");

        for (let i = 0; i < inputs.length; i++){
            
            if (!inputs[i].value){
               error = "Veuillez compléter le formulaire";
               break;// STOP THE LOOP

            }
        } 

        if (error){
            e.preventDefault();
           document.getElementById("error").innerHTML = error;
           return false;
       } 
    });

    // CREATE HTML

    const title__cart = document.createElement('h2');
    title__cart.setAttribute("class", 'title');
    title__cart.textContent = `Article(s) Selectionné(s)`;
    
    title.appendChild(title__cart);
    

//STORE INFORMATIONS



    