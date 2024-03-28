import { app } from "../firebase"
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'

 function  OAuth() {
    
   async function handlclick(){
    try {
        const Provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        const result = await signInWithPopup(auth, Provider);
        const res= await fetch('/api/user/google',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
              name:result.user.displayName,
              email:result.user.email,
              photo:result.user.photoURL
          })
        })
        console.log(await  res.json())
        console.log(result)
    } catch (error) {
        console.log(error)
    }
   }
  return (
    <button className='bg-red-700 text-white p-3 rounded-lg uppercase' 
    onClick={handlclick}>
        continue with google
    </button>
  )
}

export default OAuth
