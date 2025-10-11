// utils.js - funciones auxiliares que uso en varios lados

// obtener parametros del url (ej: ?categoria=beef)
export function obtenerParametroURL(parametro) {
  const params = new URLSearchParams(window.location.search);
  return params.get(parametro);
}

// verificar si existe un elemento
export function elementoExiste(id) {
  return document.getElementById(id) !== null;
}

// cambiar el titulo de la pagina
export function establecerTitulo(idElemento, texto) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = texto;
  }
}

// mostrar u ocultar elementos
function alternarVisibilidad(id, mostrar) {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.style.display = mostrar ? "block" : "none";
  }
}

export { alternarVisibilidad };