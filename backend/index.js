//import packages
const express = require('express')
const cors = require('cors')
//db connection file imported
const db = require('../backend/db')
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session)

const port = parseInt(process.env.PORT) || 3000;
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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(cors())

//files importing
const UserRouter = require('../backend/Controllers/UserController')

//middlewares
app.use(express.json())

//Routers
app.use('/api/user',UserRouter)



app.listen(process.env.PORT,()=>{
    console.log("server is running on 3000")
})