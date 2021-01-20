import { Router } from 'express';
import { body, param } from 'express-validator';
import { CancionesController } from '../controllers/CancionesController';
import { token } from '../servicios/passport';
import { validar } from '../middlewares/validacion';
const router = Router();
router.get('/',token(),CancionesController.todasLasCanciones);
router.post('/',[
    token(),
    body('titulo').exists().withMessage("Debe existir un campo titulo").notEmpty().withMessage("El campo título no puede estar vacío").isString().withMessage("Debe ser un string"),
    body('anio').exists().withMessage("Debe existir un campo anio").isInt().withMessage("Debe ser un número entero"),
    body('album').exists().withMessage("Debe existir un campo album"),
    body('nombre_artista').exists().withMessage("Debe existir un campo nombre_artista").notEmpty().withMessage("Este campo no puede estar vacío").isString().withMessage("El campo nombre_artista debe ser un string"),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],validar,CancionesController.agregarCancion);
router.get('/:id',token(),CancionesController.buscarPorId);
router.delete('/:id',token(),CancionesController.eliminarPorId);
router.put('/:id',[token(),body('id').not().exists().withMessage("No se puede modificar el id")],CancionesController.editarCancion);
export default router;