const userSchema = require('../models/user.Schema');
const roleSchema = require('../models/roles');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')


exports.getAllusers = async(req,res) =>{
  

    

    try {
        const users = await userSchema.find();
        if(!users){
            return res.status(400).json({msg:'User Collection empty'})
        }
 
        return res.status(200).send({users})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}


exports.updateUser = async(req,res) =>{
    const {id} = req.params
    try {
      
        const users = await userSchema.findByIdAndUpdate(id,{$set:{...req.body}});
        if(!users){
            return res.status(400).json({msg:'User not exist'})
        }

        return res.status(200).send({msg:'User updated'})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}


exports.getOneUser = async(req,res) =>{
    const {id} = req.params
    try {
        const user = await userSchema.findById(id);
        if(!user){
            return res.status(400).json({msg:'User not exist'})
        }
        return res.status(200).send({user})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.deleteOneUser = async(req,res) =>{
 
    const {id} = req.params
    try {
        const userDeleted = await userSchema.findByIdAndDelete(id);
        if(!userDeleted){
            return res.status(400).json({msg:'User not exist'})
        }
   
        return res.status(200).send({msg:'User Deleted'})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.addnewuseradmin = async (req,res)=>{
    const {email,password} = req.body
    
    try {
        const userExists = await userSchema.findOne({email:email});
        if(userExists) {
            return res.status(400).send({msg: 'User already exists'});
        }
        const newUser = new userSchema(req.body)
         console.log(newUser)
        
            const salt = 10;
            const passwordHashed = bcrypt.hashSync(password,salt);

            newUser.password = passwordHashed;

            const role = await roleSchema.findOne({name:req.body.role})
            newUser.role = role._id

        const userId = {id:newUser._id};
        const token = jwt.sign(userId,process.env.passwordToken);
        await newUser.save();
        return res.status(200).send({msg: 'User added successfully',token});
    } catch (error) {
        return res.status(500).send({msg: error.message});
    }
}

exports.getAllRole = async (req,res) =>{
    try {
        const roles = await roleSchema.find();
       
        return res.status(200).send({roles})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}