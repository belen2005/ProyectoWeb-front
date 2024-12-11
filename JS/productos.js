import { RequestsAPI } from "../RequestsAPI.js";

const contenedorProductos = document.getElementById("productos-lista");

// Función para renderizar productos en el HTML
const renderizarProductos = (productos) => {
  contenedorProductos.innerHTML = ""; // Limpia el contenedor
  productos.forEach((producto) => {
    // Crear un elemento HTML para cada producto
    const productoElemento = document.createElement("div");
    productoElemento.classList.add("producto-item");
    productoElemento.innerHTML = `
    <div class="producto">
        <img src="${producto.foto}" alt="${producto.producto}">
        <h3>${producto.producto}</h3>
        <p>Precio: ${producto.precio}</p>
       <a href="ampliacionProducto.html?id=${producto.id}"><button>Ver más</button></a>
    </div>
`;

    contenedorProductos.appendChild(productoElemento);
  });
};

// Función para cargar los productos
const cargarProductos = () => {
  RequestsAPI.getProductos()
    .then((productos) => {
      renderizarProductos(productos);
    })
    .catch((error) => {
      console.error("Error al obtener los productos:", error);
      contenedorProductos.innerHTML = "<p>No se pudieron cargar los productos.</p>";
    });
};

// Ejecuta cargarProductos cuando cargue la página
document.addEventListener("DOMContentLoaded", cargarProductos);
