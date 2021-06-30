require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session')
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
app.use(methodOverride('_method'))
app.use(session({
    secret: 'palabrasecretea',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

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
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next();
})

// Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/user.routes'));


module.exports = app ;