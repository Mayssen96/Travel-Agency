const express = require('express');
const admin = express.Router();
const {verifyAdmin} = require ('../middleweares/isAuth');
const {updateUser,getOneUser,deleteOneUser,getAllusers,getAllRole,addnewuseradmin} = require ('../controller/AdminController')


admin.put('/:id/updateUser',verifyAdmin,updateUser);
admin.get('/:id/getoneuser',verifyAdmin,getOneUser);
admin.get('/getallusers',verifyAdmin,getAllusers);
admin.get('/roles',verifyAdmin,getAllRole);
admin.post('/addnewuseradmin',verifyAdmin,addnewuseradmin);
admin.delete('/:id/deletoneuser',verifyAdmin,deleteOneUser);
 

module.exports = admin
