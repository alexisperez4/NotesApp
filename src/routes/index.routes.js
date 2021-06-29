const { Router} = require('express');

const router = Router();

const { 
    renderIndex,
    renderAbout,
    testDB 
} = require('../controllers/index.controlers')

router.get('/', renderIndex)

router.get('/about', renderAbout)

router.get('/db', testDB)


module.exports = router;
