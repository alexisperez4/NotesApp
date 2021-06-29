const indexCtrl = {};
const db = require('../database/database');


indexCtrl.renderIndex = (req, res) => {
    res.render('index')
};

indexCtrl.renderAbout = (req, res) => {
    res.render('about')
};

indexCtrl.testDB = (req, res) => {

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

}

module.exports = indexCtrl;