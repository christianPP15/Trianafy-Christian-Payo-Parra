import mongoose from 'mongoose';
import { Usuario } from './Usuario';
import { Cancion } from './Cancion';
const { Schema } = mongoose;

const listaReproduccionSchema = new Schema({
    name: {
        type:String,
        required:"Es necesario un nombre para la playlist",
        maxlength:[60,"Nombre demasiado largo"]
    },
    descripcion: {
        type:String,
        maxlength:[250,"Descripción demasiada larga"]
    },
    usuario_id: {
        type: mongoose.ObjectId,
        ref: 'Usuario'
    },
    canciones: [{
        type: mongoose.ObjectId,
        ref: 'Cancion'
    }]
}, {
    versionKey: false
});

const ListaReproduccion = mongoose.model('ListaReproduccion', listaReproduccionSchema);
const ListaReproduccionRepository = {
    async findAll(idUsuario) {
        const result = await ListaReproduccion.find({usuario_id:idUsuario}).populate('canciones');
        return result;
    },
    findDescription(id,idUsuario) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const result = ListaReproduccion.findOne({_id:id,usuario_id:idUsuario});
            return result;
        } else {
            return null;
        }
    },
    async create(newList) {
        const thelist = new ListaReproduccion({
            name: newList.name,
            descripcion: newList.descripcion!= undefined ? newList.descripcion : "",
            usuario_id: newList.usuario_id
        });
        try{
            let result=await thelist.save();
            return result;
        }catch(err){
            console.log(err);
        }
        
    },
    async deleteList(id,idUsuario) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            return await ListaReproduccion.deleteOne({_id:id,usuario_id:idUsuario})
        } else {
            return null;
        }
    },
    async actualizarList(id, listaActualizada,idUsuario) {
        const listaEditada = await ListaReproduccion.findOne({_id:id,usuario_id:idUsuario});
        if (listaEditada != null) {
            if(listaActualizada.descripcion!=undefined)  listaEditada.descripcion=listaActualizada.descripcion;
            if(listaActualizada.name!=undefined)  listaEditada.name=listaActualizada.name ;
            return await listaEditada.save();
        } else {
            return undefined;
        }
    },
    async obtenerCanciones(id,idUsuario){
        if (mongoose.Types.ObjectId.isValid(id)) {
            const lista = await ListaReproduccion.findOne({_id:id,usuario_id:idUsuario}).populate('canciones');
            if(lista!=null){
                return lista.canciones
            }
        }
        return null;
    },
    async agregarCancionALista(idLista,idCancion,idUsuario){
        if (mongoose.Types.ObjectId.isValid(idLista) && mongoose.Types.ObjectId.isValid(idCancion)) {
            const lista=await ListaReproduccion.findOne({_id:idLista,usuario_id:idUsuario});
            const cancion=await Cancion.findById(idCancion);
            if(lista!=null && cancion!=null){
                lista.canciones.push(cancion);
                await lista.save();
                return lista;
            }
        }
        return null;
    },
    async obtenerCancionLista(idLista,idCancion,idUsuario){
        if(mongoose.Types.ObjectId.isValid(idLista) && mongoose.Types.ObjectId.isValid(idCancion)) {
            const lista = await ListaReproduccion.findOne({_id:idLista,usuario_id:idUsuario}).populate('canciones');
            if(lista!=null){
                return lista.canciones.filter(cancion => cancion._id == idCancion);;
            }
        }
        return null;
    },
    async eliminarCancionLista(idLista,idCancion,idUsuario){  
        if(mongoose.Types.ObjectId.isValid(idLista) && mongoose.Types.ObjectId.isValid(idCancion)) {
            let lista=await ListaReproduccion.findOne({_id:idLista,usuario_id:idUsuario}).populate('canciones');
            let cancion=await Cancion.findById(idCancion);
            if(lista!=null && cancion!=null){
                let indiceBorrar=undefined;
                //Voy ha hacer una especie de indexOf para obtener el indice de una canción en la lista de canciones de una playlist
                for(let i=0;i<lista.canciones.length;i++){
                    if(lista.canciones[i]._id=idCancion){
                        indiceBorrar=i;
                    }
                }
                lista.canciones.splice(indiceBorrar,1);
                await lista.save();
                return lista;
            }
        }
        return null;
    }
}

export {
    ListaReproduccion,
    ListaReproduccionRepository
}