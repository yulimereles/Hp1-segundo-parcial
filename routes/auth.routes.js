const router = require('express').Router();
const {
    obtenerReserva,
    obtenerReserva,
    crearReserva,
    actualizarReserva,
    eliminarReserva
} = require('../controllers/reserva.controllers');
const { validarJWT } = require('../middlewares/validar_jwt');



router.get('/reserva', (req, res) => {
    res.render('reserva/index');
});

router.get('/reserva/editar/:id', (req, res) => {

    const tareaId = req.params.id;
    res.render('reserva/editar_reserva', { id: reservaId });
});

router.get('/reserva/crear', (req, res) => {
    res.render('reserva/crear_reserva');
});


router.get('/api/reserva', [validarJWT],  obtenerReserva);

router.get('/api/reserva/:id', obtenerReserva);

router.post('/api/reserva', [validarJWT], crearReserva);

router.put('/api/reserva/:id', actualizarReserva);

router.delete('/api/raserva/:id', eliminarReserva);


module.exports = router;