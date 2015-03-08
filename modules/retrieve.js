var Module = require('./main.js'),
    retrieveModule = new Module();

retrieveModule.process = function () {

    'use strict';

    var req = this.req,
        res = this.res,
        username = escape(req.session.username),
        newLink;

    if (req.body && req.body.url !== undefined) {
        newLink = escape(req.body.url);
        this.toDB("UPDATE main SET url = '" + newLink + "' WHERE username = '" + username + "';").then(
            function () {
                // doesn't return any results because UPDATE
                res.json('ok!');
            },
            function () {
                res.json('ok');
            }
        );
    } else {
        res.json('no url');
    }
};

module.exports = retrieveModule;