//levantar la aplicación
//encargado de levantar la conexión con la base de datos
const server = require("./src/server");

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
