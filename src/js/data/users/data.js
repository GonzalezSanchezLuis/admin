const API_BASE_URL = 'http://localhost:8080/api/v1'; 
const AUTH_KEY = 'isAuthenticated';

export async function authenticate(email, password) {
    const response = await fetch(`${API_BASE_URL}/admin/authenticate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
        const data = await response.json(); 
        localStorage.setItem(AUTH_KEY, 'true');
      //  setAuthToken(data.token); // Almacena el token en el cliente
        return true;
    }
    return false;
}

/*export function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}*/

export function getAuthToken() {
    return localStorage.getItem(AUTH_KEY) === 'true';
   // return localStorage.getItem('authToken');
}

export function clearAuthToken() {
    //localStorage.removeItem('authToken');
    localStorage.removeItem(AUTH_KEY);
}

function getHeaders() {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        // Envía el token al servidor para que valide la sesión
       // 'Authorization': `Bearer ${token}` 
    };
}



export async function getUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users/list/users`, {
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

export async function addUser(userData) {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
         throw new Error(`Error ${response.status} al crear usuario.`);
    }
    
    return await response.json(); 
}

export async function getUserById(id) {
   try {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}/user`,{
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


export async function updateUser(id, userData) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}/update`, {
        method: 'PUT', 
        headers: getHeaders(),
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
         throw new Error(`Error ${response.status} al actualizar usuario.`);
    }
    
    return await response.json(); 
}

export async function deleteUser(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    
    return response.ok || response.status === 204;
}
