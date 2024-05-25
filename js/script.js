const charactersContainer = document.getElementById('characters');
const detailsContainer = document.getElementById('details');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const prevButton2 = document.getElementById('prevButton2');
const nextButton2 = document.getElementById('nextButton2');
let currentPage = 1;

document.addEventListener("DOMContentLoaded", function() {
  createNavElements();
  fetchCharacters(currentPage);//page == currenPage, actualiza el fetch para traer la pagina correspondiente relacionada a los botones next y prev.
  createFooterElements();

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchCharacters(currentPage);
    }
  });

  nextButton.addEventListener('click', () => {
    currentPage++;
    fetchCharacters(currentPage);
  });


  prevButton2.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchCharacters(currentPage);
    }
  });

  nextButton2.addEventListener('click', () => {
    currentPage++;
    fetchCharacters(currentPage);
  });

});

//Crear componentes del nav
function createNavElements() {
  const nav = document.getElementById('nav');
  const navItems = [
    { name: 'Inicio', url: '../index.html' },
    { name: 'Personajes', url: '../pages/characters.html' },
    { name: 'Contacto', url: '../pages/contact.html' },
    { name: 'Ingresar', url: '../pages/login.html' }
  ];

  // Crear logo
  const logo = document.createElement('img');
  logo.src = '../img/logo.png';
  logo.alt = 'Logo';
  logo.id = 'logo';
  logo.classList.add('clickable');
  nav.appendChild(logo);

  logo.addEventListener('click', () => {
    window.location.href = 'index.html'; // Redirige a la página de inicio
});
  //Recorre items de nav creados y los agrega
  navItems.forEach(item => {
    const link = document.createElement('a');
    link.href = item.url;
    link.textContent = item.name;
    nav.appendChild(link);
  });
}

//Crea componentes del footer
function createFooterElements() {
  const footer = document.getElementById('footer');
  const footerText = '© 2024 Rick and Morty';
  const footerParagraph = document.createElement('p');
  footerParagraph.textContent = footerText;
  footer.appendChild(footerParagraph);
}


//Trae las paginas completas de personajes
async function fetchCharacters(page) {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await response.json();

    charactersContainer.innerHTML = '';
    data.results.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <a href="details.html?url=${character.url}" class="view-more">Ver más</a>
      `;
      charactersContainer.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching characters:', error);
  }
}

// Agrega evento al botón "Ver más"
const viewMoreButtons = document.querySelectorAll('.view-more');
viewMoreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const characterUrl = button.getAttribute('data-url');
    
    // Espera 1 segundo antes de cargar los detalles del personaje
    setTimeout(() => {
      fetchCharacterDetails(characterUrl);
    }, 3000);
  });
});
  

// Obtener la URL del personaje de la consulta
const urlParams = new URLSearchParams(window.location.search);
const characterUrl = urlParams.get('url');



// Fetch para obtener los detalles del personaje donde se hizo click en "ver mas"
fetch(characterUrl)
  .then(response => response.json())
  .then(character => {
    detailsContainer.innerHTML = `
      <div class="cardDetail">
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}">
      <table id="character-details">
      <tr>
        <td><strong>Status:</strong></td>
        <td>${character.status}</td>
      </tr>
      <tr>
        <td><strong>Species:</strong></td>
        <td>${character.species}</td>
      </tr>
      <tr>
        <td><strong>Gender:</strong></td>
        <td>${character.gender}</td>
      </tr>
      <tr>
        <td><strong>Origin:</strong></td>
        <td>${character.origin.name}</td>
      </tr>
      <tr>
        <td><strong>Location:</strong></td>
        <td>${character.location.name}</td>
      </tr>
    </table>
      <a href="characters.html" id="volver-btn">Volver</a>
      </div>
    `;
  }
) ;

