const userSchema = require('../models/user.Schema');
const bcrypt = require('bcrypt')
const roleSchema = require('../models/roles')
const appliSchema =require ('../models/application')

const init = async () => {

    try {
        const roles = await roleSchema.find();
        if(roles.length == 0){
            await roleSchema.insertMany([{name:'user'},{name:'gestionnaire'},{name:'admin'}]);
        }
        
        const isAdmin = await roleSchema.findOne({name:'admin'});
      
        const adminExists = await userSchema.findOne({isAdmin:true})
        if(!adminExists){
            const newAdmin = new userSchema({ 
                firstname: 'admin',
                lastname: 'admin',
                avatar: '/images/1.jpg',  
                isAdmin: true,  
                email: 'admin@example.com',
                password: bcrypt.hashSync('123456789',10),
                role: [isAdmin._id],
            })
            await newAdmin.save();
            console.log('Admin is created inside the user collection');
        }
         const appli = await appliSchema.find();
         
         if (appli.length == 0) {
            await appliSchema.insertMany(Data)
            console.log('data added')
         }

    } catch (error) {
        console.log(error);
    }
}

module.exports = init;