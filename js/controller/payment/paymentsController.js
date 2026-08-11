import { getMoversPayments } from '../../data/payment/data.js';
import { renderPaymentsTable} from '../../ui/payment/ui.js';

export async function loadPendingPayments() {
    try {
        const payments = await getMoversPayments();
        renderPaymentsTable(payments);
    } catch (error) {
        console.error('Error cargando pagos pendientes', error);
    }
}

function loadData(){
loadPendingPayments()
}

document.addEventListener('DOMContentLoaded', loadData);
