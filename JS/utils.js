async function retrieveContent(url) { //Fonction asynchrone qui va récuperer la reponse de l'API.
    const response = await fetch(url);
    const data = await response.json()
    return data;
}