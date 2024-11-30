const UNSPLASH_API_URL = "https://api.unsplash.com/photos/random";
//const ACCESS_KEY = "TU_CLAVE_DE_UNSPLASH";
const ACCESS_KEY = obtenerUnsplashAccessKey();

function obtenerUnsplashAccessKey() {
  
    return 'Z2BWvz6Pi1KGt0xqpD0HNi-3bijrX7etir99QH0q9wY';  // Coloca aquí tu token real
}

function obtenerUnsplashSecretKey() {
    return '9g5KwSeZNsYGFDXId1JAOUIaktp52vrmKsVaAecMJRA';
 
}

// Define el array de palabras clave antes de la función que lo usa

const keywords = [
    "nature", 
    "forest", 
    "mountains", 
    "wildlife", 
    "armenia", 
    "urss", 
    "brutalism", 
  ];

   // Función para obtener una palabra clave aleatoria
   function getRandomKeyword() {
    const randomIndex = Math.floor(Math.random() * keywords.length);
    const randomKeyword = keywords[randomIndex];
    console.log("Selected keyword:", randomKeyword); // Imprime la palabra clave seleccionada
    return randomKeyword;
  }
  
async function fetchRandomImage() {
    try {
      const randomKeyword = getRandomKeyword(); // Obtiene una palabra clave aleatoria
      console.log("Fetching with keyword:", randomKeyword);  // Imprime la palabra clave seleccionada
  
      const response = await fetch(`${UNSPLASH_API_URL}?client_id=${ACCESS_KEY}&query=${randomKeyword}&orientation=landscape`);
  
      // Verifica si la respuesta es exitosa (código de estado 2xx)
      if (!response.ok) {
        throw new Error(`Error fetching data from Unsplash: ${response.status} ${response.statusText}`);
      }
  
      // Intenta obtener el JSON, manejando el caso de errores
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Error parsing JSON from response');
      }
  
      console.log('API Response:', data);  // Verifica la respuesta completa de la API
  
      // Verifica si la respuesta tiene imágenes y si la URL está presente
      const imageUrl = data[0]?.urls?.regular || "";
      console.log('Image URL:', imageUrl);  // Verifica la URL de la imagen
  
      if (imageUrl) {
        const imgElement = document.getElementById('background-image');
        imgElement.onload = function() {
          console.log('Image loaded successfully');
        };
        imgElement.onerror = function() {
          console.error('Failed to load image');
          displayError("Failed to load image");
        };
        imgElement.src = imageUrl;
      } else {
        console.log("No valid image URL found:", imageUrl);
        displayError("No valid image URL found");
      }
  
      // Verifica si 'user' y 'location' existen antes de acceder
      const user = data[0]?.user || {};  // Asegura que 'user' esté definido
      const authorName = user.name || "Unknown Author";
      const authorLink = user.links?.html || "#";
      const authorLocation = user.location || "Unknown location";  // Usamos un valor predeterminado si no existe
      const photoLink = data[0]?.links?.html || "#";
  
      document.getElementById('author-name').textContent = authorName;
      document.getElementById('author-link').href = authorLink;
      document.getElementById('author-location').textContent = authorLocation;
      document.getElementById('photo-link').href = photoLink;
  
    } catch (error) {
      console.error("Error fetching image:", error);
      // Muestra el error en el contenedor de la imagen
      displayError(error.message);
    }
  }
  
  // Función para mostrar los errores en el lugar de la imagen
  function displayError(message) {
    const imageContainer = document.getElementById('image-container');
    const errorMessage = document.createElement('div');
    errorMessage.style.color = 'white';
    errorMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    errorMessage.style.padding = '20px';
    errorMessage.style.textAlign = 'center';
    errorMessage.innerHTML = `<h2>Error: ${message}</h2>`;
    
    // Reemplaza la imagen con el mensaje de error
    imageContainer.innerHTML = '';  // Limpia el contenedor de la imagen
    imageContainer.appendChild(errorMessage);  // Agrega el mensaje de error
  }
  
  // Llamar a la función para obtener la imagen
  fetchRandomImage();
  

  
  

  