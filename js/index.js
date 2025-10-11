// index.js - pagina principal donde se muestran las categorias

import { obtenerCategorias } from './api.js';
import { crearTarjetaCategoria, renderizarLista, mostrarError, mostrarCargando } from './ui.js';
import { elementoExiste } from './utils.js';

// inicializar la pagina
async function inicializarCategorias() {
  const contenedorId = "categorias";
  
  if (!elementoExiste(contenedorId)) return;

  try {
    mostrarCargando(contenedorId);
    
    const datos = await obtenerCategorias();
    
    if (datos.categories && datos.categories.length > 0) {
      renderizarLista(contenedorId, datos.categories, crearTarjetaCategoria);
    } else {
      mostrarError(contenedorId, "No se encontraron categorías");
    }
  } catch (error) {
    // si falla la api mostrar error
    mostrarError(contenedorId, "Error al cargar las categorías. Por favor, intenta más tarde.");
  }
}

// esperar a que cargue todo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarCategorias);
} else {
  inicializarCategorias();
}