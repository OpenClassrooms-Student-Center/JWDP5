if (!localStorage.getItem('panier')) {  // Création du panier (appliqué sur chaque page js)
    localStorage.setItem('panier', JSON.stringify([]))  
}

let nbresArticles = 0;      // variables du nombre total d'articles affichés dans le panier partant de 0

let affichagePanier = document.getElementById('affichagePanier'); // variable pour afficher le nombre d'artile(s)


for (let i = 0; i < panierAjout.length; i++) {                  // Pour obtenir les paires clé/valeur du panier en localStorage
        
    const articleDansPanier = panierAjout[i];

    const elementId = articleDansPanier.elementId;                  // ** Creation de constante en fonction des elements à récupérer
    const elementlenses = articleDansPanier.elementlenses;
    const elementQuantity = articleDansPanier.elementQuantity;

    panierAjout.forEach(article => {
        if ( article.elementQuantity === elementQuantity && article.elementlenses === elementlenses){     
        nbresArticles += elementQuantity;
        }
        console.log(nbresArticles);
    });

    affichagePanier.textContent = nbresArticles;
};

if  ( nbresArticles <= 1) {
articlepluriel.textContent = 'Article';
}else
{
articlepluriel.textContent = 'Articles';    
};