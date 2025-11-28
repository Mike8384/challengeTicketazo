function generateRandomTitle (length = 10, prefix = 'Titulo') {
     if (typeof length !== 'number' || length <= 0) {
     throw new Error('La longitud debe ser un número positivo.');
  }

     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     let randomPart = '';
     for (let i = 0; i < length; i++) {
     randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
     return `${prefix}_${randomPart}`;
}

function getDatePlus7() {
  const d = new Date();
  d.setDate(d.getDate() + 7); // suma 7 días (maneja cambio de mes/año internamente)
  return {
    day: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear()
  };
}

function generarHorarioAleatorio() { // Horario entre 8 y 23:30
  
  const hora = Math.floor(Math.random() * 16 + 8); 

  // Minutos aleatorios: 0 o 30
  const minutos = Math.random() < 0.5 ? 0 : 30;

  // Formatear con dos dígitos
  const horaRandom = hora.toString().padStart(2, '0');
  const minutosRandom = minutos.toString().padStart(2, '0');

  return `${horaRandom}:${minutosRandom}`;
}

function generarDuraciónAleatoria() { // Duración entre 2 y 4:30 
  const hora = Math.floor(Math.random() * 3 + 2); 

  // Minutos aleatorios: 0 o 30
  const minutos = Math.random() < 0.5 ? 0 : 30;

  // Formatear con dos dígitos
  const horaRandom2 = hora.toString().padStart(2, '0');
  const minutosRandom2 = minutos.toString().padStart(2, '0');

  return `${horaRandom2}:${minutosRandom2}`;
}

export const IMAGES = ['eventoTest.jpg', 'eventoTest2.jpg', 'eventoTest3.jpg', 'eventoTest4.jpg', 'eventoTest5.jpg'];
export function pickRandomImage() {
  return Cypress._.sample(IMAGES)
}

export { generateRandomTitle, getDatePlus7, generarHorarioAleatorio, generarDuraciónAleatoria }