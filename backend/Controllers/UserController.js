const express = require('express')
const { validateUser } = require('../Utils/Validation')
const { registerUser } = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const UserRouter = express.Router()

UserRouter.get( '/test', (req, res) => {
    return res.send({
        message:"construction app is running"
    })
})

UserRouter.post('/register',async(req,res)=>{
    const {name,username,email,password} = req.body
    try {
        await validateUser({name,username,email,password})

    } catch (error) {
        return res.send({
            status:400,
            error:error
        })
    }
    try {
        const salt = parseInt(process.env.SALT)||9
        const hashedPass = await bcrypt.hash(password,salt)
        // console.log(hashedPass)
        const userDb = await registerUser({name, username, email, hashedPass})
        console.log(userDb)
    } catch (error) {
        return res.send("error")
    }
    // return res.send({
    //     status:201,
    //     message:"Data addaed  successfully",
    //     data:req.body
    // })
})
module.exports = UserRouter