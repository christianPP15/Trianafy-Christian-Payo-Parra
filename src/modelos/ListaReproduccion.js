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
    },
    async findDescription(id){
        if(mongoose.Types.ObjectId.isValid(id)){
            const result=await ListaReproduccion.findById(id).exec()
            return result;
        }else{
            return null;
        }   
    },
    async create(newList){
        const thelist=new ListaReproduccion({
            name:newList.name,
            descripcion:newList.descripcion,
            //usuario_id:newList.usuario_id
        });
        const result=await thelist.save();
        return result;
    }
}
export{
    ListaReproduccion,
    ListaReproduccionRepository
}