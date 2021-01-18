import { Router } from 'express';
import {ListaReproduccionController} from '../controllers/ListaReproduccionController';
const router = Router();

router.get('/',ListaReproduccionController.todasLasListas);


export default router;