import { useDispatch, useSelector } from "react-redux"
import { app } from "../firebase"
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import { signInFailure, signInStart, signInSuccess } from "../redux/user/Userslice";
import { useNavigate } from "react-router-dom";

 function  OAuth() {
  const navigate = useNavigate(null)
    const dispatch=useDispatch();
    const state =useSelector(state=>state.user)
    console.log(">>",state)
   async function handlclick(){
    try {
      dispatch(signInStart());
      
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
        console.log(">>",state)
        const data=await  res.json()
        if(data.status===400||data.status==500){
          throw new Error(data.error);
        }
        dispatch(signInSuccess(data))
        // console.log(result)
        console.log(">>",state)
        setTimeout(()=>{
         navigate("/")
        },1000)
    } catch (error) {
        console.log(error)
        dispatch(signInFailure(error))
        console.log(state)
    }
   }
  return (
    <button className='bg-red-700 text-white p-3 rounded-lg uppercase' 
    onClick={handlclick}>
        {state.loading?"loading":"continue with google"}
    </button>
  )
}

export default OAuth
