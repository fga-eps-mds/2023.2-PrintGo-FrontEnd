export function extractDate(dateString) {
    const data = new Date(dateString);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses são zero-indexed
    const ano = String(data.getFullYear()).slice(2); // Obtendo os dois últimos dígitos do ano

    return `${dia}/${mes}/${ano}`;
}