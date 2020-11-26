/*appel de l api*/
ajax=(url,method='GET',data={})=>{
    return new Promise((resolve)=>{
        let request=new XMLHttpRequest();
    
        request.onreadystatechange=function(){
            if (this.readyState==XMLHttpRequest.DONE && this.status>=200 && this.status<300) {
                resolve(JSON.parse(this.responseText));
                console.log(resolve);
               };  
        };
  request.open(method,url);
  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(data));
  });
}; 
