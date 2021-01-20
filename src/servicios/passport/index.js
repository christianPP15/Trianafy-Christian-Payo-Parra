import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Usuario, userRepository } from '../../modelos/Usuario';
import bcrypt from 'bcryptjs';

passport.use(new LocalStrategy({
    usernameField: "nombre_usuario",
    passwordField: "password",
    session: false
},async(username, password, done)=> {
    const user = await userRepository.findByUsername(username);
    if (user == undefined)
        return done(null, false); 
    else if (!bcrypt.compareSync(password, user.password))
        return done(null, false); 
    else
        return done(null, {
            id:user.id,
            nombre_completo:user.nombre_completo,
            nombre_usuario:user.nombre_usuario,
            email:user.email
        });

}));



const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET,
    algorithms : [process.env.JWT_ALGORITHM]
};

passport.use('token', new JwtStrategy(opts,async(jwt_payload, done)=>{
    const user_id = jwt_payload.sub;
    const user =await userRepository.findById(user_id);
    if (user == undefined)
        return done(null, false); 
    else
        return done(null, user);

}));

export const password = () =>(req, res, next) =>
     passport.authenticate('local', {session: false}, async(err, user, info) => {
        if (err)
            return res.status(400).json(err)
        else if (err || !user)
            return res.status(401).end()

        req.logIn(user, { session: false }, (err) => {
            if (err) return res.status(401).end()
            next()
        })
    })(req, res, next);


export const token = () =>  (req, res, next) =>
     passport.authenticate('token', { session: false },async(err, user, info) => {
    if (err ||  !user) {
        return res.status(401).end()
    }
     req.logIn(user, { session: false }, (err) => {
        if (err) return res.status(401).end()
        next()
    })
})(req, res, next);

export default passport;