import { getMovers, getMoverById, updateMover, deleteMovers} from "../../data/movers/data.js";
import { fillFormForEdit, renderMoverList } from "../../ui/movers/iu.js";

const deleteModal =   document.getElementById("staticBackdrop");
const confirmationDeleteButton =  deleteModal ? deleteModal.querySelector('.btn-danger') : null;
const  userId =  null;
const form = document.getElementById('user-form');



async function loadMovers() {
    try {
        const movers = await getMovers();
        renderMoverList(movers);

    } catch (error) {
        console.error("No se pudo cargar la lista de usuarios:", error);
        alert("Error al cargar usuarios. Verifica la conexión con el servidor.");
        renderMoverList([]);
    }
}

async function handleFormSubmit(event) {
    event.preventDefault(); 
    
    // 1. Vista: Obtener datos del formulario (incluye userId)
    const moverData = getFormData(); 
    
    try {
        let response;
        
        if (moverData.userId) {
            // Si el formulario tiene un userId, estamos EDITANDO (PUT)
            response = await updateUser(moverData.userId, moverData); 
            alert(`Usuario ID ${moverData.userId} actualizado con éxito.`);
        } else {
            alert('Usuario creado con éxito.');
        }
    
        await loadMovers(); 
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
            moverIdToDelete = userId;
            const modalTitle = deleteModal.querySelector('#staticBackdropLabel');
            modalTitle.textContent = `Eliminar Usuario ID: ${userId}`;
            
        } else if(action == 'edit'){
            try {
               const mover = await getMoverById(userId); 
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
    if(!moverIdToDelete ) return
    const id = moverIdToDelete;

    try {
        const success = await deleteMovers(id);

        const modalInstance = boostrap.Modal.getInstance(deleteModal) || new bootstrap.Modal(deleteModal);
        modalInstance.hide();

        if (success) {
            await loadData();
            moverIdToDelete = null;
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
loadMovers();
}

document.addEventListener('DOMContentLoaded', loadData);