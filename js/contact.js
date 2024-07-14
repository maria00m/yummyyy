let inputName= document.getElementById('inputName');
let inputEmail= document.getElementById('inputEmail');
let inputNumber= document.getElementById('inputNumber');
let inputAge= document.getElementById('inputAge');
let inputPass= document.getElementById('inputPass');
let inputRepass = document.getElementById('inputRepass');

let regexs ={
    inputName: /^[a-zA-Z]+$/,
    inputEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    inputNumber: /^\d+$/,
    inputAge:/^(?:1[01][0-9]|120|[1-9]?[0-9])$/,
    inputPass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W\_])[0-9a-zA-Z\S]{8,}$/,
    inputRepass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W\_])[0-9a-zA-Z\S]{8,}$/,
}
inputName.addEventListener('input', function(e){
   validateInput(e.target);
})
inputEmail.addEventListener('input', function(e){
   validateInput(e.target);
})
inputNumber.addEventListener('input', function(e){
   validateInput(e.target);
})
inputAge.addEventListener('input', function(e){
   validateInput(e.target);
})
inputPass.addEventListener('input', function(e){
   validateInput(e.target);
})
inputRepass.addEventListener('input', function(e){
   validateInput(e.target);
})
3

function validateInput(target){
    
    let check = regexs[`${target.id}`].test(target.value)

    if(check){
        
        target.nextElementSibling.style.display = 'none'
    }else{
        
        target.nextElementSibling.style.display = 'block'       
    }
}