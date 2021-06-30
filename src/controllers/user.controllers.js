const usersCtrl = {};

const db = require('../database/database');
const { encryPassword, matchPassword } = require('./encriptar');


usersCtrl.rendeSingUpForm = (req, res) => {
    res.render('users/signup');
}

usersCtrl.signup = async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (password != confirm_password) {
        errors.push({ text: 'Passwords do not match' })
    }
    if (password.length < 4) {
        errors.push({ text: 'Passwords must be at last 4 characters.' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        })
    } else {
        const validar_email = await (await (db.query('SELECT email FROM usuario WHERE email = ($1)', [email]))).rows[0]
        if (validar_email) {
            req.flash('error_msg', 'The email is already in use.');
            res.redirect('/users/signup');
        } else {
            const password_encriptada = await encryPassword(password);
            const x = await db.query('INSERT INTO usuario (nombre, email, contrasena) VALUES ($1, $2, $3) RETURNING *', [name, email, password_encriptada]);
            req.flash('success_msg', 'You are already registered');
            res.redirect('/users/signin');
        }
    }
}

usersCtrl.renderSiginForm = (req, res) => {
    res.render('users/signin');
}

usersCtrl.signin = (req, res) => {
    res.send('signin');
}

usersCtrl.logout = (req, res) => {
    res.send('logout')
}

module.exports = usersCtrl;