const { Router } = require('express');
const router = Router();

const { renderSiginForm, rendeSingUpForm, signin, signup, logout } = require('../controllers/user.controllers');

router.get('/users/signup', rendeSingUpForm);

router.post('/users/signup', signup);

router.get('/users/signin', renderSiginForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout);



module.exports = router;