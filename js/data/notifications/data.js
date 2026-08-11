const API_BASE_URL = 'http://localhost:8080/api/v1/admin';
//const API_BASE_URL = 'https://api.heimapp.com.co/api/v1/admin';

function getHeaders() {
    // const token = getAuthToken(); // Si necesitas autenticación, descomenta esto
    return {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
    };
}

export async function sendNotification(notificationData) {
    const response = await fetch(`${API_BASE_URL}/notifications/send`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(notificationData)
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status} al enviar la notificación.`);
    }

    return await response.text();
}