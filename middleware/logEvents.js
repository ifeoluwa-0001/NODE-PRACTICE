/* const express = require('express'); */
const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const eventEmitter = require('events');

/* const app = express(); */
const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');


async function log(message, fpath) {

    const fileName = path.basename(fpath);
    const logTime = format(new Date(), 'yyyy-MM-dd : hh:mm:ss');
    const logId = uuidv4();
    const logSignature = `${logId}\t${logTime}\t`;

    try {
        if(!fsSync.existsSync(fileName)){
            await fs.appendFile(fpath, `${logSignature}${message}\n`);
        } else {
            await fs.appendFile(fpath, `${logSignature}${message}\n`);
        }
    } catch(err) {
        throw `Error logging into ${fileName}:\n${err}`;
    };
    
};  

const logRequest = function (req, res, next) {
    log(req.url, path.join(__dirname, '..', 'logs', 'requestLogs.txt'));
    next();
};

 
module.exports = { logRequest, log };


