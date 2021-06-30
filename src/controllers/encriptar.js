//modulo para encriptar contraseñas
const bcrypt = require('bcryptjs');

encriptarCtrl = {};

//funcion que genera el encriptado de la contraseña
encriptarCtrl.encryPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt) 
};

//funcion que compara la contraseña con la db
encriptarCtrl.matchPassword = async function(password){    
    return await bcrypt.compare(password, acaSeTraeLaContrasenaDelaDataBase)
};


module.exports = encriptarCtrl;