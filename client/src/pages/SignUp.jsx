/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../redux/services/api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp() {
  const navigate = useNavigate()
  const [register,result]=useRegisterMutation()
  const [errorMsg,seterrorMsg]=useState("")
  const [isLoading,setisLoading] = useState(false)
  const [formData,setFormData]=useState({})
  function handleChange(e){
       setFormData({
        ...formData,
        [e.target.id]:e.target.value
       })

  }

  // console.log(formData)
  
  async function handleSubmit(e){
    
         e.preventDefault()
         setisLoading(true)
          const res = await register(formData)
          if(res.data.status===400 ||res.data.status===500){
            console.log(res.data)
            seterrorMsg(res.data.error)
            setisLoading(false)
          }else{
            console.log(res.data)
            setTimeout(() => {
              navigate("/sign-in");
            }, 2000);
            toast.success(res.data.message)
             setisLoading(false)
          }
  }
  return (
    <div className="p-3 max-w-xl mx-auto
    ">
      <h1 className='text-3xl font-semibold text-center '>Sign Up</h1>
      <ToastContainer  autoClose={2000}/>
      {errorMsg!==""&&<p className="text-sm text-red-700">{errorMsg}</p>}
      <form className="flex flex-col gap-y-4 m-4" onSubmit={handleSubmit}>
        <input type="text" placeholder='Name' id="name" onChange={handleChange}
        className="border rounded-lg p-3"/>
        <input type="text" placeholder='Username' id="username" onChange={handleChange}
        className="border rounded-lg p-3"/>
        <input type="email" placeholder='Email' id="email" onChange={handleChange}
        className="border rounded-lg p-3"/>
        <input type="password" placeholder='Password' id="password" onChange={handleChange} 
        className="border rounded-lg p-3"/>
        <button type="submit" disabled={isLoading}
          className="border rounded-lg p-3 bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80">
          {isLoading?"Loading":"sing up"}</button>
          <div className="flex gap-2 mt-5">
            <p>Have an  account? </p>
            <Link to="/sign-in"
            className="text-blue-600"
            >Log In</Link>
          </div>
      </form>
    </div>
  )
}

export default SignUp
