/*DEFINIMOS ALGUNAS FUNCIONES PARA GENERAR DATOS RANDOM*/
function generarEmail() {
    const tiempoActual = Date.now();
    return `test${tiempoActual}@gmail.com`;
}

function generarDNI() {
    // Genera un DNI de 8 dígitos
    const dni = Math.floor(Math.random() * 90000000) + 10000000;
    return dni.toString();
}

function generarTelefono(){
    const numeroTelefono = Math.floor(Math.random()*9000000000) + 1000000000;
    return numeroTelefono.toString()

}

function generarCUIT(){
    const prefijo = Math.floor(Math.random() * 2) + 20; // genera 20 o 21
    const dni = Math.floor(Math.random() * 90000000) + 10000000; // 8 dígitos
    const digitoVerificador = Math.floor(Math.random() * 10); // 0 al 9
    return `${prefijo}${dni}${digitoVerificador}`;

}

export { generarCUIT, generarDNI, generarEmail, generarTelefono };
