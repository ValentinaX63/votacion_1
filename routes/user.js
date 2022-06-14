
const {Router} = require('express');
const {check } = require('express-validator');

const {validarCampos} = require('../middlewares/validarCampos');
const { esRoleValido, emailExiste , existeUserID} = require('../helpers/dbValidators');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/user');


const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id','No es una ID Valido').isMongoId(),
    check('id').custom(existeUserID),
    check('rol').custom(esRoleValido),
    validarCampos
] ,usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligarorio').not().isEmail(),
    check('password', 'El password debe ser más de 6 letras').isLength({ min: 6}),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    check('id','No es una ID Valido').isMongoId(),
    check('id').custom(existeUserID),
    check('id').custom(existeUserID),
    validarCampos
] ,usuariosDelete);
 
 module.exports = router;