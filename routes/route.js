const express = require('express');
const user = express.Router();
const {createUser,login,current,updateUser} = require ('../controller/user.controler');
const {getDataFromApplication} = require('../controller/Vol')
const {Validation,RegisterValidation,LoginValidation} = require ('../middleweares/Validator');
const {isAuth} = require ('../middleweares/isAuth')
const {upload} = require('../middleweares/MulterMiddleWare')
user.get('/application',getDataFromApplication)
user.post('/addUser',upload.single("file"),createUser);
user.post('/login',LoginValidation,Validation,login);
user.get('/current',isAuth,current)
user.put('/updateUser/:id',updateUser);   

module.exports = user