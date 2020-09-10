class Teddy { // création de la classe teddy
    constructor(teddy) {
        this.id = teddy._id;
        this.name = teddy.name;
        this.price = teddy.price;
        this.color = teddy.color;
        this.description = teddy.description;
        this.image = teddy.imageUrl;
    }

    displayInList() {
        return `<img class="details product__photos" data-id="${this.id}" src="${this.image}" alt="${this.name}">
                <h3 class="details teddy__name" data-id="${this.id}">${this.name}</h3>
                <button id="see__product" class="details product__details btn" data-id="${this.id}"> Voir le produit</button>`
    }

}