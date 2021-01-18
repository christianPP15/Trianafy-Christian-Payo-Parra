import { ListaReproduccion, ListaReproduccionRepository } from '../modelos/ListaReproduccion';

const ListaReproduccionController={
    todasLasListas:async(req,res)=>{
        const data = await ListaReproduccionRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    },
    obtenerDescripcionPorId:async(req,res)=>{
        const datos=await ListaReproduccionRepository.findDescription(req.params.id);
        if(datos!=null){
            res.send(datos.descripcion);
        }else{
            res.sendStatus(404);
        }
    },
    agregarLista:async(req,res)=>{
        let listaNueva=await ListaReproduccionRepository.create({
            name:req.body.name,
            descripcion:req.body.descripcion,
            //usuario_id:req.body.id
        });
        res.json(listaNueva);
    }
}

export{
    ListaReproduccionController
}