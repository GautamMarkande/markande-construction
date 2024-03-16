const validator = require('email-validator')
const validateUser=({name,username,email,password})=>{
   return new Promise((resolve ,reject)=>{
         if(!name || !username || !email || !password) {
             reject('All fields are required'); 
         }
         if(typeof name!=='string')reject( 'Name should be a string');
         else if (typeof username !== 'string'||username.length<5)reject("Username should be at least 5 characters long");
         else if(typeof email!=='string')reject('Email should be a string');
         else if(!validator.validate(email))reject("please  provide a valid Email");
         else if(typeof password!=='string')reject("password should be in string")
         else{
        resolve(true)
    }
         
   })
}
module.exports = {validateUser}