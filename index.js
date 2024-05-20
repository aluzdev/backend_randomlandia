//levantar la aplicación
//encargado de levantar la conexión con la base de datos
require("dotenv").config();
const server = require("./src/server");
const db = require("./src/lib/db");

const port = process.env.PORT || 3000;

db.connect()
  .then(() => {
    console.log("DB Connected");

    server.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("DB Error: ", error);
  });
