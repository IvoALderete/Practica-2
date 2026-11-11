
// =====================================
// 1. ARRAY DEL CARRITO
// =====================================

let carrito = [];

let categoriaActual = "todos";


// =====================================
// 2. AGREGAR PRODUCTOS
// =====================================

function agregarCarrito(nombre, precio) {

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        const nuevoProducto = {
            nombre: nombre,
            precio: precio,
            cantidad: 1
        };

        carrito.push(nuevoProducto);

    }

    actualizarCarrito();

}


// =====================================
// 3. ACTUALIZAR CARRITO
// =====================================

function actualizarCarrito() {

    const contenedor = document.getElementById("productos-carrito");

    const contador = document.getElementById("contador");

    const totalElemento = document.getElementById("total");

    contenedor.innerHTML = "";

    let total = 0;

    let cantidadTotal = 0;


    carrito.forEach((producto, index) => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        cantidadTotal += producto.cantidad;


        contenedor.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>${producto.nombre}</strong>

                    <p>
                        Precio unitario:
                        $${producto.precio.toLocaleString("es-AR")}
                    </p>

                    <p>
                        Cantidad: ${producto.cantidad}
                    </p>

                    <p>
                        Subtotal:
                        $${subtotal.toLocaleString("es-AR")}
                    </p>

                </div>


                <div class="cart-actions">

                    <button onclick="cambiarCantidad(${index}, -1)">
                        -
                    </button>

                    <button onclick="cambiarCantidad(${index}, 1)">
                        +
                    </button>

                    <button
                        class="delete-button"
                        onclick="eliminarProducto(${index})"
                    >
                        Eliminar
                    </button>

                </div>

            </div>

        `;

    });


    if (carrito.length === 0) {

        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";

    }


    contador.textContent = cantidadTotal;

    totalElemento.textContent = total.toLocaleString("es-AR");

}


// =====================================
// 4. CAMBIAR CANTIDADES
// =====================================

function cambiarCantidad(index, cantidad) {

    carrito[index].cantidad += cantidad;


    if (carrito[index].cantidad <= 0) {

        carrito.splice(index, 1);

    }


    actualizarCarrito();

}


// =====================================
// 5. ELIMINAR PRODUCTO
// =====================================

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();

}


// =====================================
// 6. VACIAR CARRITO
// =====================================

function vaciarCarrito() {

    carrito = [];

    actualizarCarrito();

}


// =====================================
// 7. MOSTRAR CARRITO
// =====================================

function mostrarCarrito() {

    document.getElementById("carrito").scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================
// 8. BUSCAR PRODUCTOS
// =====================================

function buscarProductos() {

    const texto = document
        .getElementById("buscador")
        .value
        .toLowerCase()
        .trim();

    const productos = document.querySelectorAll(".product-card");

    let encontrados = 0;


    productos.forEach(producto => {

        const nombre = producto
            .querySelector("h3")
            .textContent
            .toLowerCase();

        const categoria = producto.dataset.categoria;

        const coincideTexto = nombre.includes(texto);

        const coincideCategoria =
            categoriaActual === "todos" ||
            categoria === categoriaActual;


        if (coincideTexto && coincideCategoria) {

            producto.style.display = "block";

            encontrados++;

        } else {

            producto.style.display = "none";

        }

    });


    document.getElementById("sin-resultados").hidden =
        encontrados > 0;

}


// =====================================
// 9. FILTRAR PRODUCTOS
// =====================================

function filtrarProductos(categoria, boton) {

    categoriaActual = categoria;


    document.querySelectorAll(".filter-btn").forEach(btn => {

        btn.classList.remove("active");

    });


    boton.classList.add("active");


    buscarProductos();

}


// =====================================
// 10. EVENTOS AL CARGAR LA PÁGINA
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // Evento del buscador

    document.getElementById("buscador").addEventListener(
        "input",
        buscarProductos
    );


    // Eventos de los filtros

    document.querySelectorAll(".filter-btn").forEach(boton => {

        boton.addEventListener("click", () => {

            filtrarProductos(
                boton.dataset.filtro,
                boton
            );

        });

    });


    // Inicializar carrito

    actualizarCarrito();

});
