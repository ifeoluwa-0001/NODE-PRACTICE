const express = require("express");
const route = express.Router();

const handleRefreshToken = require("../../controller/refreshController");



route.get("/", handleRefreshToken);



module.exports = route;