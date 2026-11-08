const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Los registros se guardan mientras el servidor está activo.
const inscripciones = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Consultar todas las inscripciones.
app.get("/api/inscripciones", (req, res) => {
  res.json(inscripciones);
});

// Recibir una nueva inscripción.
app.post("/api/inscripciones", (req, res) => {
  const { nombre, correo, telefono, taller, horario } = req.body || {};

  // Comprobar que los cinco datos estén completos.
  const datos = [nombre, correo, telefono, taller, horario];

  if (datos.some(dato => typeof dato !== "string" || dato.trim() === "")) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios."
    });
  }

  // Comprobar el formato básico del correo.
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!correoValido.test(correo.trim())) {
    return res.status(400).json({
      mensaje: "Ingresa un correo electrónico válido."
    });
  }

  // Crear y guardar la inscripción.
  const nuevaInscripcion = {
    id: inscripciones.length + 1,
    nombre: nombre.trim(),
    correo: correo.trim(),
    telefono: telefono.trim(),
    taller: taller.trim(),
    horario: horario.trim()
  };

  inscripciones.push(nuevaInscripcion);

  res.status(201).json(nuevaInscripcion);
});

app.listen(PORT, () => {
  console.log(`Servidor disponible en http://localhost:${PORT}`);
});