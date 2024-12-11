const obtenerUrl = (ruta) => `${RequestsAPI.urlBaseBackend}/${ruta}`;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export class RequestsAPI {
  static urlBaseBackend = "http://localhost:4000";

  static verificarDisponibilidad({ fecha, hora, personas }) {
    const body = JSON.stringify({ fecha, hora, personas });
    return fetch(obtenerUrl("reserva/disponibilidad"), {
      method: "POST",
      body,
      headers,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  static crearReserva({ nombre, email, fecha, hora, personas }) {
    const body = JSON.stringify({ nombre, email, fecha, hora, personas });
    return fetch(obtenerUrl("reserva"), {
      method: "POST",
      body,
      headers,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // Obtener todos los productos
  static getProductos() {
    return fetch(obtenerUrl("productos"), {
      method: "GET",
      headers,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // Obtener producto por ID
  static getProductoById(id) {
    return fetch(obtenerUrl(`producto/${id}`), {
      method: "GET",
      headers,
    })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  static deleteProducto(id) {
    return fetch(obtenerUrl(`producto/${id}`), { method: "DELETE", headers })
      .then(procesarRespuesta)
      .catch(manejarErrores);
  }

  // Obtener productos similares por ID del producto
  static getProductosSimilares(id) {
    if (!id || isNaN(id)) {
      throw new Error("ID no válido");
    }
    return fetch(obtenerUrl(`productos/similares/${id}`), {
      method: "GET",
      headers,
    })
      .then(procesarRespuesta)
      .catch((error) => {
        console.error("Error al cargar productos similares:", error);
        throw error;
      });
  }
}

const procesarRespuesta = (res) => {
  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data.error);
    }
    return data;
  });
};

const manejarErrores = (error = new Error("Error desconocido")) => {
  console.error("Ha ocurrido un error:", error.message);
  throw error.message;
};
