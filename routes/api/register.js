const express = require("express");
const router = express.Router();
const path = require("path");


const handleNewUser = require("../../controller/registerController");

router.post("/register", handleNewUser);


module.exports = router;