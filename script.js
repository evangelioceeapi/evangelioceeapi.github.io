window.onload = async function() {
    // Define la URL desde donde se obtendrá la página
    const apiUrl = 'https://evangelioceeapi.github.io/api/?mode=randompassage&showName=1';

    // Función para analizar el contenido como JSON
    async function parseJsonContent(verseContent) {
        try {
            const data = JSON.parse(verseContent);

            // Manejamos los datos JSON y los asignamos a los elementos HTML
            document.getElementById('title').textContent = data.title || "Título no disponible";
            document.getElementById('text').textContent = data.text || "Texto no disponible";
            document.getElementById('reference').textContent = data.reference || "Referencia no disponible";
        } catch (e) {
            // Si hay un error de análisis, lo mostramos en la consola
            console.error('Error parsing JSON:', e);
        }
    }

    // Encuentra el botón por su ID y luego añade un event listener para recargar la página
    document.getElementById('reloadButton').addEventListener('click', function() {
        window.location.reload();
    });

    // Realizamos una solicitud a la API para obtener la página
    try {
        const response = await fetch(apiUrl);

        // Aseguramos que la respuesta esté bien antes de procesarla como texto
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const htmlText = await response.text();

        // Utilizamos el polling para verificar si el elemento verseDisplay está disponible
        const checkForVerseDisplay = async () => {
            const tempElement = document.createElement('div');
            tempElement.innerHTML = htmlText;

            const verseDisplayElement = tempElement.querySelector('#verseDisplay');

            if (verseDisplayElement) {
                // Verificar y analizar el contenido cuando se encuentra
                const verseContent = verseDisplayElement.textContent.trim();

                if (verseContent) {
                    await parseJsonContent(verseContent);
                } else {
                    console.error('Verse content is empty.');
                }
            } else {
                // Si el elemento no se encuentra, esperar y volver a verificar
                setTimeout(checkForVerseDisplay, 1000); // Esperar 1 segundo antes de volver a verificar
            }
        };

        checkForVerseDisplay(); // Comenzar el proceso de verificación
    } catch (error) {
        // Manejo de errores, por si la solicitud falla
        console.error('There has been a problem with your fetch operation:', error);
    }
};
