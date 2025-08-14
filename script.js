// Menú hamburguesa
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('activo');
});

// Cerrar menú al seleccionar sección
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('activo');
    });
});

// Carrito con modal
let carrito = [];
let contador = document.getElementById('contador');
let modalCarrito = document.getElementById('modal-carrito');
let listaCarrito = document.getElementById('lista-carrito');
let totalCarrito = document.getElementById('total-carrito');

// Abrir modal
document.getElementById('carrito-btn').addEventListener('click', () => {
    mostrarCarrito();
    modalCarrito.style.display = 'block';
});

// Cerrar modal
document.getElementById('cerrar-carrito').addEventListener('click', () => {
    modalCarrito.style.display = 'none';
});

// Agregar producto
function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    contador.textContent = carrito.length;
}

// Mostrar carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio;
        let li = document.createElement('li');
        li.innerHTML = `${item.producto} - $${item.precio} <span class="eliminar" onclick="eliminarDelCarrito(${index})">❌</span>`;
        listaCarrito.appendChild(li);
    });
    totalCarrito.textContent = total;
}

// Eliminar producto
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    contador.textContent = carrito.length;
    mostrarCarrito();
}

// Finalizar compra por WhatsApp
document.getElementById('finalizar-compra').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    let mensaje = "Hola, quiero comprar:\n";
    carrito.forEach(item => {
        mensaje += `- ${item.producto} ($${item.precio})\n`;
    });
    let url = `//wa.me/5493454945349?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});
