const formulario = document.querySelector("#formulario-registro");
const lista = document.querySelector("#lista-inscripciones");
const mensaje = document.querySelector("#mensaje");
const botonGuardar = formulario.querySelector('button[type="submit"]');

const campoNombre = document.querySelector("#nombre");
const campoTelefono = document.querySelector("#telefono");

let idEnEdicion = null;

// Permite letras y espacios en el nombre.
// También permite puntos, apóstrofes y guiones.
campoNombre.addEventListener("input", () => {
  campoNombre.value = campoNombre.value.replace(
    /[^\p{L}\p{M} .'-]/gu,
    ""
  );
});

// Permite únicamente números en el teléfono.
campoTelefono.addEventListener("input", () => {
  campoTelefono.value = campoTelefono.value.replace(/[^0-9]/g, "");
});

// Consulta y muestra las inscripciones guardadas.
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

      const texto = document.createElement("p");
      texto.textContent =
        `${inscripcion.nombre} - ` +
        `${inscripcion.correo} - ` +
        `${inscripcion.telefono} - ` +
        `${inscripcion.taller} - ` +
        `${inscripcion.horario} - ` +
        `${inscripcion.modalidad} - ` +
        `${inscripcion.nivel_experiencia}`;

      const botonEditar = document.createElement("button");
      botonEditar.type = "button";
      botonEditar.textContent = "Editar";

      botonEditar.addEventListener("click", () => {
        prepararEdicion(inscripcion);
      });

      const botonEliminar = document.createElement("button");
      botonEliminar.type = "button";
      botonEliminar.textContent = "Eliminar";

      botonEliminar.addEventListener("click", () => {
        eliminarInscripcion(inscripcion.id);
      });

      elemento.append(texto, botonEditar, botonEliminar);
      lista.appendChild(elemento);
    });
  } catch (error) {
    mensaje.textContent = error.message;
  }
}

// Coloca los datos de la inscripción en el formulario.
function prepararEdicion(inscripcion) {
  idEnEdicion = inscripcion.id;

  formulario.elements.namedItem("nombre").value = inscripcion.nombre;
  formulario.elements.namedItem("correo").value = inscripcion.correo;
  formulario.elements.namedItem("telefono").value = inscripcion.telefono;
  formulario.elements.namedItem("taller").value = inscripcion.taller;
  formulario.elements.namedItem("horario").value = inscripcion.horario;
  formulario.elements.namedItem("modalidad").value = inscripcion.modalidad;
  formulario.elements.namedItem("nivel_experiencia").value =
    inscripcion.nivel_experiencia;

  botonGuardar.textContent = "Guardar cambios";
  mensaje.textContent = "Puedes modificar los datos y guardar los cambios.";

  formulario.scrollIntoView({ behavior: "smooth" });
}

// Elimina una inscripción.
async function eliminarInscripcion(id) {
  const confirmar = confirm("¿Deseas eliminar esta inscripción?");

  if (!confirmar) {
    return;
  }

  try {
    const respuesta = await fetch(`/api/inscripciones/${id}`, {
      method: "DELETE"
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(resultado.mensaje || "No se pudo eliminar.");
    }

    if (idEnEdicion === id) {
      formulario.reset();
      idEnEdicion = null;
      botonGuardar.textContent = "Registrar inscripción";
    }

    mensaje.textContent = resultado.mensaje;

    await cargarInscripciones();
    await cargarReportes();
  } catch (error) {
    mensaje.textContent = error.message;
  }
}

// Guarda una inscripción nueva o actualiza una existente.
formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const datosFormulario = new FormData(formulario);

  const inscripcion = {
    nombre: datosFormulario.get("nombre"),
    correo: datosFormulario.get("correo"),
    telefono: datosFormulario.get("telefono"),
    taller: datosFormulario.get("taller"),
    horario: datosFormulario.get("horario"),
    modalidad: datosFormulario.get("modalidad"),
    nivel_experiencia: datosFormulario.get("nivel_experiencia")
  };

  const metodo = idEnEdicion === null ? "POST" : "PUT";

  const ruta = idEnEdicion === null
    ? "/api/inscripciones"
    : `/api/inscripciones/${idEnEdicion}`;

  try {
    const respuesta = await fetch(ruta, {
      method: metodo,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inscripcion)
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(resultado.mensaje || "No se pudo guardar.");
    }

    mensaje.textContent = resultado.mensaje;
    formulario.reset();
    idEnEdicion = null;
    botonGuardar.textContent = "Registrar inscripción";

    await cargarInscripciones();
    await cargarReportes();
  } catch (error) {
    mensaje.textContent = error.message;
  }
});

// Dibuja una lista con sus cantidades y barras.
function dibujarReporte(idLista, datos, nombreCampo) {
  const listaReporte = document.querySelector(idLista);
  listaReporte.textContent = "";

  if (datos.length === 0) {
    const elemento = document.createElement("li");
    elemento.textContent = "Todavía no hay datos para reportar.";
    listaReporte.appendChild(elemento);
    return;
  }

  const cantidadMayor = Math.max(
    ...datos.map((fila) => Number(fila.cantidad)),
    1
  );

  datos.forEach((fila) => {
    const elemento = document.createElement("li");

    const texto = document.createElement("p");
    texto.textContent = `${fila[nombreCampo]}: ${fila.cantidad}`;

    const fondo = document.createElement("div");
    fondo.className = "barra-fondo";

    const barra = document.createElement("div");
    barra.className = "barra";
    barra.style.width = `${(fila.cantidad / cantidadMayor) * 100}%`;

    fondo.appendChild(barra);
    elemento.append(texto, fondo);
    listaReporte.appendChild(elemento);
  });
}

// Consulta y muestra el resumen de reportes.
async function cargarReportes() {
  try {
    const respuesta = await fetch("/api/reportes/resumen");

    if (!respuesta.ok) {
      throw new Error("No se pudieron consultar los reportes.");
    }

    const datos = await respuesta.json();

    document.querySelector("#total-inscripciones").textContent = datos.total;

    dibujarReporte("#reporte-talleres", datos.porTaller, "taller");
    dibujarReporte("#reporte-horarios", datos.porHorario, "horario");
    dibujarReporte("#reporte-modalidades", datos.porModalidad, "modalidad");
  } catch (error) {
    mensaje.textContent = error.message;
  }
}

// Carga la lista y los reportes al abrir la página.
cargarInscripciones();
cargarReportes();