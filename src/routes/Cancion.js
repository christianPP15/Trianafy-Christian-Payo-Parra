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
    body('nombre_artista').exists().withMessage("Debe existir un campo nombre_artista").notEmpty().withMessage("Este campo no puede estar vacío"),
    body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')
],validar,CancionesController.agregarCancion);
router.get('/:id',token(),CancionesController.buscarPorId);
router.delete('/:id',[token(),param('id').isMongoId().withMessage("No es un id válido")],CancionesController.eliminarPorId);
router.put('/:id',[token(),
param('id').isMongoId().withMessage("No es un id válido")],CancionesController.editarCancion);
export default router;