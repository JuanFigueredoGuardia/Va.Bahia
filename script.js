let carrito = [];
let contador = document.getElementById('contador');
let listaCarrito = document.getElementById('lista-carrito');
let totalCarrito = document.getElementById('total-carrito');

// Abrir modal del carrito
function abrirCarrito() {
    mostrarCarrito();
    const modalBootstrap = new bootstrap.Modal(document.getElementById('modalCarritoBootstrap'));
    modalBootstrap.show();
}

// Evento para el botón del carrito
document.getElementById('carrito-btn').addEventListener('click', abrirCarrito);

// Agregar producto
function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    actualizarContadores();
}

// Mostrar carrito (actualiza contenido)
function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach((item, index) => {
        total += item.precio;
        let li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item.producto} - $${item.precio}
            <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(${index})">
                <i class="bi bi-trash"></i>
            </button>
        `;
        listaCarrito.appendChild(li);
    });
    totalCarrito.textContent = total;
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContadores();
    mostrarCarrito();
}

// Actualizar contadores
function actualizarContadores() {
    contador.textContent = carrito.length;
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

// Lógica de búsqueda
const searchForm = document.getElementById('form-buscador');
const searchInput = document.getElementById('input-buscador');
const searchBtn = searchForm.querySelector('.btn');
const productosDisponibles = document.querySelectorAll('.producto-item');
const mensajeBusqueda = document.getElementById('mensaje-busqueda');

// Toggle del buscador
searchBtn.addEventListener('click', (event) => {
    // Si la pantalla es grande, el input se oculta o se muestra
    if (window.innerWidth >= 992) {
        event.preventDefault(); // Evita que el formulario se envíe
        searchForm.classList.toggle('search-active');
        if (searchForm.classList.contains('search-active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
            buscarProductos(''); // Limpia los resultados si se cierra el buscador
        }
    }
});

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const termino = searchInput.value;
    buscarProductos(termino);
});

function buscarProductos(termino) {
    const terminoBusqueda = termino.trim().toLowerCase();
    let encontrado = false;

    productosDisponibles.forEach(producto => {
        const titulo = producto.querySelector('.card-title').textContent.toLowerCase();
        if (titulo.includes(terminoBusqueda)) {
            producto.classList.remove('oculto');
            encontrado = true;
        } else {
            producto.classList.add('oculto');
        }
    });

    if (encontrado || terminoBusqueda === '') {
        mensajeBusqueda.classList.add('d-none');
    } else {
        mensajeBusqueda.classList.remove('d-none');
    }
}

// Para limpiar la búsqueda al borrar el texto
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Backspace' && e.target.value === '') {
        buscarProductos('');
    }
});