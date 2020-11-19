/*appel de l api*/
getnewproduits=(url,method='GET',data={})=>{
    return new Promise((resolve)=>{
    var request=new XMLHttpRequest();
    
    request.onreadystatechange=function(){
        if (this.readyState==XMLHttpRequest.DONE && this.status==200) {
            resolve(JSON.parse(this.responseText));
            console.log(resolve);
 };  
};
request.open(method,url);
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify(data));
});
}; 
postnewformulaire=(url,method='POST',data={products,contact})=>{
	return new Promise((resolve)=>{
	var request=new XMLHttpRequest();

	request.onreadystatechange=function() {
   		 if (this.readyState==XMLHttpRequest.DONE && this.status==201){
       	 resolve(JSON.parse(this.responseText));
        localStorage.setItem('orderid',response.orderId);
        
        /*lien vers la page confirmation*/
        document.location.href="confirmation.html";
    };    
};
request.open(method,url);
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify(data));
  });
};
