let nombreArticlePanier =  0;            // variable pour connaître le nombre d'article dans le panier

let affichagePanier = document.getElementById('affichagePanier'); // variable pour afficher le nombre d'artile(s)
affichagePanier.innerHTML =  nombreArticlePanier ; 

let ajoutPanier = document.querySelector('ajouter'); // variable associer au bouton + pour l'ajout au panier 

let retirerPanier = document.querySelector('retirer'); // variable associer au bouton - pour retirer du panier 

let articlepluriel = document.getElementById('articlepluriel');           // variable pour passer Article au pluriel quand il y as plus d'un article
articlepluriel.innerHTML = 'Article';

// On écoute l'événement click 
ajoutPanier.addEventListener('click',function(event){ 
  nombreArticlePanier ++;     // on ajouter 1 au panier au clique 
  affichagePanier.innerHTML =  nombreArticlePanier;   // on affiche le nombre d'articles du panier apres l'ajout
  if (nombreArticlePanier > 1){
  articlepluriel.innerHTML = 'Articles';
}
else{
articlepluriel.innerHTML = 'Article';
};
});

// On écoute l'événement click 
retirerPanier.addEventListener('click',function(event){ 
  nombreArticlePanier --;     // on ajouter 1 au panier au clique 
  affichagePanier.innerHTML = nombreArticlePanier;   // on affiche le nombre d'articles du panier apres l'ajout
  if (nombreArticlePanier > 1){
  articlepluriel.innerHTML = 'Articles';
}
else{
articlepluriel.innerHTML = 'Article';
};
});










 



