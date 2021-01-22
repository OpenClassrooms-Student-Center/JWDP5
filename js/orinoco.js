

fetch('http://localhost:3000/api/cameras') 
.then(response => response.json())
.then(json => console.log(json));

