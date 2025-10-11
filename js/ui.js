// ui.js - Módulo para crear elementos de interfaz

/**
 * Crea una tarjeta de categoría
 * @param {Object} categoria - Datos de la categoría
 * @returns {HTMLElement} Elemento div con la tarjeta
 */
export function crearTarjetaCategoria(categoria) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card");

  tarjeta.innerHTML = `
    <img src="${categoria.strCategoryThumb}" alt="${categoria.strCategory}">
    <h3>${categoria.strCategory}</h3>
    <p>${categoria.strCategoryDescription.substring(0, 80)}...</p>
    <a href="platillos.html?categoria=${categoria.strCategory}">Ver más</a>
  `;

  return tarjeta;
}

/**
 * Crea una tarjeta de platillo
 * @param {Object} comida - Datos del platillo
 * @returns {HTMLElement} Elemento div con la tarjeta
 */
export function crearTarjetaPlatillo(comida) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card");

  tarjeta.innerHTML = `
    <img src="${comida.strMealThumb}" alt="${comida.strMeal}">
    <h3>${comida.strMeal}</h3>
  `;

  return tarjeta;
}

/**
 * Renderiza una lista de elementos en un contenedor
 * @param {string} idContenedor - ID del contenedor
 * @param {Array} items - Array de elementos a renderizar
 * @param {Function} crearTarjeta - Función para crear cada tarjeta
 */
export function renderizarLista(idContenedor, items, crearTarjeta) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = ""; // Limpiar contenido anterior

  items.forEach(item => {
    const tarjeta = crearTarjeta(item);
    contenedor.appendChild(tarjeta);
  });
}

/**
 * Muestra un mensaje de error en el contenedor
 * @param {string} idContenedor - ID del contenedor
 * @param {string} mensaje - Mensaje a mostrar
 */
export function mostrarError(idContenedor, mensaje) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div style="text-align: center; padding: 2rem; color: #e55a4f;">
      <p>${mensaje}</p>
    </div>
  `;
}

/**
 * Muestra un indicador de carga
 * @param {string} idContenedor - ID del contenedor
 */
export function mostrarCargando(idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <p>Cargando...</p>
    </div>
  `;
}

/**
 * Extrae ingredientes de una receta
 * @param {Object} receta - Objeto de receta
 * @returns {Array} Array de ingredientes con medidas
 */
export function extraerIngredientes(receta) {
  const ingredientes = [];
  
  for (let i = 1; i <= 20; i++) {
    const ingrediente = receta[`strIngredient${i}`];
    const medida = receta[`strMeasure${i}`];
    
    if (ingrediente && ingrediente.trim() !== "") {
      ingredientes.push({
        ingrediente,
        medida: medida ? medida.trim() : ""
      });
    }
  }
  
  return ingredientes;
}