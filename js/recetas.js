// recetas.js - pagina de recetas aleatorias

import { obtenerRecetaAleatoria } from './api.js';
import { extraerIngredientes } from './ui.js';
import { elementoExiste, alternarVisibilidad } from './utils.js';

// mostrar la receta en la pagina
function mostrarReceta(receta) {
  const imagen = document.getElementById("imagenReceta");
  const nombre = document.getElementById("nombreReceta");
  const listaIngredientes = document.getElementById("listaIngredientes");
  const container = document.getElementById("recetaContainer");

  if (!imagen || !nombre || !listaIngredientes || !container) return;

  // poner imagen y nombre
  imagen.src = receta.strMealThumb;
  imagen.alt = receta.strMeal;
  nombre.textContent = receta.strMeal;

  // limpiar ingredientes anteriores
  listaIngredientes.innerHTML = "";
  const ingredientes = extraerIngredientes(receta);

  ingredientes.forEach(({ ingrediente, medida }) => {
    const li = document.createElement("li");
    li.textContent = `${medida} ${ingrediente}`.trim();
    listaIngredientes.appendChild(li);
  });

  // mostrar el contenedor
  alternarVisibilidad("recetaContainer", true);
}

// cuando le dan click al boton
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

// inicializar el boton
function inicializarRecetasSorpresa() {
  const boton = document.getElementById("btnSorpresa");
  
  if (!elementoExiste("btnSorpresa")) return;

  boton.addEventListener("click", manejarClickReceta);
}

// cargar todo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarRecetasSorpresa);
} else {
  inicializarRecetasSorpresa();
}