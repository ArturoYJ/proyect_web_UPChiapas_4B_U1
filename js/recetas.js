// recetas.js - Lógica específica para recetasSorpresas.html

import { obtenerRecetaAleatoria } from './api.js';
import { extraerIngredientes } from './ui.js';
import { elementoExiste, alternarVisibilidad } from './utils.js';

/**
 * Muestra una receta en el contenedor
 * @param {Object} receta - Datos de la receta
 */
function mostrarReceta(receta) {
  const imagen = document.getElementById("imagenReceta");
  const nombre = document.getElementById("nombreReceta");
  const listaIngredientes = document.getElementById("listaIngredientes");
  const container = document.getElementById("recetaContainer");

  if (!imagen || !nombre || !listaIngredientes || !container) return;

  // Establecer imagen y nombre
  imagen.src = receta.strMealThumb;
  imagen.alt = receta.strMeal;
  nombre.textContent = receta.strMeal;

  // Limpiar y llenar ingredientes
  listaIngredientes.innerHTML = "";
  const ingredientes = extraerIngredientes(receta);

  ingredientes.forEach(({ ingrediente, medida }) => {
    const li = document.createElement("li");
    li.textContent = `${medida} ${ingrediente}`.trim();
    listaIngredientes.appendChild(li);
  });

  // Mostrar contenedor
  alternarVisibilidad("recetaContainer", true);
}

/**
 * Maneja el clic del botón de receta sorpresa
 */
async function manejarClickReceta() {
  const boton = document.getElementById("btnSorpresa");
  
  if (!boton) return;

  boton.disabled = true;
  boton.textContent = "Cargando...";

  try {
    const datos = await obtenerRecetaAleatoria();
    
    if (datos.meals && datos.meals.length > 0) {
      mostrarReceta(datos.meals[0]);
      boton.textContent = "Otra receta";
    } else {
      throw new Error("No se pudo cargar la receta");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al cargar la receta. Por favor, intenta de nuevo.");
    boton.textContent = "¡Presióname!";
  } finally {
    boton.disabled = false;
  }
}

/**
 * Inicializa la funcionalidad de recetas sorpresa
 */
function inicializarRecetasSorpresa() {
  const boton = document.getElementById("btnSorpresa");
  
  if (!elementoExiste("btnSorpresa")) return;

  boton.addEventListener("click", manejarClickReceta);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarRecetasSorpresa);
} else {
  inicializarRecetasSorpresa();
}