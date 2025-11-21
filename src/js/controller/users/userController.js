import { getUserById, updateUser } from "../../data/users/data.js";

const form = document.getElementById('user-form-edit'); 
const userIdInput = document.getElementById('user-id');
const emailInput = document.getElementById('user-email-input');
const fullNameInput = document.getElementById('user-fullname-input');
const documentInput = document.getElementById('user-document-input');
const phoneInput = document.getElementById('user-phone-input');
const activeSwitch = document.getElementById('user-active-switch');
const saveButton = document.getElementById('save-user-btn');
const statusContainer = document.getElementById('user-status-container');


function getUserIdFromUrl(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    console.log("ESTE ES EL id del suaurio " + id)
    return id ? parseInt(id) : null
    
}

function updateStatusColor(isActive) {
    if (!statusContainer) return;
    
    // 1. Quita las clases anteriores
    statusContainer.classList.remove('bg-success', 'bg-secondary');
    
    // 2. Aplica la nueva clase
    if (isActive) {
        statusContainer.classList.add('bg-success'); 
    } else {
        statusContainer.classList.add('bg-secondary'); 
    }
}

async function loadUserData(userId) {
    if (!userId) {
        console.error("ID de usuario no encontrado en la URL.");
        // Opcional: Redirigir si no hay ID.
        // window.location.href = 'user-list.html';
        return;
    }
      console.log(userId);
    
    try {
        const user = await getUserById(userId); 
        if (user) {
            if (activeSwitch) {
                activeSwitch.checked = String(user.active).toLowerCase() === 'true';
                updateStatusColor(user.active);
            }

            userIdInput.value = user.userId;
            fullNameInput.value = user.fullName;
            emailInput.value = user.email;
            documentInput.value = user.document;
            phoneInput.value = user.phone;
            
        } else {
            alert("No se encontró el usuario solicitado.");
        }
    } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
    }
}

async function handleUpdateSubmit(event) {
    event.preventDefault(); 
    const userId = parseInt(userIdInput.value); 
    console.log("ESTE ES EL ID DEL USUARIO " + userId);
    
    if (!userId) {
        alert("Error: ID de usuario no encontrado.");
        return;
    }

    const userDataToSend = {
        'email': emailInput.value,
        'fullName': fullNameInput.value,
        'document': documentInput.value,
        'phone': phoneInput.value,
        'active': activeSwitch.checked 
    };

    try {

        const updatedUser = await updateUser(userId, userDataToSend);

        // 3. Manejar el éxito: Mostrar mensaje y redirigir
        alert(`Usuario ${updatedUser.fullName} (ID: ${userId}) actualizado con éxito.`);
        
        window.location.href = 'users.html'; 

    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        alert("Ocurrió un error al intentar guardar los cambios. Verifique la conexión con el servidor.");
    }
}



function init() {
    const userId = getUserIdFromUrl();
    if (userId) {
        loadUserData(userId);
    }
    
    // Aquí también podrías añadir el listener para guardar los cambios del formulario
    form.addEventListener('submit', handleUpdateSubmit);
}

document.addEventListener('DOMContentLoaded', init);