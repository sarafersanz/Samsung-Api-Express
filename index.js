// Importar la dependencia express
const express = require("express");

// Creación de una nueva instancia de aplicación express
const app = express();

// Definición de la respuesta
app.get("/", (request, response) => {
  response.send("Hola Mundo con Express");
});

// Definir el puerto en el que escuchará la aplicación
const port = 3000;
// Iniciar el servicio de escucha
app.listen(port, () => {
  console.log("Escuchando en http://localhost:" + port);
});
