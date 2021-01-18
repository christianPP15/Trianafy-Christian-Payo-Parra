import { Router } from 'express';
import { CancionesController } from '../controllers/CancionesController';
const router = Router();
router.get('/',CancionesController.todasLasCanciones);
router.post('/',CancionesController.agregarCancion);
router.get('/:id',CancionesController.buscarPorId);
router.delete('/:id',CancionesController.eliminarPorId);
router.put('/:id',CancionesController.editarCancion);
export default router;