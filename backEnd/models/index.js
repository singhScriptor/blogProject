const blogs=require('../models/blogs')
const comments = require('../models/comments')

blogs.hasMany(comments,{foreignKey:'blogId'})
comments.belongsTo(blogs,{foreignKey:'blogId'})

module.exports = {
    blogs,
    comments
}