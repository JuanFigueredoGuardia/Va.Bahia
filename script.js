let carrito = [];
let contador = document.getElementById('contador');
let contadorLg = document.getElementById('contador-lg');
let listaCarrito = document.getElementById('lista-carrito');
let totalCarrito = document.getElementById('total-carrito');

// Abrir modal del carrito
function abrirCarrito() {
    mostrarCarrito();
    const modalBootstrap = new bootstrap.Modal(document.getElementById('modalCarritoBootstrap'));
    modalBootstrap.show();
}

// Eventos de ambos botones del carrito
document.getElementById('carrito-btn').addEventListener('click', abrirCarrito);
document.getElementById('carrito-btn-lg').addEventListener('click', abrirCarrito);

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
    contadorLg.textContent = carrito.length;
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
