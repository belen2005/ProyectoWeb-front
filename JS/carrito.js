const mostrarCarrito = () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedorCarrito = document.getElementById("contenedor-carrito");
  const popup = document.getElementById("popup");

  if (carrito.length === 0) {
    // Mostrar popup si el carrito está vacío
    popup.style.display = "flex";
  } else {
    // Ocultar el popup si el carrito no está vacío
    popup.style.display = "none";

    // Limpiar el contenedor antes de agregar los productos
    contenedorCarrito.innerHTML = '';

    carrito.forEach(item => {
      contenedorCarrito.innerHTML += `
        <div class="producto-carrito" id="producto-${item.id}">
          <h3>${item.producto}</h3>
          <p>${item.precio}</p>
          <p>Cantidad: ${item.cantidad}</p>
          
        </div>
      `;
    });
  }
};

// Función para vaciar el carrito
const vaciarCarrito = () => {
  // Vaciamos el carrito en localStorage
  localStorage.removeItem("carrito");
  mostrarCarrito(); // Actualizamos la vista del carrito
};

// Vinculamos el evento "vaciar carrito" al botón
document.getElementById("vaciar-carrito").addEventListener("click", vaciarCarrito);

// Vinculamos el evento para redirigir al inicio desde el popup
document.getElementById("volver-inicio").addEventListener("click", () => {
  window.location.href = "/"; // Redirige a la página de inicio
});

// Mostrar el carrito cuando se carga la página
mostrarCarrito();
