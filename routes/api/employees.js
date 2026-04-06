const express = require('express');
const router = express.Router();
const path = require('path');
const verifyJWT = require("../../middleware/verifyJWT");

/* const data = {}; */

/******* Simulate database query *******/


const employeesController = require('../../controller/employeesController');

router.route('/')
    .get(employeesController.getEmployees)
    .post(employeesController.createEmployee)
    .put(employeesController.setEmployee)
    .delete(employeesController.removeEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;