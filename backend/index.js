const express = require('express')
const db = require('../backend/db')
const app = express()
app.listen(3000,()=>{
    console.log("server is running on 3000")
})