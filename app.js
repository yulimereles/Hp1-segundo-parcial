const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// El método config de dotenv permite leer variables de entorno desde un archivo .env
require('dotenv').config();

// Se importa la instancia de conexión a la base de datos - (debe ser después de leer las variables de entorno)
const { sequelize } = require('./db');

// Se ejecuta una instancia de conexión a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión a base de datos exitosa'))
    .catch((error) => console.log('Error al conectar a base de datos', error));

require('ejs');

// Si no existe el archivo .env, el valor por defecto del puerto será 6000
const port = process.env.PORT || 6000;

// Se inicializa express para poder usar sus métodos
const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Archivos estáticos utilizando la librería path que viene en NodeJS
app.use(express.static(path.join(__dirname, 'public')));

// Alternativa a la línea anterior
// app.use(express.static(__dirname + '/public'));

// Configuración de motor de plantillas EJS
app.set('view engine', 'ejs');

// Configuración de rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/reserva.routes'));
app.use(require('./routes/usuario.routes'));
app.use(require('./routes/auth.routes'));

// 404 - Not found
app.use((req, res, next) => {
    res.write(`<div>
        <h1>404 - Ruta no encontrada</h1>
        <hr>
        <p>La pagina que intentas buscar no existe</p>
        <p>Redireccionando a la página de inicio...</p>
        <script>
        (
          () => setTimeout(() => {
            window.location.href='http://localhost:${port}/tareas';
           }, 3000)           
        )();
        </script>
    </h1>`)
});


// Servidor en escucha de peticiones
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));