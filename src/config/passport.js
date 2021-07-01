const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const db = require('../database/database');
const { encryPassword, matchPassword } = require('../controllers/encriptar');

passport.use(
    //estategia para autenticar
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        }, 
        async (email, password, done) => {
            //confirmar si existe el email del usuario
            const usuario = await (await (db.query('SELECT * FROM usuario WHERE email = $1', [email]))).rows[0];
            const validar_email = usuario.email;
            console.log('Email de la DB: ' + validar_email)
            if (!validar_email) {
                console.log('Este Email: '+email+' no existe en la BD');
                return done(null, false, { message: 'Not User Found' });
            } else {
                //matchPassword devuelve true si conicide la contraseña con la DB
                const validar_password = await matchPassword(password);
                if (validar_password) {
                    return done(null, usuario)
                } else {
                    return done(null, false, {message:'Incorrect Password'})
                }
            }
        }
    )
);

//metodo que recibe una funcion y esta funcion recibe un usuario y done(funcion callback para terminar)  
//la funcion done recibe un error y un usuario
passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

//mientras navega el usuario permite verificar si el id tiene los permisos o existe
passport.deserializeUser(async(id, done) => {
    var usuario_;
    var error;
    try{
        //verifica si el id existe en la base de datos
        usuario_ = await (await (db.query('SELECT * FROM usuario WHERE id = $1', [id]))).rows[0];
    }catch(e){
        error = e;
    }
    done(error, usuario_);

})