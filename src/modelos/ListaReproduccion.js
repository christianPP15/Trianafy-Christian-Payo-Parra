import mongoose from 'mongoose';
import { Usuario } from './Usuario';
import { Cancion } from './Cancion';
const { Schema } = mongoose;

const listaReproduccionSchema = new Schema({
    name: String,
    descripcion: String,
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
    async findAll() {
        const result = await ListaReproduccion.find({}).exec();
        return result;
    },
    async findDescription(id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            const result = await ListaReproduccion.findById(id).exec()
            return result;
        } else {
            return null;
        }
    },
    async create(newList) {
        const thelist = new ListaReproduccion({
            name: newList.name,
            descripcion: newList.descripcion,
            usuario_id: newList.usuario_id
        });
        const result = await thelist.save();
        return result;
    },
    async deleteList(id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            return await ListaReproduccion.findByIdAndRemove(id).exec();
        } else {
            return null;
        }
    },
    async actualizarList(id, listaActualizada) {
        const listaEditada = await ListaReproduccion.findById(id);
        if (listaEditada != null) {
            return await Object.assign(listaEditada, listaActualizada).save();
        } else {
            return undefined;
        }
    },
    async obtenerCanciones(id){
        if (mongoose.Types.ObjectId.isValid(id)) {
            const lista = await ListaReproduccion.findById(id);
            return lista!=null ?lista.canciones : lista;
        }else{
            return null;
        }
    },
    async agregarCancionALista(idLista,idCancion){
        if (mongoose.Types.ObjectId.isValid(idLista) && mongoose.Types.ObjectId.isValid(idCancion)) {
            const lista=await ListaReproduccion.findById(idLista);
            const cancion=await Cancion.findById(idCancion);
            if(lista!=null && cancion!=null){
                lista.canciones.push(cancion);
                await lista.save();
                return lista
            }else{
                return null;
            }
        }else{
            return null;
        }
    }
}
export {
    ListaReproduccion,
    ListaReproduccionRepository
}