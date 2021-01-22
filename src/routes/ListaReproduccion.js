import { Router } from 'express';
import { body } from 'express-validator';
import {ListaReproduccionController} from '../controllers/ListaReproduccionController';
import { token } from '../servicios/passport';
import { validar } from '../middlewares/validacion';
const router = Router();

router.get('/',token(),ListaReproduccionController.todasLasListas);
router.get('/:id',token(),ListaReproduccionController.obtenerDescripcionPorId);
router.post('/',[token(),body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')],validar,ListaReproduccionController.agregarLista);
router.delete('/:id',token(),ListaReproduccionController.eliminarListaReproduccion);
router.put('/:id',[token(),body('id').not().exists().withMessage('No es necesario que proporcione un ID; este se asignará automáticamente')],validar,ListaReproduccionController.actualizarList);
router.get('/:id/songs',token(),ListaReproduccionController.obtenerCancionesDeUnaLista);
router.post('/:idLista/songs/:idCancion',token(),ListaReproduccionController.agregarCancionAListaDeReproduccion);
router.get('/:idLista/songs/:idCancion',token(),ListaReproduccionController.obtenerCancionDeUnaLista);
router.delete('/:idLista/songs/:idCancion',token(),ListaReproduccionController.eliminarCancionDeUnaLista);
export default router;