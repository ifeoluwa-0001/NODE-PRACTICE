const employees = require('../model/employees.json');



    /* setEmployees: function(data){ this.employees = data; } */

function isEmpty(_data) {
    if(_data === "" || _data === null || _data === undefined) return true;

    return false;
};

function isAllWhiteSpace(_data) {
    let i = 0;
    const dataSize = _data.length 

    if(isEmpty(_data)) return false;

    for(i; i < dataSize; i++){
        if(_data[i] !== " ") return false;
    };
};

// ??????
function isPaddedWithWhiteSpace(_data){
    const dataSize = _data.length 
    if(_data[0] === " " && _data[dataSize - 1] === " ") return true;
};

function formatInput(_data){

    if(Number.isInteger(_data)){
        if(_data < 1){
            return "";
        }
    };

    if(!isEmpty(_data)){
        if(isAllWhiteSpace(_data)){
            return "";
        } else {
            _data = _data.trim();
        }

    };

    return _data;
};




//CRUD operations

//create data
function createEmployee(req, res){
    let newUserId;
    // Arrange employees chronologically
    if(isEmpty(employees)) {
        newUserId = 1;
    } else {
        newUserId = employees.length + 1;
    };

    const newEmployee = {
        "id": newUserId,
        "name": formatInput(req.body.name) || "",
        "age": formatInput(req.body.age) || "",
        "sex": formatInput(req.body.sex) || "",
        "job": formatInput(req.body.job) || ""
    };

    let isDuplicated = true;

    const lastEmployee = employees[employees.length - 1];

    if(employees.length === 0){

        employees.push(newEmployee);
        res.json(employees);
    } else {
        if(newEmployee.name === lastEmployee.name && newEmployee.age === lastEmployee.age && newEmployee.sex === lastEmployee.sex && newEmployee.sex === lastEmployee.sex){
            isDuplicated = true;
        } else { isDuplicated = false; };

        if(isDuplicated) {
            return res.sendStatus(409);
        };

        employees.push(newEmployee);

        return res.status(200).json(employees);
    };
};



//read data
function getEmployees(req, res){
    return res.status(200).json(employees);
};



function getEmployee(req, res){
    const employeeId = req.params.id;

    let employeeIndex;
    let isPresent = false;
    let counter = -1;

    for(let emp of employees) {
        counter++;

        if(Number(emp.id) === Number(employeeId)) {
            employeeIndex = counter;
            isPresent = true;
        };
    };


    if(isEmpty(employeeId)){
        res.status(400);
        res.json({"message": "Specify employee id"});
    } else if(!isPresent){
        res.status(400);
        res.json({"message": `Employee with id: ${employeeId} does not exists`});
    };

    employees.sort();
    res.status(200).json(employees[employeeIndex]);
};



//update data
function setEmployee(req, res){
    const employeeId = Number(req.body.id);
    let exists = false;
    
    //check if employee exists
    if(employeeId === ""){
        res.status(400);
        res.json({"message": "Specify employee id"});
    }; 

    for(let employee of employees){
        if(employee.id === employeeId) exists = true;
    };

    if(!exists) return res.sendStatus(409); 

    const employeeIndex = employeeId - 1;
    
    const name = employees[employeeIndex].name;
    const age = employees[employeeIndex].age;
    const sex = employees[employeeIndex].sex;
    const job = employees[employeeIndex].job;

    employees[employeeIndex].name = (isEmpty(formatInput(req.body.name)))? name : formatInput(req.body.name);
    employees[employeeIndex].age = (isEmpty(formatInput(req.body.age)))? age : formatInput(req.body.age);
    employees[employeeIndex].sex = (isEmpty(formatInput(req.body.sex)))? sex : formatInput(req.body.sex);
    employees[employeeIndex].job = (isEmpty(formatInput(req.body.job)))? job : formatInput(req.body.job);

    res.status(200);
    res.json(employees);
};



//delete data
function removeEmployee(req, res){
    const employeeId = req.body.id;
    let employeeIndex;
    let isPresent = false;
    let counter = -1;

    for(let emp of employees) {
        counter++;

        if(Number(emp.id) === Number(employeeId)) {
            employeeIndex = counter;
            isPresent = true;
        };
    };


    //check if employee exists
    if(employeeId === ""){
        res.status(400);
        res.json({"message": `Employee with id: ${employeeId} not found`});
    } else if(!isPresent){
        res.status(400);
        res.json({"message": `Employee with id: ${employeeId} does not exists`});
    };


    employees.splice(employeeIndex, 1);
    employees.sort();

    res.status(200);
    res.json(employees);
};


module.exports = {
    createEmployee,
    getEmployees,
    getEmployee,
    setEmployee,
    removeEmployee
};