require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname , 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(morgan('dev'));
//Encriptado de contraseña
const bcrypt = require('bcryptjs');

//funcion que genera el encriptado de la contraseña
const encryPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt) 
}
//funcion que compara la contraseña con la db
const matchPassword = async function(password){    
    return await bcrypt.compare(password, acaSeTraeLaContrasenaDelaDataBase)
}


//Static Files
app.use(express.static(path.join(__dirname , 'public')));



// Global Variables

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));



module.exports = app ;