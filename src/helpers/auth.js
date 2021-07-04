const helpers = {};

helpers.isAuthenticated = (req, res, nex) => {
    if(req.isAuthenticated()){
        return nex();
    }
    res.redirect('/users/signin')
}

module.exports = helpers;