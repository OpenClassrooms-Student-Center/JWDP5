const getArticles = async function(){
  let reponse = await fetch('https://oc-p5-api.herokuapp.com/api/cameras')
  if (reponse.ok){
    var data = await reponse.json();
    console.log(data)
  } 
  else {
    alert('Désolé le serveur ne répond pas !')
  }
  const displayArticle = document.getElementById ('productsContainer');
  response.forEach(data => {   // Création du contenu HTML pour la liste des produits

    const myDiv = document.createElement('div');
    myDiv.className = 'row';

    const myDivEnfantA = document.createElement('div');
    myDiv.className = 'col-lg-4 col-md-6 mb-4';
    myDiv.append(myDivEnfantA);


    const myDivEnfantB = document.createElement('div');
    myDivEnfantB.className = 'card h-100';
    myDivEnfantA.append = (myDivEnfantB);

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = data.imageURL;
    img.innerHTML = `alt='${data.imageURL}' src ='${data.imageURL}' `;
    myDivEnfantB.append(img);

    const myDivEnfantBNewDiv = document.createElement('div');
    myDivEnfantBNewDiv.className = 'card-body';
    myDivEnfantB.append(myDivEnfantBNewDiv);

    const name = document.createElement('h3');
    name.className = 'card-title';
    name.textContent = data.name;
    myDivEnfantBNewDiv.append(name);

    const price = document.createElement('h4');
    price.textContent = data.price / 1000 + '€';
    myDivEnfantBNewDiv.append(price);

    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = data.description;
    myDivEnfantBNewDiv.append(description);

    const bouttonsDiv = document.createElement('div');
    bouttonsDiv.className = 'd-flex justify-content-around align-items-end';
    myDivEnfantBNewDiv.append(bouttonsDiv);


    displayArticle.append(myDiv);


    
  });
};
getArticles();




