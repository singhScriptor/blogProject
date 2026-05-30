const { DataTypes } = require('sequelize')

const sequelize = require('../utils/db-connection')

const blogs = sequelize.define('blogs',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    author:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
    {
        tableName:'blogs',
        timestamps:false
    }
)

module.exports = blogs