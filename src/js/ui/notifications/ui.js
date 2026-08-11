const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const targetSelect = document.getElementById('target');
const messageContainer = document.getElementById('message-container');

export function getNotificationData() {
    return {
        title: titleInput.value,
        body: bodyInput.value,
        target: targetSelect.value
    };
}

export function showMessage(message, type = 'success') {
    messageContainer.textContent = message;
    messageContainer.className = `alert alert-${type}`;
    messageContainer.style.display = 'block';
}

export function clearForm() {
    titleInput.value = '';
    bodyInput.value = '';
    targetSelect.selectedIndex = 0;
}