import { getMoverById, updateMover } from "../../data/movers/data.js";

const form = document.getElementById('form-edit-mover'); 
const moveIdInput = document.getElementById('moverId');
const emailInput = document.getElementById('mover-email-input');
const fullNameInput = document.getElementById('mover-fullName-input');
const documentInput = document.getElementById('mover-document-input');
const phoneInput = document.getElementById('mover-phone-input');
const vehicleTypeInput = document.getElementById('mover-vehicleType-input');
const enrollVehicleInput = document.getElementById('mover-enrollVehicle-input');
const licenseNumber = document.getElementById('mover-licenseNumber-input');
const activeSwitch = document.getElementById('mover-active-switch');
const saveButton = document.getElementById('save-user-btn');
const statusContainer = document.getElementById('mover-status-container');


function getMoverIdFromUrl(){
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

async function loadMoveData(userId) {
    if (!userId) {
        console.error("ID de usuario no encontrado en la URL.");
        // Opcional: Redirigir si no hay ID.
        // window.location.href = 'user-list.html';
        return;
    }
      console.log(userId);
    
    try {
        const mover = await getMoverById(userId); 
        if (mover) {
            if (activeSwitch) {
                activeSwitch.checked = String(mover.active).toLowerCase() === 'true';
                updateStatusColor(mover.active);
            }
            console.log(mover.driver)

            const driverData = mover.driver;

            moveIdInput.value = mover.userId;
            fullNameInput.value = mover.fullName;
            emailInput.value = mover.email;
            documentInput.value = mover.document;
            phoneInput.value = mover.phone;

            if(driverData){
                vehicleTypeInput.value = driverData.vehicleType
                enrollVehicleInput.value = driverData.enrollVehicle
                licenseNumber.value = driverData.licenseNumber

            }else{
                console.warn("Advertencia: El usuario encontrado no tiene datos de conductor anidados.");
            }
            
        } else {
            alert("No se encontró el usuario solicitado.");
        }
    } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
    }
}

async function handleUpdateSubmit(event) {
    event.preventDefault(); 
    const userId = parseInt(moveIdInput.value); 
    console.log("ESTE ES EL ID DEL USUARIO " + userId);
    
    if (!userId) {
        alert("Error: ID de usuario no encontrado.");
        return;
    }
    const driverData = {
        id: document.getElementById('moverId').value, 
        licenseNumber :document.getElementById('mover-licenseNumber-input').value, 
        vehicleType: document.getElementById('mover-vehicleType-input').value,
        enrollVehicle: document.getElementById('mover-enrollVehicle-input').value,

    }
    console.log("DRIVER DATA" + driverData.licenseNumber)

    const moverDataToSend = {
        'email': emailInput.value,
        'fullName': fullNameInput.value,
        'document': documentInput.value,
        'phone': phoneInput.value,
        'active': activeSwitch.checked, 
        driver : driverData
    };
   
    try {

        const updatedMover = await updateMover(userId, moverDataToSend);

        // 3. Manejar el éxito: Mostrar mensaje y redirigir
        alert(`Usuario ${updatedMover.fullName} (ID: ${userId}) actualizado con éxito.`);
        
        window.location.href = 'movers.html'; 

    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        alert("Ocurrió un error al intentar guardar los cambios. Verifique la conexión con el servidor.");
    }
}



function init() {
    const userId = getMoverIdFromUrl();
    if (userId) {
        loadMoveData(userId);
    }
    
    // Aquí también podrías añadir el listener para guardar los cambios del formulario
    form.addEventListener('submit', handleUpdateSubmit);
}

document.addEventListener('DOMContentLoaded', init);