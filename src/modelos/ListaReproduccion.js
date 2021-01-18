import mongoose from 'mongoose';
import {Usuario} from './Usuario';
import {Cancion} from './Cancion';
const { Schema } = mongoose;

const listaReproduccionSchema = new Schema({
    name:String,
    descripcion:String,
    usuario_id:{
        type:mongoose.ObjectId,
        ref:'Usuario'
    },
    canciones:[{
        type:mongoose.ObjectId,
        ref:'Cancion'
    }]
},{
    versionKey: false 
});

const ListaReproduccion=mongoose.model('ListaReproduccion',listaReproduccionSchema);
const ListaReproduccionRepository={
    async findAll(){
        const result=await ListaReproduccion.find({}).exec();
        return result;
    }
}
export{
    ListaReproduccion,
    ListaReproduccionRepository
}