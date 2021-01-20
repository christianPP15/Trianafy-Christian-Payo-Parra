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
    let users=await Usuario.findOne({nombre_usuario:username});
    
    return users==null ? false : true;
}
const emailExists = async(email) => {
    let users=await Usuario.findOne({email:email});
    return users==null ? false : true;
}
const userRepository = {
    async findByEmail(email) {
        let users=await Usuario.findOne({email:email});
       return users==null ? undefined : users;   
    },
    async findByUsername(username) {
        let users=await Usuario.findOne({nombre_usuario:username});
        return users==null ? undefined : users;     
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