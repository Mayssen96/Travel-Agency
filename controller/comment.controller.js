

const commentSchema = require('../models/comments.model');

exports.addComments = async(req,res) =>{
    try {
        const comments = new commentSchema(req.body)
        await comments.save();
        return res.status(200).send({msg:'added succesfully'})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}

exports.getAllComments = async(req,res) =>{
    try {
        const comments = await commentSchema.find()
        return res.status(200).send({comments})
    } catch (error) {
        return res.status(500).send({err:error})
    }
}