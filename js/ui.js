// ui.js - funciones para crear las tarjetas y mostrar cosas en pantalla

// crear tarjeta de categoria
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

// crear tarjeta para los platillos
export function crearTarjetaPlatillo(comida) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("card");

  tarjeta.innerHTML = `
    <img src="${comida.strMealThumb}" alt="${comida.strMeal}">
    <h3>${comida.strMeal}</h3>
  `;

  return tarjeta;
}

// funcion para mostrar una lista de cosas
export function renderizarLista(idContenedor, items, crearTarjeta) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = ""; 

  items.forEach(item => {
    const tarjeta = crearTarjeta(item);
    contenedor.appendChild(tarjeta);
  });
}

// mostrar error cuando algo sale mal
export function mostrarError(idContenedor, mensaje) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div style="text-align: center; padding: 2rem; color: #e55a4f;">
      <p>${mensaje}</p>
    </div>
  `;
}

// mensaje de cargando
export function mostrarCargando(idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;

  contenedor.innerHTML = `
    <div style="text-align: center; padding: 2rem;">
      <p>Cargando...</p>
    </div>
  `;
}

// sacar los ingredientes de la receta
// la api los guarda raro (strIngredient1, strIngredient2, etc)
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