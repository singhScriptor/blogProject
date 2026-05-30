const { DataTypes }= require('sequelize')

const sequelize = require('../utils/db-connection')
const blogs =  require('../models/blogs')

const comments = sequelize.define('comments',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    comment:{
        type:DataTypes.STRING,
        allowNull: false
    },
    blogId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{model: blogs,key: 'id'}
    }
},
    {
        tableName:'comments',
        timestamps:false
    }
)
module.exports = comments