export const obtenerValorInput = (idInput) =>
  document.getElementById(idInput).value;

/*   export const imprimir = (idElemento, mensaje) => {
    document.getElementById(idElemento).textContent = mensaje;
  };
   */



export function imprimir(id, mensaje) {
  document.getElementById(id).textContent = mensaje;
}


