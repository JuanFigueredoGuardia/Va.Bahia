let carrito = [];
let contador = document.getElementById('contador');
let listaCarrito = document.getElementById('lista-carrito');
let totalCarrito = document.getElementById('total-carrito');
// Define las categorías de tus productos
const productos = [
    // Descartables
    ["Nikbar Ice baby (40.000 puff)", 29000, "imagenes/Nikbar ice baby.jpg", "descartables"],
    ["Elfbar Ice Kings (40.000 Puff)", 29000, "imagenes/Elfbar Ice Kings.jpg", "descartables"],
    ["Elfbar Nic king (40.000 puff)", 29000, "imagenes/Elfbar Nico king.jpg", "descartables"],
    ["Ignite Ice (40.000 puff)", 30000, "imagenes/Ignite Ice1.jpg", "descartables"],

    ["Black Sheep Dual (30.000 puff)", 35000, "imagenes/Black Sheep Dual.jpg", "descartables"],

    ["Ignite (25.000 puff)", 25000, "imagenes/Ignite .jpg", "descartables"],
    ["Ignite gold (25.000 puff)", 27000, "imagenes/Ignite gold.jpg", "descartables"],
    ["Frosty (25.000 puff)", 19500, "imagenes/Frosty1.jpg", "descartables"],

    ["Lost Mary (20.000 puff)", 23000, "imagenes/Lost Mary.jpg", "descartables"],
    ["Space Prism (20.000 puff)", 20000, "imagenes/Space Prism.jpg", "descartables"],
    ["Spaceman (20.000 puff)", 22000, "imagenes/Spaceman.jpg", "descartables"],
    ["Vozol Vista (20.000 Puff)", 21000, "imagenes/Vozol Vista1.jpg", "descartables"],
    ["Lost Maru (20.000 puff)", 26000, "imagenes/Lost Maru.jpg", "descartables"],
    ["Black Sheep Duo (20.000 puff)", 29000, "imagenes/Black Sheep Duo1.jpg", "descartables"],

    ["Chris Brown (15.000 puff)", 19000, "imagenes/Chris Brown1.jpg", "descartables"],

    ["Pone Pod (8.500 puff)", 18000, "imagenes/Pone Pod1.jpg", "descartables"],

    ["Dummy x finity (6.900 puff)", 15000, "imagenes/Dummy x finity.jpg", "descartables"],

    ["Calibarn (6.000 puff)", 19000, "imagenes/Calibarn1.jpg", "descartables"],

    ["HDQ al 2% (5.000 puff)", 16000, "imagenes/HDQ al 2.jpg", "descartables"],
    ["HDQ (5.000 puff)", 14000, "imagenes/HDQ.jpg", "descartables"],

    ["Zomo Party al 2% (4.500 puff)", 15000, "imagenes/Zomo Party al 2.jpg", "descartables"],
    ["Zomo Party (4.500 puff)", 13000, "imagenes/Zomo Party.jpg", "descartables"],

    // Otros (no puffs, en gramos)
    ["Torch Cryo 7,5 gr", 58000, "imagenes/Torch Cryo 7,5 gr.jpg", "descartables"],
    ["Torch love Rozón 5 gr", 49000, "imagenes/Torch love Rozón 5 gr.jpg", "descartables"],
    ["Phenom Mushroom 6gr", 60000, "imagenes/Phenom Mushroom 6gr.jpg", "descartables"],

    // Equipos
    ["Pod recargable zomo play", 19000, "imagenes/Pod recargable zomo play.jpg", "equipos"],
    ["Pod recargable Smok - Novo 2s", 25000, "imagenes/Pod recargable Smok - Novo 2s.jpg", "equipos"],
    ["Kit de inicio Smok Vape Pen V2 kit", 27000, "imagenes/Kit de inicio Smok Vape Pen V2 kit.jpg", "equipos"],
    ["Vapeador Voopoo Drag x pro kit", 68000, "imagenes/Vapeador Voopoo Drag x pro kit.jpg", "equipos"],

    // Líquidos
    ["Líquidos Punisher 60ml", 13500, "imagenes/Líquidos Punisher 60ml.jpg", "liquidos"],
    ["Sales Punisher 30ml", 13500, "imagenes/Sales Punisher 30ml.jpg", "liquidos"],

    // Accesorios
    ["Cartuchos Zomo", 11000, "imagenes/Cartuchos Zomo.jpg", "accesorios"],
    ["Cartucho Novo2", 11000, "imagenes/Cartucho Novo2.jpg", "accesorios"],
    ["Resistencia TPP", 13000, "imagenes/Resistencia TPP.jpg", "accesorios"],
    ["Bateria LG - 18650", 14000, "imagenes/Bateria LG - 18650.jpg", "accesorios"],
    ["Vidrios Smok Pen", 11000, "imagenes/Vidrios Smok Pen.jpg", "accesorios"],
    ["Bateria 21700", 18000, "imagenes/Bateria 21700.jpg", "accesorios"],
    ["Algodon Cotton Bacon 10gr", 8500, "imagenes/Algodon Cotton Bacon 10gr.jpg", "accesorios"],
    ["Cargador Slim K2",  26000, "imagenes/Cargador Slim K2.jpg", "accesorios"],
];

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
    totalCarrito.textContent = total.toLocaleString('es-AR');
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
    let url = `https://wa.me/5492914461862?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

// Función para renderizar los productos en la pestaña correcta
function renderizarProductos(categoria) {
    const contenedor = document.getElementById(categoria).querySelector('.row');
    contenedor.innerHTML = ''; // Limpia el contenedor antes de renderizar
    const productosFiltrados = categoria === 'todos' ? productos : productos.filter(p => p[3] === categoria);
    productosFiltrados.forEach(([nombre, precio, imagen]) => {
        const card = `
            <div class="col-md-4 col-sm-6 producto-item">
                <div class="card shadow h-100 text-center">
                    <img src="${imagen}" class="producto-img" alt="${nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="precio">$${precio.toLocaleString('es-AR')}</p>
                        <button class="btn-negro w-100" onclick="agregarAlCarrito('${nombre}', ${precio})">
                            <i class="bi bi-cart-plus"></i> Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>`;
        contenedor.insertAdjacentHTML("beforeend", card);
    });
}

// Búsqueda
const searchForm = document.getElementById('form-buscador');
const searchInput = document.getElementById('input-buscador');
const searchBtn = searchForm.querySelector('.btn');
const mensajeBusqueda = document.getElementById('mensaje-busqueda');
const contenedorVerTodos = document.getElementById('contenedor-ver-todos');

// Botón de la lupa en escritorio
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

// Formulario de búsqueda
searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const termino = searchInput.value;
    buscarProductos(termino);
});

function buscarProductos(termino) {
    const terminoBusqueda = termino.trim().toLowerCase();
    
    // Filtra los productos visibles en la pestaña activa
    const pestañaActiva = document.querySelector('.tab-pane.show.active').id;
    const productosDisponibles = document.querySelectorAll(`#${pestañaActiva} .producto-item`);
    
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

// Inicializar la página
document.addEventListener("DOMContentLoaded", () => {
    // Renderiza la pestaña "Descartables" al cargar la página
    renderizarProductos('descartables');
    // Agrega listeners a los botones de las pestañas
    const tabTriggers = document.querySelectorAll('#myTab button');
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('shown.bs.tab', event => {
            const categoria = event.target.id.split('-')[0];
            renderizarProductos(categoria);
        });
    });
});