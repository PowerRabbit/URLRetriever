module.exports = function (req, res) {

    'use strict';

    var message = '',
		auth = req.session.is_authorized;

    if (req.session.is_authorized) {
        message = 'Welcome!';
    } else {
        message = 'You should be authorized.';
    }

    res.render('login', {
        title: 'Login',
        message: message,
		auth: auth
    });
};