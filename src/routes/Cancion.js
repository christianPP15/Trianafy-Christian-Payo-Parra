import { Router } from 'express';
import { body, param } from 'express-validator';
import { CancionesController } from '../controllers/CancionesController';
import { token } from '../servicios/passport';
import { validar } from '../middlewares/validacion';
const router = Router();
router.get('/',token(),CancionesController.todasLasCanciones);
router.post('/',[token(),
    body('id').not().exists()
    .withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')]
    ,validar,CancionesController.agregarCancion);
router.get('/:id',token(),CancionesController.buscarPorId);
router.delete('/:id',token(),CancionesController.eliminarPorId);
router.put('/:id',[token(),body('id')
        .not().exists()
        .withMessage("No se puede modificar el id")],CancionesController.editarCancion);
export default router;