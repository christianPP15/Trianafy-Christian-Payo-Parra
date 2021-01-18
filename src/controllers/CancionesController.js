import { Cancion,CancionRepository} from '../modelos/Cancion';
import mongoose from 'mongoose';
const CancionesController={
    todasLasCanciones:async(req,res)=>{
        const data = await CancionRepository.findAll();
        res.json(data);
    },
    agregarCancion:async(req,res)=>{
        let cancionCreada= await CancionRepository.create({
            titulo:req.body.titulo,
            nombre_artista:req.body.nombre_artista,
            album:req.body.album,
            anio:req.body.anio
        });
        res.json(cancionCreada);
    },
    buscarPorId:async(req,res)=>{
        let song = await CancionRepository.findById(req.params.id);
            if (song != undefined) {
                res.json(song);
            } else {
                res.sendStatus(404);
            }
    },
    eliminarPorId:async(req,res)=>{
        let resul=await CancionRepository.deleteSong(req.params.id);
        resul !=undefined ? res.sendStatus(204) : res.sendStatus(404)
    },
    editarCancion:async(req,res)=>{
        if(req.params.id!=undefined && mongoose.Types.ObjectId.isValid(req.params.id)){
            let cancionModificada=await CancionRepository.editSong(req.params.id,{
                titulo:req.body.titulo,
                nombre_artista:req.body.nombre_artista,
                album:req.body.album,
                anio:req.body.anio
            });
            if(cancionModificada==undefined){
                res.sendStatus(404);
            }else{
                res.sendStatus(204);
            }
        }else{
            res.sendStatus(409);
        }
    }
}

export{
    CancionesController
}