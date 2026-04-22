const usersDB = {
    users: require("../model/users.json"),
    setUser: function (newUser){ this.users = this.users.push(newUser); return newUser }
}; 

const fsAsync = require("fs/promises");
const fsSync = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const { uniqueUsernameGenerator, Config, adjectives, nouns } = require('unique-username-generator'); 


const handleNewUser = async function(req, res){
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const email = req.body.email;
    const age = req.body.age;
    const phone = req.body.phone;
    const pass = req.body.password;


    const config = {
        dictionaries: [[firstName, lastName]],
        separator: '_',
        style: 'lowerCase',
        randomDigits: 4
    }

    const userName = uniqueUsernameGenerator(config)


    if(!email || !pass){
        //res.status();
        console.log(`E-mail:\t${email}\nPassowrd:\t${pass}`);
        res.json({"message": "E-mail and password required."});
    };

    for(user of usersDB.users){
        if(user.email === email) return res.sendStatus(409); 
    };
    
    try{
        const passw = await bcrypt.hash(pass, 10);
        // why???
        const newUser = usersDB.users.push({
            "firstname": firstName,
            "lastname": lastName,
            "username": userName,
            "email": email,
            "phone": phone,
            "age": age,
            "roles": {"user": 2000},
            "password": passw
        });

        await fsAsync.writeFile(path.join(__dirname, "..", "model", "users.json"), JSON.stringify(usersDB.users));
        console.log(`User ${email} created`);
        return res.status(201).json({"Success": `New user ${email} created`});
    } catch(err){
        console.log(err.message);
        return res.status(500).json({"Error": `${err.message}`});
    };
    
};



module.exports = handleNewUser;