export default class Producto {
  constructor(id, producto, precio, descripcion, foto) {
    this.id = id;
    this.producto = producto;
    this.precio = precio;
    this.descripcion = descripcion;
    this.foto = foto;
  }

  mostrarDetalle() {
    return `
      <div class="detalleProducto">
       <img src="${this.foto}" alt="${this.producto}">
        <div class="info-producto">
          <h1>${this.producto}</h1>
          <p class="precio">$${this.precio}</p>
          <p>${this.descripcion}</p>
          <div class="cantidad">
            <label for="cantidad">Cantidad:</label>
            <input id="cantidad" type="number" value="1" min="1">
          </div>
          <button class="boton-agregar">Agregar al carrito</button>
        </div>
      </div>
    `;
  }



  static agregarAlCarrito(id, producto, precio, cantidad, foto) {
    const productoCarrito = { id, producto, precio, cantidad, foto };

    // Recuperar el carrito del almacenamiento local
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    console.log(carrito); // Verifica el contenido del carrito

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
      // Si el producto ya está en el carrito, actualizar solo la cantidad
      productoExistente.cantidad += cantidad; // Cambia += para acumular cantidades
    } else {
      // Si el producto no está en el carrito, agregarlo con la cantidad seleccionada
      carrito.push(productoCarrito);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
}
