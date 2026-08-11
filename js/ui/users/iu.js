const listBody = document.getElementById('user-table-body');
const form = document.getElementById('user-form-edit');
const formSubmitButton = document.getElementById('form-submit-btn');
const userIdInput = document.getElementById('user-id');

export function getFormData() {

    return { 
        userId: userIdInput.value ? parseInt(userIdInput.value) : null,
        name: form.elements['name'].value, 
        email: form.elements['email'].value 
        // Nota: Si estuvieras editando, agregarías aquí el ID oculto.
    };
}

export function fillFormForEdit(user) {
    userIdInput.value = user.userId;
    form.elements['name'].value = user.fullName;
    form.elements['email'].value = user.email;
    
    formSubmitButton.textContent = 'Guardar Cambios';
}

export function clearForm() {
    form.reset();
    // Restaura el botón a su estado de "Agregar"
    formSubmitButton.textContent = 'Guardar Usuario';
}

export function renderUserList(users){
    listBody.innerHTML = "";

    if (users.length == 0) {
        listBody.innerHTML = '<tr><td colspan="10">No hay usuarios registrados.</td></tr>'
        return;
    }

    const html = users.map(user => {
        const estateText = user.active ? 'Habilitado' : 'Deshabilitado'; 
        const estateClase = user.active ? 'bg-success' : 'bg-secondary'
        
      return  ` <tr>
            <td>${user.userId}</td>
            <td>${user.fullName}</td>
            <td>${user.document}</td>
            <td>${user.email}</td>
            <td><span class="badge ${estateClase}">${estateText}</span></td>
            <td>
                <a href="user.html?id=${user.userId}" class="user-edit btn btn-outline-warning">Editar <i class="fas fa-user-edit"></i></a>
                        <button data-id="${user.userId}" data-action="delete" 
                    class="btn btn-outline-danger" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-trash"></i> Eliminar
            </button>
            </td>
        </tr>
    ` }).join('');

    listBody.innerHTML = html;
    
}