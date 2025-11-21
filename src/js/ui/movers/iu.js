const listBody = document.getElementById('movers-table-body');
const form = document.getElementById('form-edit-mover');
const formSubmitButton = document.getElementById('form-submit-btn');
const moverIdInput = document.getElementById('mover-id');

export function getFormData() {

    return { 
        driverId: moverIdInput.value ? parseInt(moverIdInput.value) : null,
        name: form.elements['name'].value, 
        email: form.elements['email'].value 
        // Nota: Si estuvieras editando, agregarías aquí el ID oculto.
    };
}

export function fillFormForEdit(user) {
    moverIdInput.value = user.userId;
    form.elements['name'].value = user.fullName;
    form.elements['email'].value = user.email;
    
    formSubmitButton.textContent = 'Guardar Cambios';
}

export function clearForm() {
    form.reset();
    // Restaura el botón a su estado de "Agregar"
    formSubmitButton.textContent = 'Guardar Usuario';
}

export function renderMoverList(movers){
    listBody.innerHTML = "";

    if (movers.length == 0) {
        listBody.innerHTML = '<tr><td colspan="10">No hay Movers registrados.</td></tr>'
        return;
    }

    const html = movers.map(mover => {
        const moverDetails = mover.driver;
        const estateText = mover.active ? 'Habilitado' : 'Deshabilitado'; 
        const estateClase = mover.active ? 'bg-success' : 'bg-secondary'
        
      return  ` <tr>
            <td>${mover.userId}</td>
            <td>${mover.fullName}</td>
            <td>${mover.document}</td>
            <td>${mover.email}</td>
            <td>${mover.phone}</td>
            <td>${mover.createdAt}</td>     
            <td>${moverDetails ? moverDetails.vehicleType : 'N/A'}</td>      
            <td>${moverDetails ? moverDetails.enrollVehicle : 'N/A'}</td>
            <td><span class="badge ${estateClase}">${estateText}</span></td>
            
            <td>
                <a href="mover.html?id=${mover.userId}" class="user-edit btn btn-outline-warning">Editar <i class="fas fa-user-edit"></i></a>
                        <button data-id="${mover.userId}" data-action="delete" 
                    class="btn btn-outline-danger" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-trash"></i> Eliminar
            </button>
            </td>
        </tr>
    ` }).join('');

    listBody.innerHTML = html;
    
}