
document.addEventListener("DOMContentLoaded", function() {
  createNavElements();
  createFooterElements();
});

// #region Animacion de form login
$(".options-02 a").click(function () {
    $("form").animate(
      {
        height: "toggle",
        opacity: "toggle"
      },
      "slow"
    );
  });

function createNavElements() {
  const nav = document.getElementById('nav');
  const navItems = [
    { name: 'Inicio', url: '../index.html' },
    { name: 'Personajes', url: './characters.html' },
    { name: 'Contacto', url: './contact.html' },
    { name: 'Ingresar', url: './login.html' }
  ];

  // Crear logo
  const logo = document.createElement('img');
  logo.src = '../img/logo.png';
  logo.alt = 'Logo';
  logo.id = 'logo';
  nav.appendChild(logo);

  logo.addEventListener('click', () => {
    window.location.href = '../index.html'; // Redirige a la página de inicio
});

  navItems.forEach(item => {
    const link = document.createElement('a');
    link.href = item.url;
    link.textContent = item.name;
    nav.appendChild(link);
  });
}


function createFooterElements() {
  const footer = document.getElementById('footer');
  const footerText = '© 2024 Rick and Morty';
  const footerParagraph = document.createElement('p');
  footerParagraph.textContent = footerText;
  footer.appendChild(footerParagraph);
}


