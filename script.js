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

document.getElementById('carrito-btn').addEventListener('click', abrirCarrito);

// Agregar producto
function agregarAlCarrito(producto, precio) {
    carrito.push({ producto, precio });
    actualizarContadores();
}

// Mostrar carrito
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

// Eliminar producto
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarContadores();
    mostrarCarrito();
}

// Actualizar contadores
function actualizarContadores() {
    contador.textContent = carrito.length;
}

// Finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    let nombre = document.getElementById('nombre').value.trim();
    let apellido = document.getElementById('apellido').value.trim();
    let direccion = document.getElementById('direccion').value.trim();

    if (!nombre || !apellido || !direccion) {
        alert("Por favor completa tus datos antes de finalizar la compra");
        return;
    }

    let mensaje = `Hola, soy ${nombre} ${apellido}.\nDirección: ${direccion}\nQuiero comprar:\n`;
    carrito.forEach(item => {
        mensaje += `- ${item.producto} ($${item.precio})\n`;
    });
    mensaje += `\nTotal: $${totalCarrito.textContent}`;

    let url = `https://wa.me/5493454945349?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

// Búsqueda
const searchForm = document.getElementById('form-buscador');
const searchInput = document.getElementById('input-buscador');
const searchBtn = searchForm.querySelector('.btn');
const productosDisponibles = document.querySelectorAll('.producto-item');
const mensajeBusqueda = document.getElementById('mensaje-busqueda');
const contenedorVerTodos = document.getElementById('contenedor-ver-todos');

searchBtn.addEventListener('click', (event) => {
    if (window.innerWidth >= 992) {
        event.preventDefault();
        searchForm.classList.toggle('search-active');
        if (searchForm.classList.contains('search-active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
            buscarProductos('');
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

    if (terminoBusqueda === '') {
        productosDisponibles.forEach(p => p.classList.remove('oculto'));
        mensajeBusqueda.classList.add('d-none');
        contenedorVerTodos.classList.add('d-none');
    } else {
        contenedorVerTodos.classList.remove('d-none');
        if (encontrado) {
            mensajeBusqueda.classList.add('d-none');
        } else {
            mensajeBusqueda.classList.remove('d-none');
        }
    }
}

// Botón "Ver todos"
document.getElementById('btn-ver-todos').addEventListener('click', () => {
    searchInput.value = '';
    buscarProductos('');
});

// Limpieza al borrar texto
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Backspace' && e.target.value === '') {
        buscarProductos('');
    }
});
