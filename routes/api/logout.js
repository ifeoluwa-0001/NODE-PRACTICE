const express = require("express");
const route = express.Router();
const handleLogout = require("../../controller/logoutController");

route.get("/", handleLogout);

module.exports = route;