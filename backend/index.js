//import packages
const express = require('express')
//db connection file imported
const db = require('../backend/db')
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session)

const app = express()
const store = new MongoDbStore({
    uri:process.env.MOGODB_URL,
    collection: 'sessions'
})
//session
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store:store
}))


//files importing
const UserRouter = require('../backend/Controllers/UserController')

//middlewares
app.use(express.json())

//Routers
app.use('/api/user',UserRouter)



app.listen(3000,()=>{
    console.log("server is running on 3000")
})