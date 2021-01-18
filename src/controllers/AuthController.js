import 'dotenv/config';
import { Usuario, userRepository } from '../modelos/Usuario';
import bcrypt from 'bcryptjs';
import { JwtService } from '../servicios/jwt';



const AuthController = {

    register: async(req, res, next) => {
        let usuarioCreado = await userRepository.create({
                        nombre_completo:req.body.nombre_completo,
                        nombre_usuario:req.body.nombre_usuario,
                        email:req.body.email, 
                        password:bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))
        });          
        res.status(201).json({
            id: usuarioCreado.id,
            username: usuarioCreado.nombre_completo,
            email: usuarioCreado.email
        });
    },
    login: (req, res, next) => {
        // Dado que la mitad del esfuerzo lo hace la función password del servicio passport
        // Aquí tan solo tenemos que preocuparnos de generar y devolver el token
        const token = JwtService.sign(req.user);
        res.status(201).json({
            user: req.user,
            token: token
        });
    }


}

export {
    AuthController
}