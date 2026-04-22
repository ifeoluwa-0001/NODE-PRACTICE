const { profile } = require('console');
const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const cookieParser = require("cookie-parser");
//const users = require('../../model/users.json');
//const user = users.find(user => { user.email === user })

const accountaddress = path.join(__dirname, '..', '..', 'public', 'pages', 'profile.html');
//const verifyJWT = require("../../middleware/verifyJWT");

router.get("/profile", (req, res) => {
    res.sendFile(accountaddress);
});

router.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'pages', 'order.html'));
});

//router.post("/profile", (req, res) => {});


module.exports = router;