const browseCamerasButton = document.getElementById("browseCameras");
const mainContent = document.getElementsByTagName("main");
const hero = document.getElementById("hero");
let productsListAnchor;

// onload animations
window.onload = () => {
    document.getElementById("fadeIn").style.opacity = 1;
    document.getElementById("slideIn").style.transform = "translateX(0)";
};


// MAKES REQUESTS TO SERVER
const makeRequest = (verb, url, data) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(verb, url);

        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status === 201) {
                    resolve(JSON.parse(request.response));
                } else {
                    reject(JSON.parse(request.response));
                }
            }
        };

        if (verb === "POST") {
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify(data));
        } else {
            request.send();
        }
    });
};


// CREATES NEW LI ELEMENT IN PRODUCTS LIST
const createProductsList = async () => {
        try {
            // makes http GET request 
            const response = await makeRequest("GET", "http://localhost:3000/api/cameras");   
            console.log(response);         
            
            // CREATES NEW ARTICLE ELEMENT
                let newArticle = document.createElement("article");
                let newProductList = document.createElement("ul");
                newArticle.innerHTML = `<h2 class="display-5 mb-5 mt-5" id="productsList">Vintage Camera Products List</h2>`;
                newArticle.classList.add("container-fluid", "d-flex", "flex-row", "flex-wrap", "justify-content-center", "mt-2", "p-3");
                newArticle.appendChild(newProductList);
                newProductList.classList.add("container-fluid", "d-flex", "flex-column", "flex-lg-row", "justify-content-lg-between", "flex-wrap");
                newProductList.setAttribute("id", "camerasList");
    
                
            // For each object in the response array, creates new li element
                response.forEach(camera => {
                    let newItem = document.createElement("li");
                    newItem.classList.add("d-flex", "flex-column", "card", "shadow", "mb-4", "ms-4");
                    newItem.innerHTML = `
                        <a href="product-${camera._id}.html">
                            <img class="camera-image" src="${camera.imageUrl}" alt="${camera.name} camera's image" width="250px" height="166px">
                            <h3 class="card-title p-2">${camera.name.toUpperCase()}</h3>
                        </a>
                        `;
                    newProductList.appendChild(newItem); 
                });

                //appends new Article section to main element
                mainContent[0].appendChild(newArticle);

                // Products Animated Appeareance on page
                hero.style.height = "70vh";
                productsListAnchor = document.getElementById("productsList");
                setTimeout(() => {
                    productsListAnchor.scrollIntoView({behavior: "smooth", block: "start"});
                }, 1000);
            
        } catch(error) {
            alert("Sorry, something went wrong! Try again. Type of error: " + error);
            console.log(error);
        }
};



browseCamerasButton.addEventListener("click", createProductsList, { once: true });





 