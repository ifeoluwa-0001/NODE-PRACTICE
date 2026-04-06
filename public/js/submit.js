document.addEventListener("DOMContentLoaded", function(){

    const form = document.getElementById("form");
    const _firstname = document.getElementById("firstname");
    const _lastname = document.getElementById("lastname");
    const _age = document.getElementById("age");
    const _tel = document.getElementById("phonenumber");
    const _password = document.getElementById("password");

    const msgboxFirstname = document.getElementsByClassName("err-firstname");
    const msgboxLastname = document.getElementsByClassName("err-lastname");
    const msgboxAge = document.getElementsByClassName("err-age");
    const msgboxTel = document.getElementsByClassName("err-phonenumber");
    const msgboxPassword = document.getElementsByClassName("pass");


    form.addEventListener("submit", (e) => {
        e.preventDefault();

        validateName(msgboxFirstname, _firstname.innerText, "firstname");
        validateName(msgboxLastname, _lastname.innerText, "lastname");
        validateAge(msgboxAge, _age.innerText);
        validateTel(msgboxTel, _tel.innerText);
        validatePassword(msgboxPassword, _password.innerText)

    });





    const isEmpty = function (userInput){
        if(!userInput) return true; 
    };



    const isAllWhitespace = function (userInput){
        for(let char in userInput){
            if(userInput[char] !== " ") return false;
        };

        return true;
    };



    const allLetters = function (input){
        const re = /[A-Za-z]/g;

        return re.test(input);
    };



    const validateName = function (elem, userInputedName, xname){
        const messageField = elem/*.parentNode.previousElementSibling*/;

        if(isEmpty(userInputedName)){
            console.log(`your ${xname} is required`);
            printMessage(messageField, `your ${xname} is required`);
        } else if(isAllWhitespace(userInputedName)) {
            console.log("Invalid input");
            printMessage(messageField, "Invalid input");
        };

        
        if(!allLetters(userInputedName)){
            console.log("Invalid input");
            printMessage(messageField, "Invalid input");
        };

        elem.innerText = userInputedName.trim();


    };



    const validateAge = function (elem, userInputedAge){

        const messageField = elem/*.parentNode.previousElementSibling*/;

        if(isEmpty(userInputedAge)){
            console.log("your age is required");
            printMessage(messageField, "your age is required");
        } else if(isAllWhitespace(userInputedAge)) {
            console.log("Invalid input");
            printMessage(messageField, "Invalid input");
        };
        
        const re = /[0-9]/g;

        if(!re.test(userInputedAge)){
            console.log("Invalid input");
            printMessage(messageField, "Invalid input");
        };

        _age.innerText = userInputedAge.trim();

    };



    const validateTel = function (elem, userInputedTel){

        const messageField = elem/*.parentNode.previousElementSibling*/;
        
        if(isEmpty(userInputedTel)){
            console.log("your phone number is required");
            printMessage(messageField, "your phone number is required");
        } else if(isAllWhitespace(userInputedTel)) {
            console.log("Invalid input");
            printMessage(messageField, "Invalid input");
        };

        const re = /[0-9]{11}/g;
        if(!re.test(userInputedTel)){
            console.log("Invalid input");
            printMessage(messageField, "Invalid input");
        };

        if(userInputedTel.length !== 11)
            console.log("Invalid input");
            printMessage(messageField, "Invalid input");

        _tel.innerText = userInputedTel;

    };



    const validatePassword = function (elem, userInputedPassword){

        const messageField = elem/*.parentNode.previousElementSibling*/;
        
        if(userInputedPassword.length < 8 || userInputedPassword > 16){
            console.log("password must be more than 8 characters long and less than 16 characters long");
            printMessage(messageField, "password must be more than 8 characters long and less than 16 characters long");
        };

        const re = /[a-zA-z0-9]/g;

        _password.innerText = userInputedPassword;

    };

    const printMessage = function (elem, message){
        elem.value = message;
    };


});






