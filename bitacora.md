# Bitácora de repaso de Desarrollo Web

Completa una ficha por tema con tus palabras. No copies párrafos de los sitios consultados.

☑️ Ejercicio 1 
1. ¿Qué presenta los campos? HTML.
2. ¿Qué evita que el navegador recargue la página? JavaScript, con preventDefault().
3. ¿Qué componente recibe el JSON? Express, en el servidor.
4. ¿Qué parte puede guardar el registro? La base de datos. En este proyecto se guarda temporalmente en memoria.



☑️ Bitacoras 
<header>: contiene el encabezado de una página o sección.

<main>: agrupa el contenido principal de la página.

type="email": para ingresar un correo electrónico.

type="tel": para ingresar un número de teléfono.

.panel: selecciona los recuadros que usan esa clase. Cambié el color del borde, aumenté el espacio interno con padding y el espacio exterior con margin.

button:hover {background: #06656b;}:Esta regla cambia el color de fondo del botón cuando colocamos el cursor sobre él.

justify-content: acomoda los elementos en el eje principal, por ejemplo, de izquierda a derecha.

align-items: alinea los elementos en el eje transversal, por ejemplo, de arriba hacia abajo.

Flexbox — justify-content: acomoda los elementos a lo largo del eje principal.

Media query — @media (max-width: 640px): en tu proyecto reduce los espacios de los recuadros cuando la pantalla es angosta.

const: para un valor que no cambiará, como el máximo de cupos: const cuposMaximos = 20;.

let: para un valor que puede cambiar, como la cantidad de inscritos: let inscritos = 0;.
Ruta: dirección que el servidor utiliza para recibir y responder solicitudes.
GET /api/inscripciones: consulta las inscripciones.
POST /api/inscripciones: envía los datos para crear una inscripción.
HTTP 200: la solicitud se realizó correctamente.
HTTP 201: se creó un registro correctamente.
HTTP 400: los datos enviados son incorrectos o están incompletos

JSON.stringify() convierte un objeto de JavaScript en texto JSON para enviarlo.
response.json() lee la respuesta del servidor y convierte su JSON en un dato que JavaScript puede usar.
Estado 201: indica que la solicitud se realizó correctamente y se creó un nuevo registro.
DDL: instrucciones que crean o modifican la estructura de la base de datos. Ejemplo: CREATE TABLE.
DML: instrucciones que modifican los datos. Ejemplos: INSERT, UPDATE y DELETE.

git add: selecciona los cambios que quiero incluir.
git commit: guarda esos cambios en el historial local del proyecto.
git push: envía los commits al repositorio remoto, por ejemplo, a GitHub.


☑️ Reto de lectura

Cambia inscritos a 20. Antes de ejecutar, responde: ¿se ejecutará inscritos++? ¿Qué devuelve hayCupo()?
¿Se ejecutará inscritos++? No, porque ya no hay cupo.
¿Qué devuelve hayCupo()? false, porque 20 no es menor que 20.

☑️
Se agregaron los campos de teléfono y horario al formulario.
El formulario utiliza JavaScript para escuchar el envío de datos.
El diseño del formulario se adapta a pantallas pequeñas.


## HTML
- Resumen propio (2–3 frases):
- Dos términos clave y su explicación:
- Ejemplo de código explicado:
- Pregunta que podría aparecer en el examen:

## CSS
- Resumen propio (2–3 frases):
- Dos términos clave y su explicación:
- Ejemplo de código explicado:
- Pregunta que podría aparecer en el examen:

## JavaScript y DOM
- Resumen propio (2–3 frases):
- Dos términos clave y su explicación:
- Ejemplo de código explicado:
- Pregunta que podría aparecer en el examen:

## Node.js, Express y API
- Resumen propio (2–3 frases):
- Dos términos clave y su explicación:
- Ejemplo de ruta o solicitud explicado:
- Pregunta que podría aparecer en el examen:

## SQL
- Resumen propio (2–3 frases):
- Explica SELECT, INSERT, UPDATE y DELETE:
- ¿Qué son una clave primaria y una clave foránea?
- Pregunta que podría aparecer en el examen:

## Git y GitHub
- Resumen propio (2–3 frases):
- Explica add, commit y push:
- Diferencia entre Git y GitHub:
- Pregunta que podría aparecer en el examen:
