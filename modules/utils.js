module.exports = {
    returnError: function (errorCode) {
        var eCode = errorCode || 0,
            errorTXT,
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
        var date = new Date(),
            hour,
            min,
            sec,
            year,
            month,
            day;

        hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        year = date.getFullYear();

        month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;

        day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;

        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    },
    allowCrossDomain: function (req, res, next) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    }
};