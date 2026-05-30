const express = require('express')
const cors = require('cors')
const db = require('./utils/db-connection')
const port = 3000

const app = express()

app.use(express.json())
app.use(cors())

const blogRouter = require('./routes/blogsRoutes')
const commentRouter= require('./routes/commentsRoutes')

app.get('/',(req,res)=>{
    res.send('welcome to my database server!')
})

app.use('/blogs',blogRouter)
app.use('/blogs/:blogId/comments',commentRouter)

db.sync({alter:true})
.then(()=>{
    app.listen(port,()=>{
        console.log('server is listening!')
    })
})
.catch((err)=>{
    console.log(err.message)
})