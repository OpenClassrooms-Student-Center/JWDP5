class Teddy { // création de la classe teddy
    constructor(teddy) {
        this.id = teddy._id;
        this.name = teddy.name;
        this.price = teddy.price;
        this.color = teddy.colors;
        this.description = teddy.description;
        this.image = teddy.imageUrl;
    }


    displayInList() {
        let card = document.createElement('div');
        card.innerHTML =  `<div class="card"><img class="details product__photos" data-id="${this.id}" src="${this.image}" alt="${this.name}">
                <h3 class="details teddy__name" data-id="${this.id}">${this.name}</h3>
                <button class="details product__details btn" data-id="${this.id}"> Voir le produit</button></div>`;

       return card;
    }

    displayDetails() {
        return `<img id="photo" class="product__photos" data-id="${this.id}" src="${this.image}" alt="product photo">
                <h3 id="teddy__name">${this.name}</h3>
                <p class="product__description"> <strong> Description : ${this.description}</strong></p>
                <form id="sheet__form">
                <label for="color_select">Choix de la couleur</label><br>
                <select id="color_select" required>
                <option value=""> - Couleur - </option></select><br><br>
                <label for="color_select">Choix de la Quantité</label><br>
                <select id="quantity_select" required>
                <option value=""> - Quantité - </option></select>
                <p id="price" class="product__price"> <strong> Prix : ${this.price/100},00 €</strong></p>
                <button id="add__to__cart" class="product__add__to__cart"> <strong> Ajouter au panier</strong></button>
                </form>`
    }

}