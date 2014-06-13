var Module = require('./main.js');

var retrieveModule = new Module;

retrieveModule.process = function () {
    var req = this.req,
        res = this.res,
        username = escape(req.session.username);
    
    if (req.body && typeof(req.body.url) !== 'undefined') {
        var newLink = escape(req.body.url);
        this.toDB("UPDATE main SET url = '" + newLink + "' WHERE username = '" + username + "';").then(
            function () {
                // doesn't return any results because UPDATE
                res.json('ok!');
            },
            function () {
                res.json('ok');
            }
        );
    }
    else {
        res.json('no url');
    }    
};

module.exports = retrieveModule;