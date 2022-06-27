const userSchema = require ('../models/user.Schema')
const roleSchema = require ('../models/roles')
const appliSchema = require('../models/application')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken');

exports.createUser = async (req,res)=>{
    const {email,password} = req.body
    
    try {
        const userExists = await userSchema.findOne({email:email});
        if(userExists) {
            return res.status(400).send({msg: 'User already exists'});
        }
       
       console.log(req.file)
        const newUser = new userSchema({...req.body, avatar:'/images/'+req.file.originalname})
         
        
        const salt = 10;
        const passwordHashed = bcrypt.hashSync(password,salt);

        newUser.password = passwordHashed;
       
            const role = await roleSchema.findOne({name:'user'})
            newUser.role = role._id
      
        
        const userId = {id:newUser._id};
        const token = jwt.sign(userId,process.env.passwordToken);
        await newUser.save();
        return res.status(200).send({msg: 'User added successfully',token});
    } catch (error) {
        return res.status(500).send({msg: error.message});
    }
}


exports.login = async (req,res)=>{
    const {email,password} = req.body
    try {
        const userExists = await userSchema.findOne({email:email});
        if(!userExists) {
            return res.status(400).send({msg: 'User not exists'});
        }
        const passwordHashed = bcrypt.compareSync(password,userExists.password);
        if(!passwordHashed){ 

            return res.status(400).send({msg:'Bad credentials'})
        }
        const userId = {id:userExists._id};
        const token = jwt.sign(userId,process.env.passwordToken);
        return res.status(200).send({msg: 'Logged successfully',token});
    } catch (error) {

        return res.status(500).send({msg: error.message});
    }
}

exports.current = async (req,res) => {
    try {
     
     return res.status(200).json({user:req.user})
       
    } catch (error) {
     return res.status(500).send({msg:error})
    }
    
 }
exports.getDataFromApplication = async (req,res) =>{
    try {
    
        const appli = await appliSchema.find();
        return res.status(200).send({appli})
    } catch (error) {
        return res.status(500).send(error)
    }
}



exports.updateUser = async(req,res) =>{
    const {id} = req.params
    try { 
        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password,10)
        }
        const users = await userSchema.findByIdAndUpdate(id,{$set:{...req.body}});
        if(!users){
            return res.status(400).json({msg:'User not exist'})
        }
        const user = await userSchema.findById(id)
        console.log(user)
        return res.status(200).send({msg:'User updated',user})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}


