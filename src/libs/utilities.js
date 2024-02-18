export function formatMoney(value) {
    const formattedValue = (value).toFixed(2); // Fixed to two decimal places (cents)
    return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands separator
}