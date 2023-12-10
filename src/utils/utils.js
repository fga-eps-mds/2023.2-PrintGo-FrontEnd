export function extractDate(dateString) {
    const data = new Date(dateString);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses são zero-indexed
    const ano = String(data.getFullYear()).slice(2); // Obtendo os dois últimos dígitos do ano

    return `${dia}/${mes}/${ano}`;
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    let month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}