
// ARRAY DEL CARRITO

let carrito = [];


// AGREGAR PRODUCTOS

function agregarCarrito(nombre, precio) {

    const producto = {
        nombre: nombre,
        precio: precio
    };

    carrito.push(producto);

    actualizarCarrito();

    alert(nombre + " agregado al carrito.");
}


// ACTUALIZAR CARRITO

function actualizarCarrito() {

    const contenedor = document.getElementById("productos-carrito");
    const contador = document.getElementById("contador");
    const totalElemento = document.getElementById("total");

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, index) => {

        total += producto.precio;

        contenedor.innerHTML += `
            <div class="cart-item">

                <span>${producto.nombre}</span>

                <span>$${producto.precio.toLocaleString("es-AR")}</span>

                <button onclick="eliminarProducto(${index})">
                    Eliminar
                </button>

            </div>
        `;
    });

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    }

    contador.textContent = carrito.length;

    totalElemento.textContent = total.toLocaleString("es-AR");
}


// ELIMINAR PRODUCTOS

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();
}


// VACIAR CARRITO

function vaciarCarrito() {

    carrito = [];

    actualizarCarrito();
}


// MOSTRAR CARRITO

function mostrarCarrito() {

    document.getElementById("carrito").scrollIntoView({
        behavior: "smooth"
    });
}


// FILTRAR PRODUCTOS

function filtrarProductos(categoria, boton) {

    const productos = document.querySelectorAll(".product-card");

    productos.forEach(producto => {

        if (
            categoria === "todos" ||
            producto.dataset.categoria === categoria
        ) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }

    });

    // CAMBIAR BOTÓN ACTIVO

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    boton.classList.add("active");

    // LIMPIAR BUSCADOR

    document.getElementById("buscador").value = "";
}


// BUSCAR PRODUCTOS

function buscarProductos() {

    const buscador = document.getElementById("buscador");

    const texto = buscador.value.toLowerCase();

    const productos = document.querySelectorAll(".product-card");

    productos.forEach(producto => {

        const nombre = producto.querySelector("h3").textContent.toLowerCase();

        if (nombre.includes(texto)) {
            producto.style.display = "block";
        } else {
            producto.style.display = "none";
        }

    });

    // QUITAR FILTRO ACTIVO

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

}
