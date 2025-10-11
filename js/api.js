// api.js - Módulo para manejar todas las llamadas a la API

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

/**
 * Obtiene todas las categorías de comida
 * @returns {Promise<Object>} Objeto con array de categorías
 */
export async function obtenerCategorias() {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/categories.php`);
    if (!respuesta.ok) throw new Error('Error al cargar categorías');
    return await respuesta.json();
  } catch (error) {
    console.error("Error cargando categorías:", error);
    throw error;
  }
}

/**
 * Obtiene platillos por categoría
 * @param {string} categoria - Nombre de la categoría
 * @returns {Promise<Object>} Objeto con array de platillos
 */
export async function obtenerPlatillosPorCategoria(categoria) {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/filter.php?c=${categoria}`);
    if (!respuesta.ok) throw new Error('Error al cargar platillos');
    return await respuesta.json();
  } catch (error) {
    console.error("Error cargando platillos:", error);
    throw error;
  }
}

/**
 * Obtiene una receta aleatoria
 * @returns {Promise<Object>} Objeto con los datos de la receta
 */
export async function obtenerRecetaAleatoria() {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/random.php`);
    if (!respuesta.ok) throw new Error('Error al cargar receta');
    return await respuesta.json();
  } catch (error) {
    console.error("Error cargando receta:", error);
    throw error;
  }
}

/**
 * Obtiene detalles completos de un platillo por ID
 * @param {string} id - ID del platillo
 * @returns {Promise<Object>} Objeto con detalles del platillo
 */
export async function obtenerDetallePlatillo(id) {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    if (!respuesta.ok) throw new Error('Error al cargar detalles');
    return await respuesta.json();
  } catch (error) {
    console.error("Error cargando detalles:", error);
    throw error;
  }
}