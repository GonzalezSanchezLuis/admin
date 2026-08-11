const API_BASE_URL = 'http://localhost:8080/api/v1'; 

function getHeaders() {
  //  const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        // Envía el token al servidor para que valide la sesión
       // 'Authorization': `Bearer ${token}` 
    };
}

export async function getMoversPayments() {
    try {
        const response = await fetch(`${API_BASE_URL}/payments/admin/pending-drivers`, {
            method: 'GET',
            headers: getHeaders()
        });
        
        if (!response.ok) {
            throw new Error(`Error ${response.status} al obtener usuarios.`);
        }
        
        const data = await response.json(); 
   
        if(data &&  Array.isArray(data.content)){
            return Array.isArray(data) ? data : [];

        }else{
            return [];
        }
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
}