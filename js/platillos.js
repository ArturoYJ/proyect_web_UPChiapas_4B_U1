// platillos.js - muestra los platillos de una categoria

import { obtenerPlatillosPorCategoria } from './api.js';
import { crearTarjetaPlatillo, renderizarLista, mostrarError, mostrarCargando } from './ui.js';
import { obtenerParametroURL, establecerTitulo, elementoExiste } from './utils.js';

async function inicializarPlatillos() {
  const contenedorId = "listaComidas";
  const tituloId = "tituloCategoria";
  
  if (!elementoExiste(contenedorId)) return;

  // sacar la categoria del url
  const categoria = obtenerParametroURL("categoria");

  if (!categoria) {
    mostrarError(contenedorId, "No se especificó ninguna categoría");
    return;
  }

  // poner el titulo con el nombre de la categoria
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

// inicializar cuando cargue la pagina
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarPlatillos);
} else {
  inicializarPlatillos();
}