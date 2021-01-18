import 'dotenv/config';
import { Usuario, userRepository } from '../modelos/Usuario';
import bcrypt from 'bcryptjs';
import { JwtService } from '../servicios/jwt';



const AuthController = {

    register: async(req, res, next) => {
        let usuarioCreado =await userRepository.create({nombre_completo:req.body.nombre_completo,nombre_usuario:req.body.nombre_usuario, email:req.body.email, 
                        password:bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))});
                  
        res.status(201).json({
            id: usuarioCreado.id,
            nombre_usuario: usuarioCreado.nombre_usuario,
            email: usuarioCreado.email
        });
    },
    login: async(req, res, next) => {
        
        const token = await JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token
        });
    }


}

export {
    AuthController
}