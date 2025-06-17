
document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Cargar la preferencia del usuario o detectar el modo del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️'; // Icono para modo claro
        darkModeToggle.setAttribute('aria-label', 'Alternar a modo claro');
    } else {
        darkModeToggle.textContent = '🌙'; // Icono para modo oscuro
        darkModeToggle.setAttribute('aria-label', 'Alternar a modo oscuro');
    }

    // Alternar el modo al hacer clic
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';
            darkModeToggle.setAttribute('aria-label', 'Alternar a modo claro');
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';
            darkModeToggle.setAttribute('aria-label', 'Alternar a modo oscuro');
        }
    });

    // Smooth scrolling para los enlaces de navegación
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

