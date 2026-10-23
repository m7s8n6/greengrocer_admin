// One icon and one colour tone per order status, shared by every screen that shows order statuses
// (dashboard, settings, …). Tones match the status pills: info / success / warn / error / primary.
// Icons are Bootstrap Icons (served locally, always available).

const STATUS = {
    1: { icon: 'bi bi-credit-card', tone: 'warn' }, // Payment Pending
    2: { icon: 'bi bi-inbox', tone: 'info' }, // Received
    3: { icon: 'bi bi-gear', tone: 'success' }, // Processed
    4: { icon: 'bi bi-box-seam', tone: 'info' }, // Shipped
    5: { icon: 'bi bi-truck', tone: 'primary' }, // Out For Delivery
    6: { icon: 'bi bi-check-circle', tone: 'success' }, // Delivered
    7: { icon: 'bi bi-x-circle', tone: 'error' }, // Cancelled
    8: { icon: 'bi bi-arrow-counterclockwise', tone: 'error' }, // Returned
    9: { icon: 'bi bi-clock', tone: 'warn' }, // Pending
    10: { icon: 'bi bi-bag-check', tone: 'success' }, // Ready for Pickup
    11: { icon: 'bi bi-check2-all', tone: 'success' }, // Picked Up
};

export function statusIcon(statusId) {
    const s = STATUS[Number(statusId)];
    return s ? s.icon : 'bi bi-circle';
}

export function statusTone(statusId) {
    const s = STATUS[Number(statusId)];
    return s ? s.tone : 'info';
}
