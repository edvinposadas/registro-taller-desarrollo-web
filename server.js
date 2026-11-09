const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Consulta todas las inscripciones.
app.get("/api/inscripciones", (req, res) => {
  const registros = db.prepare(
    "SELECT * FROM inscripciones ORDER BY id DESC"
  ).all();

  res.json(registros);
});

// Prepara y limpia los datos recibidos.
function prepararDatos(cuerpo) {
  const limpiar = (valor) =>
    typeof valor === "string" ? valor.trim() : "";

  return {
    nombre: limpiar(cuerpo.nombre),
    correo: limpiar(cuerpo.correo),
    telefono: limpiar(cuerpo.telefono),
    taller: limpiar(cuerpo.taller),
    horario: limpiar(cuerpo.horario),
    modalidad: limpiar(cuerpo.modalidad),
    nivel_experiencia: limpiar(cuerpo.nivel_experiencia)
  };
}

// Valida los datos al guardar o actualizar.
function validarDatos(datos) {
  if (Object.values(datos).some(valor => valor === "")) {
    return "Todos los campos son obligatorios.";
  }

  if (datos.nombre.length < 2 || datos.nombre.length > 100) {
    return "El nombre debe tener entre 2 y 100 caracteres.";
  }

  // Permite letras, espacios, puntos, apóstrofes y guiones.
  if (
    !/^[\p{L}\p{M} .'-]+$/u.test(datos.nombre) ||
    !/\p{L}/u.test(datos.nombre)
  ) {
    return "El nombre debe contener letras y no puede llevar números.";
  }

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (datos.correo.length > 254 || !correoValido.test(datos.correo)) {
    return "Ingresa un correo electrónico válido.";
  }

  if (!/^[0-9]{7,15}$/.test(datos.telefono)) {
    return "El teléfono debe contener entre 7 y 15 números.";
  }

  const talleres = [
    "HTML y CSS",
    "JavaScript",
    "Node.js y Express"
  ];

  const horarios = ["Mañana", "Tarde"];

  const modalidades = ["Presencial", "Virtual"];

  const niveles = ["Inicial", "Intermedio", "Avanzado"];

  if (!talleres.includes(datos.taller)) {
    return "Selecciona un taller válido.";
  }

  if (!horarios.includes(datos.horario)) {
    return "Selecciona un horario válido.";
  }

  if (!modalidades.includes(datos.modalidad)) {
    return "Selecciona una modalidad válida.";
  }

  if (!niveles.includes(datos.nivel_experiencia)) {
    return "Selecciona un nivel de experiencia válido.";
  }

  return null;
}

// Guarda una nueva inscripción.
app.post("/api/inscripciones", (req, res) => {
  const datos = prepararDatos(req.body || {});
  const errorValidacion = validarDatos(datos);

  if (errorValidacion) {
    return res.status(400).json({
      mensaje: errorValidacion
    });
  }

  try {
    const resultado = db.prepare(`
      INSERT INTO inscripciones (
        nombre,
        correo,
        telefono,
        taller,
        horario,
        modalidad,
        nivel_experiencia
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      datos.nombre,
      datos.correo,
      datos.telefono,
      datos.taller,
      datos.horario,
      datos.modalidad,
      datos.nivel_experiencia
    );

    res.status(201).json({
      mensaje: "Inscripción guardada correctamente.",
      id: Number(resultado.lastInsertRowid)
    });
  } catch (error) {
    console.error("Error al guardar:", error);

    res.status(500).json({
      mensaje: "No se pudo guardar la inscripción."
    });
  }
});

// Actualiza una inscripción existente.
app.put("/api/inscripciones/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      mensaje: "El identificador no es válido."
    });
  }

  const datos = prepararDatos(req.body || {});
  const errorValidacion = validarDatos(datos);

  if (errorValidacion) {
    return res.status(400).json({
      mensaje: errorValidacion
    });
  }

  try {
    const resultado = db.prepare(`
      UPDATE inscripciones
      SET nombre = ?,
          correo = ?,
          telefono = ?,
          taller = ?,
          horario = ?,
          modalidad = ?,
          nivel_experiencia = ?
      WHERE id = ?
    `).run(
      datos.nombre,
      datos.correo,
      datos.telefono,
      datos.taller,
      datos.horario,
      datos.modalidad,
      datos.nivel_experiencia,
      id
    );

    if (resultado.changes === 0) {
      return res.status(404).json({
        mensaje: "No se encontró la inscripción."
      });
    }

    res.json({
      mensaje: "Inscripción actualizada correctamente."
    });
  } catch (error) {
    console.error("Error al actualizar:", error);

    res.status(500).json({
      mensaje: "No se pudo actualizar la inscripción."
    });
  }
});

// Elimina una inscripción.
app.delete("/api/inscripciones/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      mensaje: "El identificador no es válido."
    });
  }

  try {
    const resultado = db.prepare(
      "DELETE FROM inscripciones WHERE id = ?"
    ).run(id);

    if (resultado.changes === 0) {
      return res.status(404).json({
        mensaje: "No se encontró la inscripción."
    });
    }

    res.json({
      mensaje: "Inscripción eliminada correctamente."
    });
  } catch (error) {
    console.error("Error al eliminar:", error);

    res.status(500).json({
      mensaje: "No se pudo eliminar la inscripción."
    });
  }
});

// Consulta los datos para los reportes.
app.get("/api/reportes/resumen", (req, res) => {
  try {
    const total = db.prepare(
      "SELECT COUNT(*) AS total FROM inscripciones"
    ).get().total;

    const porTaller = db.prepare(`
      SELECT taller, COUNT(*) AS cantidad
      FROM inscripciones
      GROUP BY taller
      ORDER BY taller
    `).all();

    const porHorario = db.prepare(`
      SELECT horario, COUNT(*) AS cantidad
      FROM inscripciones
      GROUP BY horario
      ORDER BY horario
    `).all();

    const porModalidad = db.prepare(`
      SELECT modalidad, COUNT(*) AS cantidad
      FROM inscripciones
      GROUP BY modalidad
      ORDER BY modalidad
    `).all();

    res.json({
      total,
      porTaller,
      porHorario,
      porModalidad
    });
  } catch (error) {
    console.error("Error al consultar reportes:", error);

    res.status(500).json({
      mensaje: "No se pudieron consultar los reportes."
    });
  }
});

// Inicia el servidor.
app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});