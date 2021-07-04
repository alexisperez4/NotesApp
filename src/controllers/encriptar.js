//modulo para encriptar contraseñas
const bcrypt = require('bcryptjs');
const db = require('../database/database');

encriptarCtrl = {};

//funcion que genera el encriptado de la contraseña
encriptarCtrl.encryPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt) 
};

//funcion que compara la contraseña con la db 
encriptarCtrl.matchPassword = async function(password, id){    
    console.log('comparando contraseña con bcrypt')
    console.log('el id del usuario es: ' + id);
    const usuario_ =  await db.query('SELECT * FROM usuario WHERE id = $1', [id]);
    const usuario = usuario_.rows[0];
    console.log(usuario)
    return await bcrypt.compare(password, usuario.contrasena)
};


module.exports = encriptarCtrl;