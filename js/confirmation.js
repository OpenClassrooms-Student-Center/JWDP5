
//GET INFO TO SEND TO CONFIRM PAGE

function addConfirmOrder() {
    const confirmId = localStorage.getItem("orderConfId");
    const textConfirm = document.getElementById('orderId');
    textConfirm.textContent = confirmId;
    const totalPrice = localStorage.getItem("totalOrder");
    const confirmPrice = document.getElementById("total__order");
    confirmPrice.textContent = totalPrice/100 + ',00' + '€';

}
//---------------------------------------


//-----------------------------------------
function resetPageConf() {

    let btnCancel = document.getElementById('returnAccueil');
    btnCancel.addEventListener('click', () => {
        
        localStorage.removeItem("orderConfId");
        localStorage.removeItem("totalOrder");
        window.location.href = 'index.html';
    })
}
//----------------------------


addConfirmOrder();

resetPageConf();