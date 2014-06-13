var Module = require('./main.js');    

var logoffModule = new Module;

logoffModule.process = function () {
    var req = this.req,
        res = this.res;
    if (req.session && req.session.is_authorized) {
        delete req.session.is_authorized;
    }
    res.redirect('/login');
};

module.exports = logoffModule;