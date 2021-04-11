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
    addItemPrice(itemCamera,key){ 
        let itemPrice = itemCamera.price*key[i].selectedQ;
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
        indexPanier.textContent = `Panier (${key.length})`;
        if(key === null || key == 0){
            document.getElementById("btn__cart").style.display = 'none';
        }
    } 
    reset(){
        localStorage.setItem(this.key,'[]');
    }
}    
   
    
const store = new Store ('basket');

