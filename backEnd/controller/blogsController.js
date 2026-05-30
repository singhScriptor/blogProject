const blogs = require('../models/blogs')

const postBlogs = async(req,res)=>{
    try{
        const {title,author,content}=req.body
        const result = await blogs.create({title,author,content})
        res.json(result)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

const getBlogs =async(req,res)=>{
    try{
        const result = await blogs.findAll()
        res.status(200).json(result)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

module.exports = {
    postBlogs,
    getBlogs
}