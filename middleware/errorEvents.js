const path = require('path');
const {log} = require("./logEvents");

const logError = function (err, req, res, next) {
    log(err, path.join(__dirname, '..', 'logs', 'errorLogs.txt'));
    next();
};


module.exports = logError;





