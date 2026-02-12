const url = "https://pokeapi.co/api/v2/pokemon?limit=386"; 
//guardamos hasta la tercer generacion de pokemon

async function obtenerPokemon() { // 
    try {
        const respuesta = await fetch(url); 
        // fetch hace la petición a la API

        const data = await respuesta.json(); 
        // convertimos la respuesta a formato JSON

        console.log("Primer JSON:", data); 
        // mostramos en consola lo que trae la primera respuesta

        const container = document.getElementById("pokemon-container"); 
        // obtenemos el contenedor para guardar los pokemones

        for (let pokemon of data.results) { 
            // recorremos los resultados

            const detalleRespuesta = await fetch(pokemon.url); 
            // hacemos otra petición 

            const detalle = await detalleRespuesta.json(); 
            // convertimos esa respuesta a JSON

            const id = detalle.id; 
            // guardamos el ID del Pokémon

            
            if (id === 1) {
                crearTitulo("Generación 1 - Kanto - Gameboy"); 
                // cuando el ID es 1 empieza la generación 1
            }

            if (id === 152) {
                crearTitulo("Generación 2 - Johto - Gameboy Color"); 
                // cuando el ID es 152 empieza la generación 2
            }

            if (id === 252) {
                crearTitulo("Generación 3 - Hoenn - Gameboy Advance"); 
                // cuando el ID es 252 empieza la generación 3
            }

            crearCarta(detalle); 
            // llamamos la función que crea la carta del Pokémon
        }

    } catch (error) {
        console.error("Error:", error); 
        // este es un mensaje de error
    }
}

function crearTitulo(texto) { 

    const container = document.getElementById("pokemon-container"); 
    // obtenemos el contenedor principal

    const titulo = document.createElement("h2"); 
    // creamos un elemento h2

    titulo.classList.add("generation-title"); 
    // le agregamos la clase para darle estilo con CSS

    titulo.textContent = texto; 
    // ponemos el texto que recibe la función

    container.appendChild(titulo); 
    // agregamos el título al contenedor
}

function crearCarta(detalle) {
    // función para crear cada carta individual

    const container = document.getElementById("pokemon-container"); 
    // obtenemos el contenedor donde irán las cartas

    const card = document.createElement("div"); 
    // creamos un div que será la carta

    card.classList.add("card"); 
    // le agregamos la clase card para el diseño

    const nombre = detalle.name.toUpperCase(); 
    // obtenemos el nombre y lo convertimos a mayúsculas

    const imagen = detalle.sprites.front_default; 
    // obtenemos la imagen principal del Pokémon

    const id = detalle.id; 
    // obtenemos el ID del Pokémon

    const tipoPrincipal = detalle.types[0].type.name; 
    // obtenemos el primer tipo del Pokémon 

    const tipoTexto = detalle.types.map(t => t.type.name).join(", "); 
    // obtenemos todos los tipos y los unimos en texto separado por coma

    card.classList.add(tipoPrincipal); 
    // agregamos la clase del tipo principal para que cambie el color según el tipo

    card.innerHTML = ` 
        <div class="card-header">
            <span class="pokemon-name">${nombre}</span>
            <span class="pokemon-id">#${id}</span>
        </div>
        <img src="${imagen}" alt="${nombre}">
        <div class="card-footer">
            <span class="type-badge">${tipoTexto}</span>
        </div>
    `; // creamos como tal la carta con los div del html
    

    container.appendChild(card); 
    // agregamos la carta al contenedor principal
}

obtenerPokemon(); 
// llamamos la función para que todo se ejecute automaticamente
