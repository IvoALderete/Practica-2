
// =====================================
// ELEMENTOS DEL INICIO
// =====================================

const contenedorProductos = document.getElementById("contenedor-productos");
const buscador = document.getElementById("buscador");
const ordenarProductos = document.getElementById("ordenar-productos");
const cantidadResultados = document.getElementById("cantidad-resultados");
const sinResultados = document.getElementById("sin-resultados");

let categoriaSeleccionada = "todos";


// =====================================
// MOSTRAR PRODUCTOS
// =====================================

function mostrarProductos() {

    let productosFiltrados = [...productos];

    // Filtrar por categoría
    if (categoriaSeleccionada !== "todos") {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.categoria === categoriaSeleccionada
        );
    }

    // Filtrar por búsqueda
    const busqueda = buscador.value.toLowerCase().trim();

    if (busqueda !== "") {
        productosFiltrados = productosFiltrados.filter(producto =>
            producto.nombre.toLowerCase().includes(busqueda) ||
            producto.descripcion.toLowerCase().includes(busqueda)
        );
    }

    // Ordenar productos
    switch (ordenarProductos.value) {
        case "menor":
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;

        case "mayor":
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;

        case "nombre":
            productosFiltrados.sort((a, b) =>
                a.nombre.localeCompare(b.nombre)
            );
            break;
    }

    cantidadResultados.textContent =
        `${productosFiltrados.length} productos encontrados`;

    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = "";
        sinResultados.classList.remove("oculto");
        return;
    }

    sinResultados.classList.add("oculto");

    contenedorProductos.innerHTML = productosFiltrados.map(producto => `
        <article class="producto-card">
            <img
                class="producto-imagen"
                src="${producto.imagen}"
                alt="${producto.nombre}"
                loading="lazy"
            >

            <div class="producto-info">
                <span class="producto-categoria">
                    ${producto.categoria}
                </span>

                <h3>${producto.nombre}</h3>

                <p class="producto-descripcion">
                    ${producto.descripcion}
                </p>

                <p class="producto-precio">
                    ${formatearPrecio(producto.precio)}
                </p>

                <button
                    class="btn-agregar"
                    data-id="${producto.id}"
                >
                    Agregar al carrito
                </button>
            </div>
        </article>
    `).join("");
}


// =====================================
// FILTROS Y BÚSQUEDA
// =====================================

buscador.addEventListener("input", mostrarProductos);

ordenarProductos.addEventListener("change", mostrarProductos);

document.querySelectorAll("[data-category]").forEach(boton => {

    boton.addEventListener("click", () => {

        categoriaSeleccionada = boton.dataset.category;

        document.querySelectorAll(".filtro").forEach(filtro => {
            filtro.classList.toggle(
                "activo",
                filtro.dataset.category === categoriaSeleccionada
            );
        });

        mostrarProductos();

        document.getElementById("productos").scrollIntoView({
            behavior: "smooth"
        });
    });

});


// =====================================
// AGREGAR AL CARRITO
// =====================================

contenedorProductos.addEventListener("click", (e) => {

    const boton = e.target.closest(".btn-agregar");

    if (!boton) return;

    const id = Number(boton.dataset.id);

    let carrito = obtenerCarrito();

    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            id: id,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    actualizarContadoresCarrito();

    const textoOriginal = boton.textContent;

    boton.textContent = "¡Agregado!";
    boton.style.background = "var(--color-cyan)";
    boton.style.color = "#10141b";

    setTimeout(() => {
        boton.textContent = textoOriginal;
        boton.style.background = "";
        boton.style.color = "";
    }, 1000);

});


// =====================================
// INICIALIZAR
// =====================================

mostrarProductos();
