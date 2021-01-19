import { Router } from 'express';
import {ListaReproduccionController} from '../controllers/ListaReproduccionController';
import { token } from '../servicios/passport';
const router = Router();

router.get('/',token(),ListaReproduccionController.todasLasListas);
router.get('/:id',token(),ListaReproduccionController.obtenerDescripcionPorId);
router.post('/',token(),ListaReproduccionController.agregarLista);
router.delete('/:id',token(),ListaReproduccionController.eliminarListaReproduccion);
router.put('/:id',token(),ListaReproduccionController.actualizarList);
router.get('/:id/songs',token(),ListaReproduccionController.obtenerCancionesDeUnaLista);
router.post('/:idLista/songs/:idCancion',token(),ListaReproduccionController.agregarCancionAListaDeReproduccion);
router.get('/:idLista/songs/:idCancion',token(),ListaReproduccionController.obtenerCancionDeUnaLista);
router.delete('/:idLista/songs/:idCancion',token(),ListaReproduccionController.eliminarCancionDeUnaLista);
export default router;