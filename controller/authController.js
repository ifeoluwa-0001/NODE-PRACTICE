const users = require("../model/users.json");

const fsAsync = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const accountaddress = path.join(__dirname, '..', 'public', 'pages', 'profile.html');

const handleLogin = async function(req, res){
    const _email = req.body.email;
    const _pwd = req.body.password;

    if(!_email || !_pwd) return res.status(400).json("message", "E-mail and password required");
    let foundUser;

    foundUser = users.find(user => { return user.email === _email });

    
    if(!foundUser) return res.status(401).json({"message": "E-mail or password does not exists"}); 
    console.log(`Welcome, ${foundUser.email}`);
    
    const match = await bcrypt.compare(_pwd, foundUser.password); 
    
    if(!match) {
        return res.status(401).json({"message": "E-mail or password does not exists"});
    } else {
        //create JWT
        const roles = Object.values(foundUser);

        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            }, process.env.ACCESS_TOKEN_SECRET, {"expiresIn": "500s"});

        const refreshToken = jwt.sign({"email": foundUser.email}, process.env.REFRESH_TOKEN_SECRET, {"expiresIn": "1d"});
        
        const index = users.indexOf(foundUser.roles);
        console.log(foundUser);
        foundUser.refreshtoken = refreshToken;
        users[index] = foundUser;
        
        await fsAsync.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(users));
        
        res.cookie("jwt", refreshToken, {maxAge: 24 * 60 * 60 * 1000, sameSite: "lax", secure: false, httpOnly:  true});

        delete foundUser.roles;
        delete foundUser.password;
        delete foundUser.refreshtoken;
        res.cookie('userData', `${JSON.stringify(foundUser)}`);
        res.json({accessToken});
        res.status(200);
    };

};

module.exports = handleLogin;