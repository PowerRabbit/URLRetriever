var config = require('./config.js'),
    Promise = require("es6-promise").Promise,
    pg = require('pg.js');

var Module = function () {
    var that = this,
        db_user = 'postgres', // to config
        db_pass = '111',
        db_name = 'postgres',
        db_host = 'localhost',
        conString = 'postgres://'+db_user+':'+db_pass+'@'+db_host+'/'+db_name+'',
        checkAuth = function (req) {
            if(req && req.session) {
                if (typeof(req.session.is_authorized) != 'undefined') {
                    return true;
                }
            }
            return false;
        };
    
    this.process = function () {};
    this.name = '';
    this.username;
    this.init = function (request, response) {
        var accept = request.get('Accept') || '';
        that.req = request;
        that.res = response;
        that.acceptsJSON = (accept.indexOf('application/json') !== -1 || accept.indexOf('text/javascript') !== -1);
        that.acceptsHTML = (accept.indexOf('text/html') !== -1);
        
        if (checkAuth (request) === false && that.name !== 'auth') {
            if (that.acceptsJSON) {
                response.json({
                    'status':'0',
                    'message':'Please log in.',                    
                    'formURL': config.formURL,
                    'formId': config.formId
                });
            }
            else {
                if (that.acceptsHTML) {
                    response.redirect('/login');
                }
                else {
                    response.send( 'Unauthorized', 401 );
                }
            }
        }
        else {
            that.process();
        }
    };
    
    this.toDB = function (query) {
        return new Promise(function(resolve, reject) {  
            if (typeof(query) !== 'string') {
                reject('Wrong query');
            }
            else {
                var client = new pg.Client(conString),
					error_text;
					
                client.connect(function(err) {
                    if(err) {
                        reject('could not connect to DB', err);
                    }
                    else {
                        client.query(query, function(err, result) {
                            if(err) {
                                reject('error running query', err);
								return false;
                            }
                            
							if (typeof (result) !== 'undefined') {
                                if(!result.rows) {
                                    error_text = 'no rows, that`s strange...';
                                }
                                else {
                                    if (typeof (result.rows.length) !== 'undefined' && result.rows.length < 1) {
                                        error_text = 'no results';
                                    }
                                    else {
                                        resolve(result.rows);
                                    }                                    
                                }
                            }
							else {
								error_text = 'cannot retrieve a result';
							}
                            if (error_text) {
								reject(error_text);
							}
							client.end();
                        });
                    }
                });
            }
        });
    }
}

module.exports = Module;