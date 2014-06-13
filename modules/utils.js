module.exports = {
    returnError: function (errorCode) {
        var eCode = errorCode || 0,
        errorJSON;
        switch (eCode) {
            case 2: // Неверные данные авторизации
                errorTXT = 'Wrong login or pass.';
            break;
            default:
                errorTXT = 'Error. Sorry :(';                
            break; 
        }
        return errorTXT;
    },    
    getDateTime: function () {
        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        var year = date.getFullYear();

        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    },
    allowCrossDomain: function (req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);    
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }
};