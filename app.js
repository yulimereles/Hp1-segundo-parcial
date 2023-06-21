const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// El método config de dotenv permite leer variables de entorno desde un archivo .env
require('dotenv').config();

// Se importa la instancia de conexión a la base de datos - (debe ser después de leer las variables de entorno)
const { sequelize } = require('./db');

// Se ejecuta una instancia de conexión a la base de datos
sequelize
  .authenticate()
  .then(() => console.log('Conexión a base de datos exitosa'))
  .catch((error) => console.log('Error al conectar a base de datos', error));

// Si no existe el archivo .env, el valor por defecto del puerto será 6000
const port = process.env.PORT || 6000;

// Se inicializa express para poder usar sus métodos
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes/reserva.routes'));

// Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404
app.use((req, res, next) => {
  res.status(404).send('Error 404: Not Found');
});

// Starting the server
app.listen(port, () => console.log(`Server running on port ${port}`));
