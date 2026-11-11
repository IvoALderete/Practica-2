
// =====================================
// ELEMENTOS DEL CHECKOUT
// =====================================

const formCheckout = document.getElementById("form-checkout");
const resumenProductos = document.getElementById("resumen-productos");
const checkoutTotal = document.getElementById("checkout-total");
const mensajeCheckout = document.getElementById("mensaje-checkout");


// =====================================
// MOSTRAR RESUMEN
// =====================================

function mostrarResumenCheckout() {

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        window.location.href = "carrito.html";
        return;
    }

    let total = 0;

    resumenProductos.innerHTML = carrito.map(item => {

        const producto = obtenerProducto(item.id);

        if (!producto) return "";

        const subtotal = producto.precio * item.cantidad;

        total += subtotal;

        return `
            <div class="checkout-producto">
                <span>
                    ${producto.nombre} x ${item.cantidad}
                </span>

                <span>
                    ${formatearPrecio(subtotal)}
                </span>
            </div>
        `;

    }).join("");

    checkoutTotal.textContent = formatearPrecio(total);
}


// =====================================
// CONFIRMAR PEDIDO
// =====================================

formCheckout.addEventListener("submit", (e) => {

    e.preventDefault();

    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        window.location.href = "carrito.html";
        return;
    }

    const nombre = document.getElementById("nombre-cliente").value.trim();
    const email = document.getElementById("email-cliente").value.trim();
    const telefono = document.getElementById("telefono-cliente").value.trim();

    const direccion = document.getElementById("direccion-cliente").value.trim();
    const ciudad = document.getElementById("ciudad-cliente").value.trim();
    const provincia = document.getElementById("provincia-cliente").value.trim();
    const codigoPostal = document.getElementById("codigo-postal").value.trim();

    const metodoPago = document.getElementById("metodo-pago").value;

    const total = carrito.reduce((acumulado, item) => {

        const producto = obtenerProducto(item.id);

        return acumulado + (producto ? producto.precio * item.cantidad : 0);

    }, 0);

    // Generar un número de pedido de demostración
    const numeroPedido = "TS-" + Date.now().toString().slice(-8);

    const pedido = {
        numero: numeroPedido,
        nombre: nombre,
        email: email,
        telefono: telefono,
        direccion: direccion,
        ciudad: ciudad,
        provincia: provincia,
        codigoPostal: codigoPostal,
        metodoPago: metodoPago,
        productos: carrito.map(item => ({
            id: item.id,
            cantidad: item.cantidad
        })),
        total: total,
        fecha: new Date().toISOString(),
        estado: "Pendiente"
    };

    // Guardar pedido en el navegador
    const pedidos = obtenerPedidos();

    pedidos.push(pedido);

    guardarPedidos(pedidos);

    // Vaciar carrito
    guardarCarrito([]);

    actualizarContadoresCarrito();

    // Mostrar confirmación
    formCheckout.reset();

    resumenProductos.innerHTML = "";

    mensajeCheckout.innerHTML = `
        <strong>¡Pedido registrado correctamente!</strong><br><br>
        Tu número de pedido es: <strong>${numeroPedido}</strong><br>
        Total: ${formatearPrecio(total)}<br><br>
        Recordá guardar tu número de pedido para futuras consultas.
        <br><br>
        <a href="index.html" class="btn-principal">
            Volver al inicio
        </a>
    `;

    // Ocultar el formulario después de confirmar
    formCheckout.classList.add("oculto");

    // Actualizar el total mostrado
    checkoutTotal.textContent = formatearPrecio(total);

});


// =====================================
// INICIALIZAR
// =====================================

mostrarResumenCheckout();
