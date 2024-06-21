var animeData;

document.addEventListener("DOMContentLoaded", function() {
    // Ruta del archivo CSV
    var csvFilePath = 'guardarAnimes.csv';

    // Leer el archivo CSV
    fetch(csvFilePath)
    .then(response => response.text())
    .then(data => {
        // Convertir el CSV a un array de objetos
        var lines = data.split('\n');
        animeData = [];
        for (var i = 1; i < lines.length; i++) {
            var values = lines[i].split(',');
            animeData.push({
                titulo: values[0],
                epVistos: parseInt(values[1]),
                noEpisodios: parseInt(values[2]),
                imagen: values[3],
                estado: values[4]
            });
        }

        // Mostrar los animes en la página
        mostrarAnimes();
    });
});

function mostrarAnimes() {
    // Obtener el contenedor de los animes
    var animesContainer = document.getElementById("animesContainer");
    animesContainer.innerHTML = '';

    // Actualizar los elementos del HTML para cada anime
    animeData.forEach(anime => {
        // Calcular el porcentaje con solo dos decimales
        var porcentajeVisto = ((anime.epVistos / anime.noEpisodios) * 100).toFixed(2);

        // Determinar el color de la barra de progreso
        var progressBarColor = 'green'; // Por defecto, verde
        if (porcentajeVisto < 33) {
            progressBarColor = 'red'; // Menor a 33, rojo
        } else if (porcentajeVisto < 66) {
            progressBarColor = 'yellow'; // Entre 33 y 66, amarillo
        }

        // Crear un elemento para el nuevo anime
        var animeElement = document.createElement("div");
        animeElement.classList.add("anime");
        animeElement.innerHTML = `
            <img src="${anime.imagen}" alt="Imagen del anime">
            <p>${anime.titulo}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${porcentajeVisto}%; background-color: ${progressBarColor};"></div>
            </div>
            <p>Estado: ${anime.estado}</p>
            <p>Episodios Vistos: ${anime.epVistos}         <button onclick="restarEpisodio('${anime.titulo}')">-</button>
            <button onclick="agregarEpisodio('${anime.titulo}')">+</button></p>
            <p>Episodios Totales: ${anime.noEpisodios}</p>
            <p>Porcentaje Visto: ${porcentajeVisto}%</p>
            
        `;
        animesContainer.appendChild(animeElement);
    });
}

function agregarEpisodio(titulo) {
    // Encontrar el anime correspondiente en animeData
    var anime = animeData.find(a => a.titulo === titulo);

    // Verificar si se puede agregar un episodio más
    if (anime.epVistos < anime.noEpisodios) {
        anime.epVistos++;
    }

    // Volver a mostrar los animes en la página
    mostrarAnimes();
}

function restarEpisodio(titulo) {
    // Encontrar el anime correspondiente en animeData
    var anime = animeData.find(a => a.titulo === titulo);

    // Verificar si se puede restar un episodio
    if (anime.epVistos > 0) {
        anime.epVistos--;
    }

    // Volver a mostrar los animes en la página
    mostrarAnimes();
}
