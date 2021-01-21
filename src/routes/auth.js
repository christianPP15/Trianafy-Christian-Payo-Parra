import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/AuthController';
import { validar } from '../middlewares/validacion';
import { password } from '../servicios/passport';


const router = Router();
router.post('/register', [
    body('nombre_usuario')
        .isLength({min: 5})
        .withMessage('La longitud mínima del nombre de usuario son 5 caracteres'),
    body('password').isLength({min: 4}).withMessage('La contraseña debe tener como mínimoo 8 caracteres'),
    body('email')
        .isEmail()
        .withMessage('El campo email debe ser un email válido'),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],
validar, 
AuthController.register);


router.post('/login',
    password(),
    AuthController.login
    );


export default router;