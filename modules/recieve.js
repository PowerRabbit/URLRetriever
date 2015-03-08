var Module = require('./main.js'),
    routes = {
        get: require('./../routes/get.js')
    },
    receiveModule = new Module();

receiveModule.process = function () {

    'use strict';

    var req = this.req,
        res = this.res,
        username = escape(req.session.username),
        pageURL;

    this.toDB("SELECT url FROM main WHERE username = '" + username + "';").then(
        function (data) {
            pageURL = unescape(data[0].url);
            if (pageURL) {
                res.redirect(pageURL);
            } else {
                routes.get(req, res); // no urls yet
            }
        },
        function (error) {
            res.json(error);
        }
    );
};

module.exports = receiveModule;