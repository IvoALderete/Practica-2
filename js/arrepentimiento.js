
// =====================================
// FORMULARIO DE ARREPENTIMIENTO
// =====================================

const formArrepentimiento =
    document.getElementById("form-arrepentimiento");

const mensajeArrepentimiento =
    document.getElementById("mensaje-arrepentimiento");


// =====================================
// ENVIAR SOLICITUD
// =====================================

formArrepentimiento.addEventListener("submit", (e) => {

    e.preventDefault();

    const numeroPedido = document
        .getElementById("numero-pedido")
        .value.trim()
        .toUpperCase();

    const email = document
        .getElementById("email-arrepentimiento")
        .value.trim()
        .toLowerCase();

    const pedidos = obtenerPedidos();

    // Buscar pedido por número y correo
    const pedido = pedidos.find(item =>
        item.numero.toUpperCase() === numeroPedido &&
        item.email.toLowerCase() === email
    );

    if (!pedido) {

        mensajeArrepentimiento.textContent =
            "No encontramos un pedido con esos datos. Revisá el número y el correo.";

        return;
    }

    // Verificar si ya existe una solicitud
    const solicitudes = JSON.parse(
        localStorage.getItem(CLAVE_SOLICITUDES) || "[]"
    );

    const solicitudExistente = solicitudes.some(solicitud =>
        solicitud.numeroPedido === numeroPedido
    );

    if (solicitudExistente) {

        mensajeArrepentimiento.textContent =
            "Ya existe una solicitud para este pedido.";

        return;
    }

    // Crear solicitud
    const nuevaSolicitud = {
        numeroPedido: numeroPedido,
        email: email,
        fecha: new Date().toISOString(),
        estado: "Solicitud recibida"
    };

    solicitudes.push(nuevaSolicitud);

    localStorage.setItem(
        CLAVE_SOLICITUDES,
        JSON.stringify(solicitudes)
    );

    // Actualizar estado del pedido
    pedido.estado = "Solicitud de arrepentimiento recibida";

    guardarPedidos(pedidos);

    mensajeArrepentimiento.textContent =
        `Tu solicitud para el pedido ${numeroPedido} fue registrada correctamente en esta demostración.`;

    formArrepentimiento.reset();

});
