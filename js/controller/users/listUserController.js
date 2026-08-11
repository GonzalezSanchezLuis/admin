import { getUsers,deleteUser, addUser } from "../../data/users/data.js";
import { fillFormForEdit, renderUserList } from "../../ui/users/iu.js";

const deleteModal =   document.getElementById("staticBackdrop");
const confirmationDeleteButton =  deleteModal ? deleteModal.querySelector('.btn-danger') : null;
const  userId =  null;
const form = document.getElementById('user-form');


function checkAuthAndInit() {

   /* if (!getAuthToken()) {

        window.location.href = LOGIN_URL;
        return; 
    }*/

   // initAppLogic(); 
}

document.addEventListener('DOMContentLoaded', checkAuthAndInit);

async function loadUsers() {
    try {
        const users = await getUsers();
        renderUserList(users);

    } catch (error) {
        console.error("No se pudo cargar la lista de usuarios:", error);
        alert("Error al cargar usuarios. Verifica la conexión con el servidor.");
        renderUserList([]);
    }
}

async function handleFormSubmit(event) {
    event.preventDefault(); 
    
    // 1. Vista: Obtener datos del formulario (incluye userId)
    const userData = getFormData(); 
    
    try {
        let response;
        
        if (userData.userId) {
            // Si el formulario tiene un userId, estamos EDITANDO (PUT)
            response = await updateUser(userData.userId, userData); 
            alert(`Usuario ID ${userData.userId} actualizado con éxito.`);
        } else {
            // Si no tiene userId, estamos CREANDO (POST)
            response = await addUser(userData); 
            alert('Usuario creado con éxito.');
        }
    
        await loadUsers(); 
        clearForm(); 
        
    } catch (error) {
        console.error("Error al guardar/actualizar usuario:", error);
        alert("No se pudo guardar la información del usuario. Verifica los datos y la conexión.");
    }
}

async function handleTableActions(event) {
    const target = event.target;
    const button = target.closest('[data-action="delete"]'); 

    if (button) {
        const action = button.dataset.action;
        const userId = parseInt(button.dataset.userId); 

        if (action === 'delete') {
            userIdToDelete = userId;
            const modalTitle = deleteModal.querySelector('#staticBackdropLabel');
            modalTitle.textContent = `Eliminar Usuario ID: ${userId}`;
            
        } else if(action == 'edit'){
            try {
               const user = await getUserById(userId); 
               if (user) {
                fillFormForEdit(user);
                window.scrollTo({ top: 0, behavior: 'smooth' });
               }
            } catch (error) {
                console.error("Error al cargar datos para editar:", error);
                alert("No se pudo cargar el usuario para edición.");
            }
        }
    }
}

async function handleConfirmDelete() {
    if(!userIdToDelete ) return
    const id = userIdToDelete;

    try {
        const success = await deleteUser(id);

        const modalInstance = boostrap.Modal.getInstance(deleteModal) || new bootstrap.Modal(deleteModal);
        modalInstance.hide();

        if (success) {
            await loadData();
            userIdToDelete = null;
        }else{
            alert(`Error al eliminar el usuario ID ${id}.`);
        }
    } catch (error) {
        console.error("Error de eliminación:", error);
        alert("Ocurrió un error de red al intentar eliminar el usuario.");
    }
}



async function initAppLogic() {
    await loadUsers();
    
    // Asignación de eventos de la Vista
    form.addEventListener('submit', handleFormSubmit);
    listBody.addEventListener('click', handleTableActions); 
    logoutBtn.addEventListener('click', handleLogout);
    
    // **¡NUEVA CONEXIÓN DE EVENTO!**
    if (confirmationDeleteButton) {
        confirmationDeleteButton.addEventListener('click', handleConfirmDelete);
    }
}

function loadData(){
loadUsers();
}

document.addEventListener('DOMContentLoaded', loadData);