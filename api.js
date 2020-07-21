let params = new URLSearchParams(document.location.search);
console.log(params);

let id = params.get('id');
console.log('id= ' + id);

let _id = id;

class Request {
    constructor(onSuccess,onError) {
        this.request = new XMLHttpRequest();
        this.request.onreadystatechange = this.onReadyStateChange.bind(this);
        this.onSuccess = onSuccess;
        this.onError = onError;
    }

    onReadyStateChange() {
        if (this.request.readyState == XMLHttpRequest.DONE && this.request.status == 200) {
            this.onSuccess(JSON.parse(this.request.responseText));
           
            console.log('Connection established');

    }else{
        console.log('Error connection API');
    }
};


get(url) {
    this.request.open('GET', url, true);
    this.request.setRequestHeader('Content-Type', 'application/json')
    this.request.send();
};
post(url,body) {
    this.request.open('POST', url, true);
    this.request.setRequestHeader('Content-Type', 'application/json')
    this.request.send(body);
}
};



class Api {
    list(callback){
        const apiRequest = new Request(function(response) {
            callback(response);
        })
        apiRequest.get('http://localhost:3000/api/cameras');
    }

    details(callback){
        const apiRequest= new Request(function(response) {
            callback(response);
        })
        apiRequest.get('http://localhost:3000/api/cameras/'+id);
    }
    save(callback,body){
        const apiRequest= new Request(function(response) {
            callback(response);
        })
        apiRequest.post('http://localhost:3000/api/cameras/order', JSON.stringify(body));
}
};