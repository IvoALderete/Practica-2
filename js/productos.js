
// =====================================
// CATÁLOGO DE PRODUCTOS
// =====================================

const productos = [
    {
        id: 1,
        nombre: "Placa de Video RTX 4060",
        precio: 450000,
        categoria: "componentes",
        descripcion: "Excelente rendimiento para gaming.",
        imagen: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        nombre: "Procesador AMD Ryzen 5 5600",
        precio: 185000,
        categoria: "componentes",
        descripcion: "Potencia y eficiencia para tu PC.",
        imagen: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        nombre: "Memoria RAM 16GB DDR4",
        precio: 75000,
        categoria: "componentes",
        descripcion: "Velocidad para tus aplicaciones.",
        imagen: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        nombre: "Motherboard B550",
        precio: 160000,
        categoria: "componentes",
        descripcion: "Compatible con procesadores AMD.",
        imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        nombre: "SSD NVMe 1TB",
        precio: 110000,
        categoria: "componentes",
        descripcion: "Almacenamiento rápido y confiable.",
        imagen: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        nombre: "Fuente 650W 80 Plus",
        precio: 95000,
        categoria: "componentes",
        descripcion: "Energía estable para tu computadora.",
        imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        nombre: "Gabinete Gamer RGB",
        precio: 130000,
        categoria: "componentes",
        descripcion: "Diseño moderno y excelente ventilación.",
        imagen: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        nombre: "Teclado Mecánico RGB",
        precio: 85000,
        categoria: "perifericos",
        descripcion: "Teclas mecánicas y luces RGB.",
        imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        nombre: "Mouse Gamer RGB",
        precio: 35000,
        categoria: "perifericos",
        descripcion: "Precisión y comodidad para jugar.",
        imagen: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        nombre: "Auriculares Gamer",
        precio: 65000,
        categoria: "perifericos",
        descripcion: "Sonido envolvente y micrófono.",
        imagen: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        nombre: "Micrófono USB",
        precio: 72000,
        categoria: "perifericos",
        descripcion: "Ideal para streaming y reuniones.",
        imagen: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        nombre: "Monitor 24 pulgadas Full HD",
        precio: 220000,
        categoria: "monitores",
        descripcion: "Imágenes claras y colores definidos.",
        imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 13,
        nombre: "Monitor Gamer 27 pulgadas",
        precio: 340000,
        categoria: "monitores",
        descripcion: "Mayor tamaño para una experiencia inmersiva.",
        imagen: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 14,
        nombre: "PC Gamer Ryzen 5",
        precio: 850000,
        categoria: "pcs",
        descripcion: "Computadora lista para jugar.",
        imagen: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 15,
        nombre: "Notebook 15 pulgadas",
        precio: 780000,
        categoria: "pcs",
        descripcion: "Ideal para estudiar y trabajar.",
        imagen: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 16,
        nombre: "Notebook Gamer",
        precio: 1450000,
        categoria: "pcs",
        descripcion: "Alto rendimiento para gaming.",
        imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80"
    }
];


// =====================================
// FUNCIONES COMPARTIDAS
// =====================================

const CLAVE_CARRITO = "techstore-carrito";
const CLAVE_PEDIDOS = "techstore-pedidos";
const CLAVE_SOLICITUDES = "techstore-arrepentimientos";

function obtenerCarrito() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
    } catch (error) {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

function obtenerPedidos() {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_PEDIDOS)) || [];
    } catch (error) {
        return [];
    }
}

function guardarPedidos(pedidos) {
    localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(pedidos));
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0
    }).format(precio);
}

function obtenerProducto(id) {
    return productos.find(producto => producto.id === Number(id));
}

function actualizarContadoresCarrito() {
    const carrito = obtenerCarrito();

    const cantidad = carrito.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    document.querySelectorAll("#contador-carrito").forEach(contador => {
        contador.textContent = cantidad;
    });
}

// Actualizamos el contador al cargar cualquier página.
actualizarContadoresCarrito();
