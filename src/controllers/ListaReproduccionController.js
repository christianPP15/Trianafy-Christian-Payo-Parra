import { ListaReproduccion, ListaReproduccionRepository } from '../modelos/ListaReproduccion';

const ListaReproduccionController={
    todasLasListas:async(req,res)=>{
        const data = await ListaReproduccionRepository.findAll();
        if (Array.isArray(data) && data.length > 0) 
            res.json(data);
        else
            res.sendStatus(404);
    }
}

export{
    ListaReproduccionController
}