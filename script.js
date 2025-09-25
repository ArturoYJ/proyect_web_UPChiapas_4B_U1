
if (document.getElementById("categorias")) 
{
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then(respuesta => respuesta.json())
    .then(datos => {
        const contenedor = document.getElementById("categorias");
        
        datos.categories.forEach(categoria => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");

        tarjeta.innerHTML = `
            <img src="${categoria.strCategoryThumb}" alt="${categoria.strCategory}">
            <h3>${categoria.strCategory}</h3>
            <p>${categoria.strCategoryDescription.substring(0, 80)}...</p>
            <a href="detalle.html?categoria=${categoria.strCategory}">Ver más</a>
        `;

        contenedor.appendChild(tarjeta);
        });
    })
    .catch(error => console.error("Error cargando categorías:", error));
}

if (document.getElementById("listaComidas")) {

    const parametros = new URLSearchParams(window.location.search);
    const nombreCategoria = parametros.get("categoria");

    document.getElementById("tituloCategoria").textContent = nombreCategoria;

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nombreCategoria}`)
    .then(respuesta => respuesta.json())
    .then(datos => {
        const contenedor = document.getElementById("listaComidas");

        datos.meals.forEach(comida => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("card");

        tarjeta.innerHTML = `
            <img src="${comida.strMealThumb}" alt="${comida.strMeal}">
            <h3>${comida.strMeal}</h3>
        `;

        contenedor.appendChild(tarjeta);
        });
    })
    .catch(error => console.error("Error cargando comidas:", error));
}
