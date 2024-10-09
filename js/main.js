// Código JavaScript Completo (js/main.js)

const API_URL = "http://localhost:3000/productos";

// Obtener Productos y Renderizar Cards
async function obtenerProductos() {
    try {
        const respuesta = await fetch(API_URL);
        if (!respuesta.ok) {
            throw new Error("Error al obtener productos");
        }
        const data = await respuesta.json();
        renderizarProductos(data);
    } catch (error) {
        console.error("Hubo un problema:", error);
    }
}

function renderizarProductos(productos) {
    const lista = document.getElementById("productos-lista");
    lista.innerHTML = "";
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-container--info">
                <p class="product-name">${producto.nombre}</p>
                <div class="card-container--value">
                    <p class="product-price">$${producto.precio}</p>
                    <img src="assets/trash.png" alt="Eliminar" class="delete-icon" onclick="eliminarProducto(${producto.id})">
                </div>
            </div>
        `;
        lista.appendChild(card);
    });
}

// Capturar el Evento Submit del Formulario para Agregar Productos
document.getElementById("formulario-agregar").addEventListener("submit", async (evento) => {
    evento.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtener valores de los campos del formulario
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const imagen = document.getElementById("imagen").value;

    // Crear un objeto producto
    const nuevoProducto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen
    };

    // Enviar el nuevo producto al servidor
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoProducto)
        });

        if (!respuesta.ok) {
            throw new Error("Error al agregar el producto");
        }

        // Volver a obtener y renderizar los productos después de agregar uno nuevo
        obtenerProductos();
    } catch (error) {
        console.error("Hubo un problema al agregar el producto:", error);
    }
});

// Método para Eliminar un Producto
async function eliminarProducto(id) {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("Error al eliminar el producto");
        }

        // Volver a obtener y renderizar los productos después de eliminar uno
        obtenerProductos();
    } catch (error) {
        console.error("Hubo un problema al eliminar el producto:", error);
    }
}

// Inicializar la Obtención de Productos
document.addEventListener("DOMContentLoaded", obtenerProductos);