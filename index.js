const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");

const app = express();
const port = 3000;

const options = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(options));
routerApi(app);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hola mi server en express");
});

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto " + port);
});