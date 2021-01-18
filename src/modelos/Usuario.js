import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    titulo:String,
    nombre_completo:String,
    nombre_usuario:String,
    email:String,
    password:String
},{
    versionKey: false 
});
const Usuario=mongoose.model('Usuario',userSchema);



export{
    Usuario
}