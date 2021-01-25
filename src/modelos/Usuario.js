import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    nombre_completo:{
        type:String,
        required:"Especifique su nombre y apellidos"
    },
    nombre_usuario: {
        unique: true,
        type: String,
        required: "Especifique un nombre de usuario"
    },
    email: {
        unique: true,
        type: String,
        required: "Especifique un email válido"
    },
    password: {
        type: String,
        required: "Especifique una contraseña"
    }
}, {
    versionKey: false
});
const Usuario = mongoose.model('Usuario', userSchema);


const userRepository = {
    async findByEmail(email) {
        let users = await Usuario.findOne({ email: email }).exec();
        return users == null ? undefined : users;
    },
    async findByUsername(username) {
        let users = await Usuario.findOne({ nombre_usuario: username }).exec();
        return users == null ? undefined : users;
    },
    async create(newUser) {
        const theUser = new Usuario({
            nombre_completo: newUser.nombre_completo,
            nombre_usuario: newUser.nombre_usuario,
            email: newUser.email,
            password: newUser.password
        });
        
            const result = await theUser.save();
            return {
                id: result.id,
                nombre_completo: result.nombre_completo,
                nombre_usuario: result.nombre_usuario,
                email: result.email,
            };
        
    },
    async findById(id) {
        const result = await Usuario.findById(id).exec();
        return result == null ? undefined : result;
    }

}

export {
    Usuario,
    userRepository
}