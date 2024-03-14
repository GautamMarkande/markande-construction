const mongoose = require('mongoose');
const clc = require('cli-color')
const dotenv = require('dotenv').config()
//db connection

mongoose.connect(process.env.MOGODB_URL)
.then(()=>{
    console.log(clc.yellowBright.underline("DB connected successfully"));
})
.catch((error)=>{
    console.log(clc.red(`DB not Connected ${error}`))
})