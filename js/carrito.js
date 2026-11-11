
// =====================================
// ELEMENTOS DEL CARRITO
// =====================================

const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const cantidadResumen = document.getElementById("cantidad-resumen");
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
const btnFinalizarCompra = document.getElementById("btn-finalizar-compra");


// =====================================
// MOSTRAR CARRITO
// =====================================

function mostrarCarrito() {

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {

        listaCarrito.innerHTML = `
            <div class="carrito-vacio">
                <h2>Tu carrito está vacío</h2>
                <p>Todavía no agregaste ningún producto.</p>
                <a href="index.html#productos" class="btn-principal">
                    Explorar productos
                </a>
            </div>
        `;

        totalCarrito.textContent = formatearPrecio(0);
        cantidadResumen.textContent = "0";

        btnFinalizarCompra.disabled = true;
        btnFinalizarCompra.style.opacity = "0.5";

        actualizarContadoresCarrito();
        return;
    }

    btnFinalizarCompra.disabled = false;
    btnFinalizarCompra.style.opacity = "1";

    let total = 0;
    let cantidadTotal = 0;

    listaCarrito.innerHTML = carrito.map((item, index) => {

        const producto = obtenerProducto(item.id);

        if (!producto) return "";

        const subtotal = producto.precio * item.cantidad;

        total += subtotal;
        cantidadTotal += item.cantidad;

        return `
            <article class="carrito-item">

                <img src="${producto.imagen}" alt="${producto.nombre}">

                <div>
                    <h3>${producto.nombre}</h3>

                    <p>${formatearPrecio(producto.precio)}</p>

                    <div class="cantidad-controles">

                        <button
                            data-accion="restar"
                            data-index="${index}"
                            aria-label="Disminuir cantidad"
                        >−</button>

                        <span>${item.cantidad}</span>

                        <button
                            data-accion="sumar"
                            data-index="${index}"
                            aria-label="Aumentar cantidad"
                        >+</button>

                    </div>
                </div>

                <div>
                    <p>${formatearPrecio(subtotal)}</p>

                    <button
                        class="btn-eliminar"
                        data-accion="eliminar"
                        data-index="${index}"
                    >
                        Eliminar
                    </button>
                </div>

            </article>
        `;

    }).join("");

    totalCarrito.textContent = formatearPrecio(total);
    cantidadResumen.textContent = cantidadTotal;

    actualizarContadoresCarrito();
}


// =====================================
// MODIFICAR CANTIDADES
// =====================================

listaCarrito.addEventListener("click", (e) => {

    const boton = e.target.closest("[data-accion]");

    if (!boton) return;

    const accion = boton.dataset.accion;
    const index = Number(boton.dataset.index);

    let carrito = obtenerCarrito();

    if (!carrito[index]) return;

    if (accion === "sumar") {
        carrito[index].cantidad++;
    }

    if (accion === "restar") {
        carrito[index].cantidad--;

        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1);
        }
    }

    if (accion === "eliminar") {
        carrito.splice(index, 1);
    }

    guardarCarrito(carrito);
    mostrarCarrito();
});


// =====================================
// VACIAR CARRITO
// =====================================

btnVaciarCarrito.addEventListener("click", () => {

    const carrito = obtenerCarrito();

    if (carrito.length === 0) return;

    const confirmar = confirm(
        "¿Estás seguro de que querés vaciar el carrito?"
    );

    if (!confirmar) return;

    guardarCarrito([]);
    mostrarCarrito();

});


// =====================================
// IR AL CHECKOUT
// =====================================

btnFinalizarCompra.addEventListener("click", () => {

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    window.location.href = "checkout.html";

});


// =====================================
// INICIALIZAR
// =====================================

mostrarCarrito();
