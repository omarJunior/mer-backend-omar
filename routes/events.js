const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/event');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.use( validarJWT ); //Todos los metodos tengan un middlewar json web token por defecto

router.get('/', getEvents);

//Crear un nuevo evento
router.post('/', 
    [ 
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
createEvent);


//Actualizar evento
router.put('/:id', updateEvent);


//Borrar evento
router.delete('/:id', deleteEvent);


module.exports = router;