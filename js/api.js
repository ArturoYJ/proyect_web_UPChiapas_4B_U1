// api.js - aqui estan las funciones para llamar a la API
// usamos themealdb que es gratis

const API_BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// trae todas las categorias de comida
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

// obtener comidas por categoria (beef, chicken, etc)
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

// funcion para traer una receta random
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

// esta la agregue por si despues quiero ver detalles de un platillo
export function obtenerDetallePlatillo(id) {
  return fetch(`${API_BASE_URL}/lookup.php?i=${id}`)
    .then(respuesta => respuesta.json())
    .catch(error => {
      console.error("Error:", error);
    });
}