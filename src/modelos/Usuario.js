import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    nombre_completo:String,
    nombre_usuario:String,
    email:String,
    password:String
},{
    versionKey: false 
});
const Usuario=mongoose.model('Usuario',userSchema);

const usernameExists = async(username) => {
    let users=await Usuario.find({nombre_usuario:username});
    return Object.keys(users).length === 0 ? false : true;
}
const emailExists = async(email) => {
    let users=await Usuario.find({email:email});
    return Object.keys(users).length === 0 ? false : true;
}
const userRepository = {
    async findByEmail(email) {
        let users=await Usuario.find({email:email});
       return Object.keys(users).length === 0 ? undefined : users;   
    },
    async findByUsername(username) {
        let users=await Usuario.find({nombre_usuario:username});
        return Object.keys(users).length === 0 ? undefined : users;     
     },
    async create(newUser){
        const theUser=new Usuario({
            nombre_completo:newUser.nombre_completo,
            nombre_usuario:newUser.nombre_usuario,
            email:newUser.email,
            password:newUser.password
        });
        const result=await theUser.save();
        return result;
    },
    async findById(id){
        const result=await Usuario.findById(id);
        return result == null ? undefined : result;
    }
   
} 

export{
    Usuario,
    userRepository,
    emailExists,
    usernameExists
}