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
            <a href="platillos.html?categoria=${categoria.strCategory}">Ver más</a>
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





if (document.getElementById("btnSorpresa")) {
    const boton = document.getElementById("btnSorpresa");
    const container = document.getElementById("recetaContainer");
    const imagen = document.getElementById("imagenReceta");
    const nombre = document.getElementById("nombreReceta");
    const ingredientes = document.getElementById("listaIngredientes");

    boton.addEventListener("click", function() {

        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
            .then(respuesta => respuesta.json())
            .then(datos => {
                const receta = datos.meals[0];
                
                imagen.src = receta.strMealThumb;
                imagen.alt = receta.strMeal;
                nombre.textContent = receta.strMeal;
                
                ingredientes.innerHTML = "";
                
                for (let i = 1; i <= 20; i++) {
                    const ingrediente = receta[`strIngredient${i}`];
                    const medida = receta[`strMeasure${i}`];
                    
                    if (ingrediente && ingrediente.trim() !== "") {
                        const li = document.createElement("li");
                        li.textContent = `${medida ? medida : ""} ${ingrediente}`.trim();
                        ingredientes.appendChild(li);
                    }
                }
                
                container.style.display = "block";
                
                boton.textContent = "Otra receta";
                boton.disabled = false;
            })
            .catch(error => {
                console.error("Error cargando receta:", error);
                boton.textContent = "intenta de nuevo";
                boton.disabled = false;
            });
    });
}