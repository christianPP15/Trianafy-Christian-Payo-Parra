import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    nombre_completo:String,
    username:String,
    email:String,
    password:String
},{
    versionKey: false 
});
const Usuario=mongoose.model('Usuario',userSchema);

const usernameExists = async(username) => {
    let users=await Usuario.find({}).exec();
    let usernames = users.map(user => user.username);
    return usernames.includes(username);
}
const emailExists = async(email) => {
    let users=await Usuario.find({}).exec();
    let emails = users.map(user => user.email);
    return emails.includes(email);
}
const userRepository = {
    async findByEmail(email) {
       let users =await Usuario.find({}).exec();
       let result =users.filter(user => user.username == email);
       return Array.isArray(result) && result.length > 0 ? result[0] : undefined;   
    },
    async findByUsername(username) {
        let users=await Usuario.find({}).exec();
        let result = users.filter(user => user.username == username);
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;   
     },
    async create(newUser){
        const theUser=new Usuario({
            nombre_completo:newUser.nombre_completo,
            username:newUser.username,
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