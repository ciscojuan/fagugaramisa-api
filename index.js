const express = require('express');
const routerApi = require('./routes');

//cargar express
const app = express();
//definir puerto
const port = 3000;

app.use(express.json());
//ruta de prueba
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});
//rutas
routerApi(app);


app.listen(port, () => {
  console.log('Api correiendo en el puerto: ' +  port);
});