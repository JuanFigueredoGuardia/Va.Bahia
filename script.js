document.addEventListener('DOMContentLoaded', function() {

    /* =========================
       📌 DESPLAZAMIENTO SUAVE
    ========================== */
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                destino.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* =========================
       📌 BOTÓN "CONOCER MÁS" EN DOCENTES
    ========================== */
    document.querySelectorAll('.conocer-mas').forEach(boton => {
        boton.addEventListener('click', function() {
            const descripcion = this.parentElement.querySelector('.descripcion');

            if (descripcion.classList.contains('d-none')) {
                // Mostrar texto desde data-text
                descripcion.textContent = this.getAttribute('data-text');
                descripcion.classList.remove('d-none');
                this.textContent = "Mostrar menos";
            } else {
                // Ocultar texto
                descripcion.classList.add('d-none');
                this.textContent = "Conocer más";
            }
        });
    });

    /* =========================
       📌 CERRAR MENÚ EN MÓVIL AL HACER CLIC
    ========================== */
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).toggle();
            }
        });
    });

});
