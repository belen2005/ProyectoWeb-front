import { RequestsAPI } from "../RequestsAPI.js";
import Producto from "../models/producto.js";

document.addEventListener("DOMContentLoaded", function() {
    // Llamar a la API para obtener los productos
    RequestsAPI.getProductos()
      .then((productos) => {
        const productosDestacadosContainer = document.getElementById("productosDestacados");
  
        // Limpiar el contenedor antes de agregar nuevos productos
        productosDestacadosContainer.innerHTML = "";
  
        // Seleccionar los últimos 4 productos
        const productosDestacados = productos.slice(-3);
  
        // Recorrer los productos destacados y agregarlos al contenedor
        productosDestacados.forEach((producto) => {
          // Crear un nuevo objeto Producto usando la clase Producto
          const prod = new Producto(
            producto.id,
            producto.producto,
            producto.precio,
            producto.descripcion,
            producto.foto
          );
  
          // Mostrar solo la foto, el nombre del producto y el precio
          productosDestacadosContainer.innerHTML += `
            <div class="producto">
                <img src="${prod.foto}" alt="${prod.producto}" />
                <h3>${prod.producto}</h3>
                <p>Precio: ${prod.precio}</p>
            </div>
          `;
        });
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
      });
});
