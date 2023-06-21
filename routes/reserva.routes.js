// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

const router = require('express').Router();
const {
    obtenerReserva,
    crearReserva,
    actualizarReserva,
    eliminarReserva
} = require('../controllers/reserva.controllers');
const { validarJWT } = require('../middlewares/validar_jwt');


// ==========================================
// Rutas para renderizar las vistas de tareas
// ==========================================
router.get('/reserva', (req, res) => {
    res.render(' reserva/index');
});

router.get('/reserva/editar/:id', (req, res) => {

    const reservaId = req.params.id;
    res.render('reserva/editar_reserva', { id: reservaId });
});

router.get('/reserva/crear', (req, res) => {
    res.render('reserva/crear_reserva');
});

// ==========================================
//         Rutas para CRUD de tareas
// ==========================================


router.get('/api/reserva', [validarJWT],  obtenerReservas);

router.get('/api/reserva/:id', obtenerReserva);

router.post('/api/reserva', [validarJWT], crearReserva);

router.put('/api/reserva/:id', actualizarReserva);

router.delete('/api/reserva/:id', eliminarReserva);


module.exports = router;
 
 module.exports = router;