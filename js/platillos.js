// platillos.js - Lógica específica para platillos.html

import { obtenerPlatillosPorCategoria } from './api.js';
import { crearTarjetaPlatillo, renderizarLista, mostrarError, mostrarCargando } from './ui.js';
import { obtenerParametroURL, establecerTitulo, elementoExiste } from './utils.js';

/**
 * Inicializa la página de platillos
 */
async function inicializarPlatillos() {
  const contenedorId = "listaComidas";
  const tituloId = "tituloCategoria";
  
  if (!elementoExiste(contenedorId)) return;

  const categoria = obtenerParametroURL("categoria");

  if (!categoria) {
    mostrarError(contenedorId, "No se especificó ninguna categoría");
    return;
  }

  establecerTitulo(tituloId, categoria);

  try {
    mostrarCargando(contenedorId);
    
    const datos = await obtenerPlatillosPorCategoria(categoria);
    
    if (datos.meals && datos.meals.length > 0) {
      renderizarLista(contenedorId, datos.meals, crearTarjetaPlatillo);
    } else {
      mostrarError(contenedorId, `No se encontraron platillos en la categoría ${categoria}`);
    }
  } catch (error) {
    mostrarError(contenedorId, "Error al cargar los platillos. Por favor, intenta más tarde.");
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarPlatillos);
} else {
  inicializarPlatillos();
}