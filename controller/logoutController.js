const users = require("../model/users.json");

const fsAsync = require("fs/promises");
const path = require("path");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogout = async function(req, res){
    const cookies = req.cookies;

    if(!cookies.jwt) return res.sendStatus(204);
    console.log(req.cookies.jwt);

    const refreshToken = cookies.jwt;
    const foundUser = users.find((user) => { return user.refreshtoken === refreshToken });
    console.log(foundUser);

    if(!foundUser){
        res.clearCookie("jwt", { maxAge: 24 * 60 * 60 * 1000, sameSite: "lax", secure: false, httpOnly:  true });
        res.sendStatus(204);
    };

    const index = users.indexOf(foundUser);
    users[index].refreshtoken = undefined;
    
    await fsAsync.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(users));
    res.clearCookie("jwt", { maxAge: 24 * 60 * 60 * 1000, sameSite: "lax", secure: false, httpOnly:  true });
    res.sendStatus(204);
    
};

module.exports = handleLogout;