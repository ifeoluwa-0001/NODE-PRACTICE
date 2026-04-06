const usersDB = {
    users: require("../model/users.json"),
    setUser: function (newUser){ this.users = this.users.push(newUser); return newUser }
}; 

const fsAsync = require("fs/promises");
const fsSync = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");


const handleNewUser = async function(req, res){
    const userName = req.body.userName;
    const _pwd = req.body.pwd;

    if(!userName || !_pwd){
        //res.status();
        console.log(`${userName} ${_pwd}`);
        res.json({"message": "Username and password required."});
    };

    let isDuplicated = false;

    /* fsSync.writeFile(path.join(__dirname, "..", "model", "users.json"), "[]", (err) => {
        if(err) throw err;
        console.log(err);
    });  */

    for(user of usersDB.users){
        if(user.username === userName) isDuplicated = true;
    };

    if(isDuplicated){
        return res.sendStatus(409); 
    };
    
    try{
        const pwd = await bcrypt.hash(_pwd, 10);
        // why???
        const newUser = usersDB.users.push({
            "username": userName,
            "roles": {"user": 2000},
            "password": pwd
        });

        await fsAsync.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(usersDB.users));
        console.log(`User ${userName} created`);
        return res.status(201).json({"Success": `New user ${userName} created`});
    } catch(err){
        console.log(err.message);
        return res.status(500).json({"Error": `${err.message}`});
    };
    
};






module.exports = handleNewUser;