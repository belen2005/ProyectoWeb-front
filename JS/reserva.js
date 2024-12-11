import { obtenerValorInput, imprimir } from "../utils/helpers.js";
import { RequestsAPI } from "../RequestsAPI.js";

document.querySelector("#form-reserva-submit").addEventListener("click", () => {
  const nombre = obtenerValorInput("nombre");
  const email = obtenerValorInput("email");
  const fecha = obtenerValorInput("fecha");
  const hora = obtenerValorInput("hora");
  const personas = parseInt(obtenerValorInput("personas"), 10);

  if (!nombre || !email || !fecha || !hora || !personas) {
    imprimir("form-reserva-error", "Por favor complete todos los campos");
    eliminarMensaje("form-reserva-error");
    return;
  }

  if (personas < 1 || personas > 10) {
    imprimir("form-reserva-error", "El número de personas debe ser entre 1 y 10.");
    eliminarMensaje("form-reserva-error");
    return;
  }

  RequestsAPI.verificarDisponibilidad({ fecha, hora, personas })
    .then((respuesta) => {
      if (respuesta.disponible) {
        mostrarModalDisponibilidad("Hay disponibilidad en el horario seleccionado.");
      } else {
        throw new Error(respuesta.message || "No hay disponibilidad en el horario.");
      }
    })
    .catch((error) => {
      imprimir("form-reserva-error", error.message);
      eliminarMensaje("form-reserva-error");
    });
});

function mostrarModalDisponibilidad(mensaje) {
  document.getElementById("modal-mensaje").textContent = mensaje;
  document.getElementById("modal-disponibilidad").style.display = "flex";
}

document.getElementById("confirmar-reserva").addEventListener("click", () => {
  const nombre = obtenerValorInput("nombre");
  const email = obtenerValorInput("email");
  const fecha = obtenerValorInput("fecha");
  const hora = obtenerValorInput("hora");
  const personas = parseInt(obtenerValorInput("personas"), 10);

  RequestsAPI.crearReserva({ nombre, email, fecha, hora, personas })
    .then(() => {
      imprimir("form-reserva-success", "Reserva creada exitosamente.");
      eliminarMensaje("form-reserva-success");
      document.getElementById("modal-disponibilidad").style.display = "none";
    })
    .catch((error) => {
      imprimir("form-reserva-error", error.message);
      eliminarMensaje("form-reserva-error");
    });
});

document.getElementById("cancelar-reserva").addEventListener("click", () => {
  document.getElementById("modal-disponibilidad").style.display = "none";
});

function eliminarMensaje(id) {
  setTimeout(() => {
    const mensaje = document.getElementById(id);
    if (mensaje) {
      mensaje.textContent = '';
    }
  }, 5000); // Eliminar el mensaje después de 5 segundos
}
