const users = require("../model/users.json");

const fsAsync = require("fs/promises");
const path = require("path");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = function(req, res){
    const cookies = req.cookies;

    if(!cookies.jwt) return res.sendStatus(401);
    console.log(req.cookies.jwt);

    const refreshToken = cookies.jwt;
    const foundUser = users.find((user) => { return user.refreshtoken === refreshToken });
    console.log(foundUser);

    if(!foundUser) return res.sendStatus(400); 
        
    const roles = Object.values(foundUser.roles);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);

        const newAccessToken = jwt.sign({
            "UserInfo": {
                "username": decoded.username,
                "roles": roles
            }
        }, process.env.ACCESS_TOKEN_SECRET, {"expiresIn": "300s"});
        res.json({newAccessToken});
    });

};

module.exports = handleRefreshToken;