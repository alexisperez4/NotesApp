require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');

const db = require('./database/database');

const path = require('path');
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



// Global Variables

// Routes

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/db', (req, res) => {

    Promise.resolve()
    .then(function(){
        return(db.query('SELECT * FROM prueba1')) 
    })
    .then(function(x){
        console.log(x.rows)
        res.send(x.rows)
    })
    .catch(function(e) {
        console.log(e)
    })

})
//Static Files
app.use(express.static(path.join(__dirname + 'public')));


module.exports = app ;