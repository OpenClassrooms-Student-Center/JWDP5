//api url

const api = "http://localhost:3000/api/teddies";

//getting DOM elements
const productListing = document.getElementById('product-listing');
const teddyName = document.getElementsByClassName('teddyBearName');
const teddyPrice = document.getElementsByName('teddyBearPrice');
const teddyDescription = document.getElementsByName('teddyBearDescription');
const teddyImg = document.getElementsByName('teddyImage');
const teddyColors = document.getElementsByName('teddyBearColors');


let displayProduct = () => {
    apiRequest.open('GET', api);
    apiRequest.send();
};

//main listing apiRequest
let apiRequest = new XMLHttpRequest();

apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4) {
        if (apiRequest.status === 404) {
            return "products not found";
        }
        if (apiRequest.status === 200 || apiRequest.status === 201) {
            const response = JSON.parse(apiRequest.response);
            for (var product of response) {
                productListing.innerHTML += "<div class='products' id='" + product._id + "'><img src='" + product.imageUrl + "' width='150' height='125'><h4><a href='singleItem.html/" + product._id + "'>" + product.name + "</a></h4><h5>$" + product.price + "</h5></div>";
            }
        }
    }
};