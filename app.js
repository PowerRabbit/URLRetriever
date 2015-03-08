var express = require('express'),
    pages = {},
    http = require('http'),
    path = require('path'),
    app = express(),
    utils = require('./modules/utils.js'),
    modules = {};

pages.login = require('./routes/login.js');
modules.receive = require('./modules/recieve.js');
modules.retrieve = require('./modules/retrieve.js');
modules.auth = require('./modules/auth.js');
modules.logoff = require('./modules/logoff.js');

app.use(express.cookieParser());
app.use(express.session({secret: 'mnbvasdsfg123SDFggsdf'}));
app.set('port', 8090);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(utils.allowCrossDomain);
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/get', modules.receive.init);
app.post('/set', modules.retrieve.init);
app.post('/auth', modules.auth.init);
app.get('/logoff', modules.logoff.init);
app.get('/login', pages.login);


http.createServer(app).listen(app.get('port'), function () {
    console.log(utils.getDateTime() + ' -- Express server listening on port ' + app.get('port'));
});