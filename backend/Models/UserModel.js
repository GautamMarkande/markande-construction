const UserSchema = require("../Schemas/UserSchema")

const registerUser=({name, username, email, hashedPass})=>{
      return new Promise(async(resolve,reject)=>{
            try {
                const userObj = new UserSchema({
                    name:name,
                    username:username,
                    email:email,
                    password:hashedPass
                })
                const userDb = await userObj.save()
                resolve(userDb)
            } catch (error) {
                console.log(error)
                reject(error)
            }
      })
}
const verifyUser=({username,email})=>{
 return new Promise(async(resolve ,reject)=>{
        try {
            const userExist = await UserSchema.findOne({
                    $or:[{username}, {email}]
            })
            if(userExist&&userExist.username===username){
               reject("Username  aleady register")
            }
            else if(userExist&&userExist.email===email){
                reject("Email already registered") 
            }else{
                resolve()
            }
        } catch (error) {
            return res.send({
                status:500,
                message:"Internal  server error"
            })
        }
 })
}
module.exports = {registerUser,verifyUser}