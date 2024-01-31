document.addEventListener('DOMContentLoaded', function() {
    // Define la URL desde donde se obtendrá la página
    const apiUrl = 'https://evangelioceeapi.github.io/?mode=randompassage&showName=1';

    // Realizamos una solicitud a la API para obtener la página
    fetch(apiUrl)
        .then(response => {
            // Aseguramos que la respuesta esté bien antes de procesarla como texto
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(htmlText => {
            // Buscamos el elemento con el id "verseDisplay" dentro del contenido HTML
            const verseDisplayElement = new DOMParser().parseFromString(htmlText, 'text/html').getElementById('verseDisplay');

            if (verseDisplayElement) {
                // Obtenemos el contenido del elemento
                const verseContent = verseDisplayElement.textContent;

                // Intentamos analizar el contenido como JSON
                try {
                    const data = JSON.parse(verseContent);

                    // Manejamos los datos JSON y los asignamos a los elementos HTML
                    document.getElementById('title').textContent = data.title || "Título no disponible";
                    document.getElementById('text').textContent = data.text || "Texto no disponible";
                    document.getElementById('reference').textContent = data.reference || "Referencia no disponible";
                } catch (e) {
                    // Si hay un error de análisis, lo mostramos en la consola y lanzamos un error
                    console.error('Error parsing JSON:', e);
                }
            }
        })
        .catch(error => {
            // Manejo de errores, por si la solicitud falla
            console.error('There has been a problem with your fetch operation:', error);
        });

    // Encuentra el botón por su ID y luego añade un event listener para recargar la página
    document.getElementById('reloadButton').addEventListener('click', function() {
        window.location.reload();
    });
});
