import { Router } from 'express';
import {ListaReproduccionController} from '../controllers/ListaReproduccionController';
const router = Router();

router.get('/',ListaReproduccionController.todasLasListas);
router.get('/:id',ListaReproduccionController.obtenerDescripcionPorId);
router.post('/',ListaReproduccionController.agregarLista);
export default router;