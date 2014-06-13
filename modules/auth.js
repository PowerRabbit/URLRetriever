var Module = require('./main.js'),
crypto = require('crypto');

var authModule = new Module;
authModule.name = 'auth';
authModule.process = function () {
    var req = this.req, // move all "this" to one object
        res = this.res,
        acceptsJSON = this.acceptsJSON,
		acceptsHTML = this.acceptsHTML,
		username,
		password,
		passwordFromDB,
		salt,
		pepper = 'gvdfbgdhte', //move to config
		hash,
        wrong = function (text, status) {
            if (acceptsJSON) {
                res.json({
                    status: status || 0,
                    message: text
                });
            }
            else {
                if (acceptsHTML) {
                    res.redirect('/login');
                }
                else {
                    res.send( 'Unauthorized', 401 );
                }
            }
        };    
	// Checking username & password
	if (req.body) {
		username = req.body.user;
		password = req.body.password;
		if (typeof(username) != 'undefined' && typeof(password) != 'undefined') {
			username = escape(username);
			this.toDB("SELECT * FROM main WHERE username = '"+username+"';").then(
				function (data) {
					passwordFromDB = data[0].pass;
					salt = data[0].salt;
					hash = crypto.createHash('sha256').update(salt + password + pepper).digest('base64');
					
					if (hash === passwordFromDB) {
						req.session.is_authorized = true;
						req.session.username = username;
						wrong('welcome', 1);
					}
					else {
						wrong('wrong request'); // wrong password
					}
				},
				function (error_text, error) {
					wrong('wrong request'); // error handler, maybe wrong user
				}
			);
		}
		else {
			wrong('wrong request');  // no auth data
		}
	}
	else {
		wrong('wrong request');
	}
};

module.exports = authModule;