
// CLICK FOOTER
const btn__footer2 = document.getElementById('btn__footer2');
const overlay2 = document.getElementById('overlay2');
const btn__close2 = document.getElementById('btn__close2');
const btn__footer1 = document.getElementById('btn__footer1');
const overlay = document.getElementById('overlay');
const btn__close = document.getElementById('btn__close');

btn__footer1.addEventListener('click',openModal1);
btn__close.addEventListener('click', closePopup1);
btn__footer2.addEventListener('click',openModal2);
btn__close2.addEventListener('click',closePopup2);

function openModal1(){
    overlay.style.display = 'block'; 
}

function closePopup1(){
    overlay.style.display ='none';
    
}

function openModal2(){
   
    overlay2.style.display= 'block';
}

function closePopup2(){
   
    overlay2.style.display ='none';
}