const users = require("../model/users.json");

const fsAsync = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config()

const handleLogin = async function(req, res){
    const _username = req.body.username;
    const _pwd = req.body.password;

    if(!_username || !_pwd) return res.status(400).json("message", "username and password required");
    let foundUser;

    foundUser = users.find(user => { return user.username === _username });

    
    if(!foundUser) return res.status(401).json({"message": "Username or password does not existss"}); 
    console.log(`Welcome, ${foundUser.username}`);
    
    const match = await bcrypt.compare(_pwd, foundUser.password);
    
    if(!match) {
        return res.status(401).json({"message": "Username or password does not exists"});
    } else {
        //create JWT
        const roles = Object.values(foundUser);

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            }, process.env.ACCESS_TOKEN_SECRET, {"expiresIn": "300s"});
        const refreshToken = jwt.sign({"username": foundUser.username}, process.env.REFRESH_TOKEN_SECRET, {"expiresIn": "1d"});
        
        const index = users.indexOf(foundUser.roles); 
        console.log(foundUser);
        foundUser.refreshtoken = refreshToken;

        users[index] = foundUser;
        console.log(users);
        
        
        await fsAsync.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(users));
        
        res.cookie("jwt", refreshToken, {maxAge: 24 * 60 * 60 * 1000, sameSite: "lax", secure: false, httpOnly:  true});
        res.json({accessToken});
    };

};

module.exports = handleLogin;