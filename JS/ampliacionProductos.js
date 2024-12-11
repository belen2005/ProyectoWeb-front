import { RequestsAPI } from "../RequestsAPI.js";
import Producto from "../models/producto.js";

// Obtén el ID del producto de los parámetros de URL
const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

// Función para mostrar los detalles del producto
const mostrarDetalle = (data) => {
  const producto = new Producto(
    data.id,
    data.producto,
    data.precio,
    data.descripcion,
    data.foto
  );

  const contenedor = document.getElementById("detalleProducto1");
  contenedor.innerHTML = producto.mostrarDetalle();

  const botonAgregar = contenedor.querySelector(".boton-agregar");
  botonAgregar.addEventListener("click", () => {
    const cantidadInput = contenedor.querySelector("#cantidad");
    const cantidad = parseInt(cantidadInput.value) || 1;

    if (cantidad <= 0) {
      alert("Por favor, selecciona una cantidad válida.");
      return;
    }

    Producto.agregarAlCarrito(
      data.id,
      data.producto,
      data.precio,
      cantidad,
      data.foto
    );

    mostrarModalCarrito();
  });

  // Mostrar productos similares solo si el ID es válido
  if (data.id) {
    RequestsAPI.getProductosSimilares(data.id) 
      .then(mostrarSimilares)
      .catch((error) => console.error("Error cargando productos similares:", error));
  } else {
    console.error("ID del producto no es válido.");
  }
};

// Función para mostrar productos similares
const mostrarSimilares = (productos) => {
  const contenedor = document.getElementById("productosSimilares");
  contenedor.innerHTML = "";

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos similares.</p>";
    return;
  }

  productos.forEach((producto) => {
    const similar = new Producto(
      producto.id,
      producto.producto,
      producto.precio,
      producto.descripcion,
      producto.foto
    );
    contenedor.innerHTML += similar.mostrarEnListado();
  });
};

// Función para mostrar el modal de carrito
const mostrarModalCarrito = () => {
  const modal = document.getElementById("modal-carrito");
  modal.style.display = "block";

  const seguirComprandoBtn = document.getElementById("seguir-comprando");
  const verCarritoBtn = document.getElementById("ver-carrito");

  seguirComprandoBtn.addEventListener("click", () => {
    modal.style.display = "none";
    window.location.href = "productos.html";
  });

  verCarritoBtn.addEventListener("click", () => {
    window.location.href = "carrito.html";
  });
};

// Función para mostrar errores en la interfaz
const mostrarError = (error) => {
  const contenedor = document.getElementById("detalleProducto");
  contenedor.innerHTML = `
    <p class="error">Ocurrió un error al cargar los detalles del producto. Por favor, inténtalo de nuevo más tarde.</p>
  `;
  console.error(error);
};

// Obtener el detalle del producto y mostrarlo
if (idProducto) {
  RequestsAPI.getProductoById(idProducto)
    .then(mostrarDetalle)
    .catch(mostrarError);
} else {
  console.error("ID del producto no presente en la URL.");
}
