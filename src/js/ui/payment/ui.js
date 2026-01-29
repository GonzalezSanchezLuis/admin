const tableBody = document.getElementById('movers-table-payments');
const emptyMessage = document.getElementById('emptyMessage');

export function renderPaymentsTable(payments) {
    tableBody.innerHTML = '';

    if (!payments || payments.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    }

    emptyMessage.style.display = 'none';

    payments.forEach(p => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${p.driverId}</td>
            <td>${formatCurrency(p.pendingBalance)}</td>
            <td>${p.paymentMethod}</td>
            <td>${p.accountNumber}</td>
            <td>
                <button data-driver="${p.driverId}">
                    Pagar
                </button>
            </td>
        `;

        row.querySelector('button')
           .addEventListener('click', () => onPayClick(p));

        tableBody.appendChild(row);
    });
}

function onPayClick(payment) {
    const confirmed = confirm(
        `¿Confirmar pago de ${formatCurrency(payment.pendingBalance)} ` +
        `al conductor ${payment.driverId}?`
    );

    if (!confirmed) return;

    // aquí luego llamas al POST /admin/payout
    console.log('Pago confirmado:', payment);
}

function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(value);
}
