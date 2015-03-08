var Module = require('./main.js'),
    logoffModule = new Module();

logoffModule.process = function () {

    'use strict';

    var req = this.req,
        res = this.res;
    if (req.session && req.session.is_authorized) {
        delete req.session.is_authorized;
    }
    res.redirect('/login');
};

module.exports = logoffModule;