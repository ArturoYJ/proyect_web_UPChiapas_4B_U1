// utils.js - Funciones utilitarias

/**
 * Obtiene parámetros de la URL
 * @param {string} parametro - Nombre del parámetro
 * @returns {string|null} Valor del parámetro
 */
export function obtenerParametroURL(parametro) {
  const params = new URLSearchParams(window.location.search);
  return params.get(parametro);
}

/**
 * Valida si un elemento existe en el DOM
 * @param {string} id - ID del elemento
 * @returns {boolean} True si existe
 */
export function elementoExiste(id) {
  return document.getElementById(id) !== null;
}

/**
 * Establece el título de una página
 * @param {string} idElemento - ID del elemento
 * @param {string} texto - Texto del título
 */
export function establecerTitulo(idElemento, texto) {
  const elemento = document.getElementById(idElemento);
  if (elemento) {
    elemento.textContent = texto;
  }
}

/**
 * Alterna la visibilidad de un elemento
 * @param {string} id - ID del elemento
 * @param {boolean} mostrar - True para mostrar, false para ocultar
 */
export function alternarVisibilidad(id, mostrar) {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.style.display = mostrar ? "block" : "none";
  }
}