const formulario = document.querySelector("#formulario-registro");
const lista = document.querySelector("#lista-inscripciones");
const mensaje = document.querySelector("#mensaje");

// Consulta y muestra las inscripciones.
async function cargarInscripciones() {
  try {
    const respuesta = await fetch("/api/inscripciones");

    if (!respuesta.ok) {
      throw new Error("No se pudo consultar la lista.");
    }

    const inscripciones = await respuesta.json();
    lista.textContent = "";

    if (inscripciones.length === 0) {
      const elemento = document.createElement("li");
      elemento.textContent = "Aún no hay inscripciones.";
      lista.appendChild(elemento);
      return;
    }

    inscripciones.forEach((inscripcion) => {
      const elemento = document.createElement("li");

      elemento.textContent =
        `${inscripcion.nombre} - ${inscripcion.correo} - ` +
        `${inscripcion.telefono} - ${inscripcion.taller} - ` +
        `${inscripcion.horario}`;

      lista.appendChild(elemento);
    });
  } catch (error) {
    mensaje.textContent = error.message;
  }
}

// Escucha cuando se envía el formulario.
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const datosFormulario = new FormData(formulario);

  const inscripcion = {
    nombre: datosFormulario.get("nombre"),
    correo: datosFormulario.get("correo"),
    telefono: datosFormulario.get("telefono"),
    taller: datosFormulario.get("taller"),
    horario: datosFormulario.get("horario")
  };

  try {
    const respuesta = await fetch("/api/inscripciones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inscripcion)
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(resultado.mensaje || "No se pudo registrar.");
    }

    mensaje.textContent = "Inscripción registrada correctamente.";
    formulario.reset();
    await cargarInscripciones();
  } catch (error) {
    mensaje.textContent = error.message;
  }
});

cargarInscripciones();