export function TelefoneMaskFunction(telefone: string) {
    // Remove todos os caracteres não numéricos
    telefone = telefone.replace(/\D/g, "");

    if (telefone.length === 10) {
        // Mascara para telefone com 10 dígitos
        return telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else if (telefone.length === 11) {
        // Mascara para telefone com 11 dígitos
        return telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
    } else {
        return telefone; // Retorna o valor original caso o tamanho não seja 10 ou 11
    }
}