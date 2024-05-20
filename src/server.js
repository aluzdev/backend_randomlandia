// definicion del servidor
//aquí importamos express y ponemos qué rutas existen.
const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.json({
    message: "Randomlandia API - Abandon all hope ye who enter here",
    success: true,
  });
});

module.exports = server;
