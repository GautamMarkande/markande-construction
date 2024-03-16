const UserSchema = require("../Schemas/UserSchema")

const registerUser=({name, username, email, hashedPass})=>{
    console.log({name, username, email, hashedPass})
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
module.exports = {registerUser}