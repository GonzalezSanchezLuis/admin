import { authenticate } from '../../data/users/data.js';

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");
const REDIRECT_URL = 'dashboard.html';

async function handleLogin(event) {
    event.preventDefault();
    const username = loginForm.elements['username'].value;
    const password = loginForm.elements['password'].value;
  
    errorMessage.style.display = 'none';

    const isAuthenticated = await authenticate(username,password);

    if(isAuthenticated){
        window.location.href = REDIRECT_URL;
    }else{
        errorMessage.style.display = 'block';
        loginForm.elements['password'].value = "";
    }
    
}

function init(){
    if(loginForm){
        loginForm.addEventListener("submit",handleLogin);
         errorMessage.style.display = 'none';
    }else{
        console.error("No se encontró el formulario de login");
    }
}

document.addEventListener('DOMContentLoaded',init);
