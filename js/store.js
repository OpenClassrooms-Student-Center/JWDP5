class Store{
    constructor(key){
       this.key = key;
       const basket = localStorage.getItem(key);
       if (basket === null) {
           localStorage.setItem(key,'[]');
       }
    }
    addProduct(product){
       let products = this.getProducts()
       products.push(product);
           localStorage.setItem(this.key, JSON.stringify(products));
    }
    getProducts(){
       return JSON.parse(localStorage.getItem(this.key));
    }
    addIdProduct(key) {
        products.push(key[i].idCamera);
    }
    addItemPrice(itemCamera){ 
        let itemPrice = itemCamera.price;
        arrayPrice.push(itemPrice);
    } 
    deleteDiv() {
       let key = JSON.parse(localStorage.getItem(this.key));
        if(key === null || key == 0){
            document.getElementById('hide-page').style.display = 'none'; 
            localStorage.removeItem('basket');
            localStorage.removeItem('totalOrder');
            window.location = 'index.html';
        }else{
            document.getElementById('hide-page').style.display = 'block';
        } 
    }  
    nombreIndexPanier() {
        let key = JSON.parse(localStorage.getItem(this.key));
        let indexPanier = document.getElementById("indexPanier");
        indexPanier.textContent = `Panier  (${key.length})`;
        if(key === null || key == 0){
            document.getElementById("btn__cart").style.display = 'none'
        }
    } 
}

class StoreTotal{
    constructor(total){
        this.total = total;
        const totalOrder = localStorage.getItem(total);
        if (totalOrder === null) {
            localStorage.setItem(total,'[]');
        }
    }

    addTotal(totalO){
        let totalsO = this.getTotal()
        totalsO.push(totalO);
            localStorage.setItem(this.total, JSON.stringify(totalsO));
     }
    addTotalOrder(arrayPrice, total){
        let totalPrice = document.getElementById("sum__totals");
        total = 0;
        for(h  = 0; h < arrayPrice.length; h++) {
            total = total + arrayPrice[h];
            totalPrice.textContent =  `${total / 100 * Store.key[i].selectedQ},00€`;
            //STOCK THE PRICE FOR CONFIRMATION PAGE
            localStorage.setItem(this.total, JSON.stringify(this.total));
            }
    } 
    getTotal(){
        return JSON.parse(localStorage.getItem(this.total));
     }     
}