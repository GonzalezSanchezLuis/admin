import { sendNotification } from '../../data/notifications/data.js';
import { getNotificationData, showMessage, clearForm } from '../../ui/notifications/ui.js';

const form = document.getElementById('notification-form');

async function handleSendNotification(event) {
    event.preventDefault();

    const notificationData = getNotificationData();

    if (!notificationData.title || !notificationData.body || notificationData.target === 'Aquien quieres enviarles') {
        showMessage('Por favor, completa todos los campos.', 'danger');
        return;
    }

    try {
        const response = await sendNotification(notificationData);
        showMessage('Notificación enviada con éxito.', 'success');
        clearForm();
        console.log('Respuesta del servidor:', response);
    } catch (error) {
        showMessage(`Error al enviar la notificación: ${error.message}`, 'danger');
        console.error(error);
    }
}

function init() {
    if (form) {
        form.addEventListener('submit', handleSendNotification);
    }
}

document.addEventListener('DOMContentLoaded', init);