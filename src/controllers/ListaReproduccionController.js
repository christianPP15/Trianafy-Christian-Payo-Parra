import { ListaReproduccion, ListaReproduccionRepository } from '../modelos/ListaReproduccion';
import mongoose from 'mongoose';
const ListaReproduccionController = {
    todasLasListas: async (req, res) => {
        const data = await ListaReproduccionRepository.findAll(req.user.id);
        if (Array.isArray(data) && data.length > 0)
            res.json(data);
        else
            res.sendStatus(404);
    },
    obtenerDescripcionPorId: async (req, res) => {
        const datos = await ListaReproduccionRepository.findDescription(req.params.id);
        if (datos != null) {
            res.send(datos.descripcion);
        } else {
            res.sendStatus(404);
        }
    },
    agregarLista: async (req, res) => {
        let listaNueva = await ListaReproduccionRepository.create({
            name: req.body.name,
            descripcion: req.body.descripcion,
            usuario_id: req.user.id
        });
        res.json(listaNueva);
    },
    eliminarListaReproduccion: async (req, res) => {
        let resul = await ListaReproduccionRepository.deleteList(req.params.id);
        console.log(resul);
        resul != null ? res.sendStatus(204) : res.sendStatus(404)
    },
    actualizarList: async (req, res) => {
        if (req.params.id != undefined && mongoose.Types.ObjectId.isValid(req.params.id)) {
            let listaModificada = await ListaReproduccionRepository.actualizarList(req.params.id, {
                name: req.body.name,
                descripcion: req.body.descripcion
            });
            if (listaModificada == undefined) {
                res.sendStatus(404);
            } else {
                res.sendStatus(204);
            }
        } else {
            res.sendStatus(409);
        }
    },
    obtenerCancionesDeUnaLista:async(req,res)=>{
        let canciones= await ListaReproduccionRepository.obtenerCanciones(req.params.id);
        canciones!=null ? res.json(canciones) : res.json([]);
    },
    agregarCancionAListaDeReproduccion:async(req,res)=>{
        let agregado=await ListaReproduccionRepository.agregarCancionALista(req.params.idLista,req.params.idCancion);
        agregado!=null ? res.json(agregado) : res.sendStatus(404);
    },
    obtenerCancionDeUnaLista:async(req,res)=>{
        let cancion=await ListaReproduccionRepository.obtenerCancionLista(req.params.idLista,req.params.idCancion);
        cancion!=null ? res.json(cancion) : res.sendStatus(404);
    },
    eliminarCancionDeUnaLista:async(req,res)=>{
        let resul=await ListaReproduccionRepository.eliminarCancionLista(req.params.idLista,req.params.idCancion);
        resul!=null ? res.sendStatus(204) : res.sendStatus(404);
    }

}

export {
    ListaReproduccionController
}