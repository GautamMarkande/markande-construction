const express = require('express')
const { validateUser } = require('../Utils/Validation')
const { registerUser, verifyUser, findUser } = require('../Models/UserModel')
const bcrypt = require('bcrypt')
const session = require('express-session')
const UserRouter = express.Router()
const jwt = require('jsonwebtoken')


UserRouter.post('/register', async (req, res) => {
    const { name, username, email, password } = req.body
    try {
        await validateUser({ name, username, email, password })

    } catch (error) {
        return res.send({
            status: 400,
            error: error
        })
    }
    try {
        await verifyUser({ username, email })
    } catch (error) {
        return res.send({
            status: 400,
            error: error
        })
    }
    try {
        const salt = parseInt(process.env.SALT) || 9
        const hashedPass = await bcrypt.hash(password, salt)

        const userDb = await registerUser({ name, username, email, hashedPass })

        if (!userDb) {
            throw new Error("Error creating the account")
        } else {

            return res.send({
                status: 201,
                message: `The account ${username} has been created`
            })
        }
    } catch (error) {
        return res.send("error")
    }
    // return res.send({
    //     status:201,
    //     message:"Data addaed  successfully",
    //     data:req.body
    // })
})
UserRouter.post("/login", async function (req, res) {
    let { userId, password } = req.body;
    console.log({ userId, password })

    try {
        const userDb = await findUser({ userId })
        // console.log("i am >>",req.session)
        if (userDb) {
            const pass = await bcrypt.compare(password, userDb.password);
            if (!pass) {
                return res.send({
                    status: 400,
                    error: "Password not matched",
                })
            }
            // req.session.isAuth=true
            // req.session.user={
            //     userId:userDb._id,
            //     email:userDb.email,
            //     username:userDb.username
            // }
            const token = jwt.sign({ id: userDb._id }, process.env.JWT_SECRET);
            const { password: passw, ...rest } = userDb._doc;

            return res.cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json({ ...rest, message: "Login Successful" });


            console.log(token)
            return res.send({
                status: 200,
                message: "Login Successful",
                token: token,
            })

        } else {
            return res.send({
                status: 400,
                error: "please register yourself first",
            })
        }
    } catch (error) {
        console.log(error)
        return res.send({
            status: 500,
            error: "Internal server error",
        })
    }
})
UserRouter.get('/test', (req, res) => {
    console.log(req.session)
    return res.send({
        message: `construction app is running + ${req.session.user.username}`
    })
})
UserRouter.post('/google', async (req, res) => {
    const { name, email, photo } = req.body;
    console.log({ name, email, photo })
    try {
        const userDb = await findUser({ userId: email });
        const { password: passw, ...rest } = userDb._doc
        if (userDb) {
            return res.send({
                status: 400,
                error: 'This account has already been created',
                data: rest
            })
        }
        // const randomPass = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
        // const hashedPass = await bcrypt.hash("123456", 10);
        
        console.log(hashedPass)
            const newUser = await registerUser({name, username:name, email, hashedPass})
            console.log(newUser)
            if(!newUser){
                throw Error("Failed to create an account"+newUser)
            }
            return res.send({
                status: 200,
                message:"login successful",
            })
    } catch (error) {

        return res.send({
            status: 500,
            error:error,
            data:error
        })
    }
    console.log(name, email, photo)
    return res.send({
        message: "i am  from google auth"
    })
})
module.exports = UserRouter