const { check, body } = require("express-validator");
const { readJSON } = require("../database");

const users = readJSON("users.json");

module.exports = [
      
      check("email")
      .notEmpty()
      .withMessage("El email es obligatorio").bail()
      .isEmail()
      .withMessage("Email invalido"),
    
    body("email")
    .custom(value=> {
        let user = users.find(user => user.email === value)
        return user !== undefined;
    })
    .withMessage("Email no registrado"), 

      check("pass")
            .notEmpty()
            .withMessage("Mal"),     

      body("pass")
            .custom((value,{req}) =>{
                let user= users.find ( user => user.email === req.body.email )
            
                return user.password === value;
            })
            .withMessage("Contraseña inválida")  
];
