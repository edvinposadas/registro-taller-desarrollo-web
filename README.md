# Registro de participantes para un taller

Aplicación web para registrar participantes en talleres de desarrollo web.

## Tecnologías

- HTML y CSS para la página.
- JavaScript para las funciones del navegador.
- Node.js y Express para el servidor y la API.
- SQLite para guardar las inscripciones.

## Funciones

- Registrar, consultar, editar y eliminar inscripciones.
- Validar los campos en el navegador y en el servidor.
- Guardar los registros en SQLite.
- Mostrar reportes por taller, horario y modalidad.
- Adaptar la página a computadoras y teléfonos.

## Requisitos

- Node.js versión 22.13 o posterior.
- npm.

## Cómo ejecutar

1. Abre una terminal en la carpeta del proyecto.
2. Instala las dependencias:

   npm install

3. Inicia el servidor:

   npm start

4. Abre http://localhost:3000 en el navegador.

La base de datos `registro_taller.db` se crea automáticamente
al iniciar el servidor.

## Rutas de la API

- GET /api/inscripciones: consulta las inscripciones.
- POST /api/inscripciones: registra una inscripción.
- PUT /api/inscripciones/:id: actualiza una inscripción.
- DELETE /api/inscripciones/:id: elimina una inscripción.
- GET /api/reportes/resumen: consulta los datos de los reportes.

## Pruebas

1. Registra un participante con datos inventados.
2. Comprueba que aparezca en la lista y en los reportes.
3. Edita una inscripción y verifica el cambio.
4. Elimina una inscripción de prueba.
5. Reinicia el servidor y comprueba que los datos permanezcan.
6. Revisa la página en pantalla ancha y angosta.

## Autor

Edvin Estuardo Posadas Mejia

Clase: Desarrollo web