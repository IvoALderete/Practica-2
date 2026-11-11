
// =====================================
// 1. CATÁLOGO DE PRODUCTOS
// =====================================

const productos = [
    {
        id: 1,
        nombre: "Placa de Video RTX 4060",
        precio: 450000,
        categoria: "componentes",
        descripcion: "8GB GDDR6 - Excelente rendimiento gamer.",
        imagen: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600"
    },
    {
        id: 2,
        nombre: "Procesador AMD Ryzen 5 5600",
        precio: 185000,
        categoria: "componentes",
        descripcion: "6 núcleos y 12 hilos para gaming y trabajo.",
        imagen: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=600"
    },
    {
        id: 3,
        nombre: "Memoria RAM 16GB DDR4",
        precio: 75000,
        categoria: "componentes",
        descripcion: "Memoria de alto rendimiento para tu PC.",
        imagen: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=600"
    },
    {
        id: 4,
        nombre: "Motherboard B550 Gaming",
        precio: 160000,
        categoria: "componentes",
        descripcion: "Placa madre compatible con AMD Ryzen.",
        imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600"
    },
    {
        id: 5,
        nombre: "SSD NVMe 1TB",
        precio: 110000,
        categoria: "componentes",
        descripcion: "Almacenamiento rápido para tus programas.",
        imagen: "https://images.unsplash.com/photo-1597872200969-2b65d6e9d9a4?w=600"
    },
    {
        id: 6,
        nombre: "Fuente 650W 80 Plus Bronze",
        precio: 95000,
        categoria: "componentes",
        descripcion: "Energía estable y eficiente para tu equipo.",
        imagen: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600"
    },
    {
        id: 7,
        nombre: "Teclado Mecánico RGB",
        precio: 85000,
        categoria: "perifericos",
        descripcion: "Teclas mecánicas e iluminación RGB.",
        imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600"
    },
    {
        id: 8,
        nombre: "Mouse Gamer RGB",
        precio: 35000,
        categoria: "perifericos",
        descripcion: "Precisión y comodidad para jugar.",
        imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600"
    },
    {
        id: 9,
        nombre: "Auriculares Gamer",
        precio: 65000,
        categoria: "perifericos",
        descripcion: "Sonido envolvente y micrófono integrado.",
        imagen: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600"
    },
    {
        id: 10,
        nombre: "Micrófono USB Streaming",
        precio: 72000,
        categoria: "perifericos",
        descripcion: "Ideal para streaming, podcast y reuniones.",
        imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600"
    },
    {
        id: 11,
        nombre: "Monitor 24 pulgadas Full HD",
        precio: 220000,
        categoria: "monitores",
        descripcion: "Pantalla Full HD para trabajar y jugar.",
        imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600"
    },
    {
        id: 12,
        nombre: "Monitor Gamer 27 pulgadas",
        precio: 340000,
        categoria: "monitores",
        descripcion: "Pantalla amplia para una experiencia inmersiva.",
        imagen: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600"
    },
    {
        id: 13,
        nombre: "PC Gamer Ryzen 5",
        precio: 850000,
        categoria: "pcs",
        descripcion: "PC armada para gaming y uso general.",
        imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600"
    },
    {
        id: 14,
        nombre: "Notebook 15 pulgadas",
        precio: 780000,
        categoria: "pcs",
        descripcion: "Ideal para estudiar, trabajar y navegar.",
        imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600"
    },
    {
        id: 15,
        nombre: "Notebook Gamer",
        precio: 1450000,
        categoria: "pcs",
        descripcion: "Potencia y rendimiento para jugar.",
        imagen: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600"
    },
    {
        id: 16,
        nombre: "Gabinete Gamer RGB",
        precio: 130000,
        categoria: "componentes",
        descripcion: "Diseño moderno con iluminación RGB.",
        imagen: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=600"
    }
];


// =====================================
// 2. VARIABLES GENERALES
// =====================================

let categoriaActual = "todos";
let carrito = JSON.parse(localStorage.getItem("techstore-carrito")) || [];

const contenedorProductos = document.getElementById("contenedor-productos");
const buscador = document.getElementById("buscador");
const ordenarProductos = document.getElementById("ordenar-productos");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const cantidadResultados = document.getElementById("cantidad-resultados");
const sinResultados = document.getElementById("sin-resultados");

const formatoPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
});


// =====================================
// 3. MOSTRAR PRODUCTOS
// =====================================

function mostrarProductos() {

    const textoBusqueda = buscador.value.toLowerCase().trim();

    let productosFiltrados = productos.filter(producto => {

        const coincideCategoria =
            categoriaActual === "todos" ||
            producto.categoria === categoriaActual;

        const coincideBusqueda =
            producto.nombre.toLowerCase().includes(textoBusqueda) ||
            producto.descripcion.toLowerCase().includes(textoBusqueda);

        return coincideCategoria && coincideBusqueda;
    });

    // Ordenar productos según la opción elegida.

    const orden = ordenarProductos.value;

    if (orden === "menor") {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
    }

    if (orden === "mayor") {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    if (orden === "nombre") {
        productosFiltrados.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
        );
    }

    // Actualizar cantidad de resultados.

    cantidadResultados.textContent =
        `${productosFiltrados.length} productos encontrados`;

    // Mostrar mensaje si no hay resultados.

    sinResultados.hidden = productosFiltrados.length !== 0;

    // Generar las tarjetas.

    contenedorProductos.innerHTML = productosFiltrados.map(producto => {

        return `
            <article class="product-card">

                <div class="product-image">
                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        loading="lazy"
                    >
                </div>

                <div class="product-info">

                    <span class="product-category">
                        ${obtenerNombreCategoria(producto.categoria)}
                    </span>

                    <h3>${producto.nombre}</h3>

                    <p class="product-description">
                        ${producto.descripcion}
                    </p>

                    <span class="product-price">
                        ${formatoPrecio.format(producto.precio)}
                    </span>

                    <button
                        class="btn-add"
                        data-action="agregar"
                        data-id="${producto.id}"
                    >
                        Agregar al carrito
                    </button>

                </div>

            </article>
        `;

    }).join("");
}


// =====================================
// 4. NOMBRE DE LAS CATEGORÍAS
// =====================================

function obtenerNombreCategoria(categoria) {

    const nombres = {
        componentes: "Componentes",
        perifericos: "Periféricos",
        monitores: "Monitores",
        pcs: "PCs y notebooks"
    };

    return nombres[categoria] || categoria;
}


// =====================================
// 5. FILTRAR POR CATEGORÍA
// =====================================

function filtrarProductos(categoria) {

    categoriaActual = categoria;

    // Actualizar el botón activo.

    document.querySelectorAll(".filter-btn").forEach(boton => {

        boton.classList.toggle(
            "active",
            boton.dataset.category === categoria
        );

    });

    mostrarProductos();

}


// =====================================
// 6. AGREGAR PRODUCTOS AL CARRITO
// =====================================

function agregarCarrito(id) {

    const producto = productos.find(producto => producto.id === id);

    if (!producto) return;

    const productoEnCarrito = carrito.find(item => item.id === id);

    if (productoEnCarrito) {

        productoEnCarrito.cantidad++;

    } else {

        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        });

    }

    actualizarCarrito();

}


// =====================================
// 7. ACTUALIZAR EL CARRITO
// =====================================

function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            '<p class="cart-empty">Todavía no agregaste productos.</p>';

    }

    carrito.forEach((producto, index) => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;
        cantidadTotal += producto.cantidad;

        const elemento = document.createElement("div");

        elemento.classList.add("cart-item");

        elemento.innerHTML = `
            <div class="cart-item-info">

                <strong>${producto.nombre}</strong>

                <span>
                    ${formatoPrecio.format(producto.precio)}
                    cada uno
                </span>

                <span>
                    Subtotal: ${formatoPrecio.format(subtotal)}
                </span>

            </div>

            <div class="cart-actions">

                <button
                    data-action="disminuir"
                    data-index="${index}"
                    aria-label="Disminuir cantidad"
                >−</button>

                <span>${producto.cantidad}</span>

                <button
                    data-action="aumentar"
                    data-index="${index}"
                    aria-label="Aumentar cantidad"
                >+</button>

                <button
                    class="btn-delete"
                    data-action="eliminar"
                    data-index="${index}"
                    aria-label="Eliminar producto"
                >✕</button>

            </div>
        `;

        listaCarrito.appendChild(elemento);

    });

    totalCarrito.textContent = formatoPrecio.format(total);
    contadorCarrito.textContent = cantidadTotal;

    // Guardar el carrito en el navegador.

    localStorage.setItem(
        "techstore-carrito",
        JSON.stringify(carrito)
    );

}


// =====================================
// 8. MODIFICAR CANTIDADES
// =====================================

function cambiarCantidad(index, cambio) {

    if (!carrito[index]) return;

    carrito[index].cantidad += cambio;

    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }

    actualizarCarrito();

}


// =====================================
// 9. ELIMINAR PRODUCTOS
// =====================================

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();

}


// =====================================
// 10. VACIAR EL CARRITO
// =====================================

function vaciarCarrito() {

    carrito = [];

    actualizarCarrito();

}


// =====================================
// 11. EVENTOS DEL CATÁLOGO
// =====================================

// Buscador.

buscador.addEventListener("input", mostrarProductos);

// Ordenamiento.

ordenarProductos.addEventListener("change", mostrarProductos);

// Botones de filtros.

document.querySelectorAll(".filter-btn").forEach(boton => {

    boton.addEventListener("click", () => {

        filtrarProductos(boton.dataset.category);

    });

});

// Tarjetas de categorías.

document.querySelectorAll(".category-card").forEach(boton => {

    boton.addEventListener("click", () => {

        filtrarProductos(boton.dataset.category);

        document.getElementById("catalogo").scrollIntoView({
            behavior: "smooth"
        });

    });

});


// =====================================
// 12. EVENTOS DE LOS PRODUCTOS
// =====================================

contenedorProductos.addEventListener("click", evento => {

    const boton = evento.target.closest("button[data-action='agregar']");

    if (!boton) return;

    const id = Number(boton.dataset.id);

    agregarCarrito(id);

});


// =====================================
// 13. EVENTOS DEL CARRITO
// =====================================

listaCarrito.addEventListener("click", evento => {

    const boton = evento.target.closest("button[data-action]");

    if (!boton) return;

    const accion = boton.dataset.action;
    const index = Number(boton.dataset.index);

    if (accion === "aumentar") {
        cambiarCantidad(index, 1);
    }

    if (accion === "disminuir") {
        cambiarCantidad(index, -1);
    }

    if (accion === "eliminar") {
        eliminarProducto(index);
    }

});

document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);


// =====================================
// 14. INICIALIZAR LA TIENDA
// =====================================

mostrarProductos();
actualizarCarrito();
