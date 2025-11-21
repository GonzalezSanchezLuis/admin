const API_BASE_URL = 'http://localhost:8080/api/v1'; 


function getHeaders() {
    return {
        'Content-Type': 'application/json',
        // Envía el token al servidor para que valide la sesión
       // 'Authorization': `Bearer ${token}` 
    };
}



export async function getMovers() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/drivers/list/drivers`, {
            method: 'GET',
            headers: getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status} al obtener usuarios.`);
        }
        
        const data = await response.json(); 

        if(data &&  Array.isArray(data.content)){
            return data.content;
        }else{
            return [];
        }
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
}



export async function getMoverById(id) {
   try {
    const response = await fetch(`${API_BASE_URL}/admin/drivers/${id}/driver`,{
        method:"GET",
        headers: getHeaders()
    });
    if (!response.ok) {
            throw new Error(`Error ${response.status} al obtener usuario.`);
        }

    return await response.json();

   } catch (error) {
    console.error(`Error al obtener usuario ID ${id}:`, error);
        return null;
   } 
}


export async function updateMover(id, userData) {
    const response = await fetch(`${API_BASE_URL}/admin/drivers/${id}/update`, {
        method: 'PUT', 
        headers: getHeaders(),
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
         throw new Error(`Error ${response.status} al actualizar usuario.`);
    }
    
    return await response.json(); 
}

export async function deleteMovers(id) {
    const response = await fetch(`${API_BASE_URL}/drivers/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    
    return response.ok || response.status === 204;
}
