/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useLoginMutation,useTestQuery} from "../redux/services/api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from "../redux/user/Userslice";
import OAuth from '../components/OAuth'
function SignIn() {
  const navigate = useNavigate()
  // const [login,result]=useLoginMutation()
  // const {data} =useTestQuery()
  const { loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  // const [loading,setloading] = useState(false)
  const [formData, setFormData] = useState({})
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })

  }

  // console.log(formData)

  async function handleSubmit(e) {
    e.preventDefault()

    dispatch(signInStart())
    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      var data = await res.json()
      console.log(data)
      if (data.status === 400 || data.status === 500) {
        dispatch(signInFailure(data.error));
        return toast.error(data.error)
      }
      dispatch(signInSuccess(data));
      toast.success(data.message)
      setTimeout(() => {
        navigate('/');
      }, 3000)
    } catch (error) {
      dispatch(signInFailure(data.error))
      return toast.error(error)
    }
    // console.log(data)

    // const res = await login({...formData})
    // if(res.data.status===400 ||res.data.status===500){
    //   console.log(res.data)
    //   toast.error(res.data.error)
    //   setloading(false)
    // }else{
    //   console.log(res.data)
    //   toast.success(res.data.message)

    //  setloading(false)
    //}

  }
  return (
    <div className="p-3 max-w-xl mx-auto
    ">
      <h1 className='text-3xl font-semibold text-center '>Sign In</h1>
      <ToastContainer autoClose={2000} />
      <form className="flex flex-col gap-y-4 m-4" onSubmit={handleSubmit}>

        <input type="text" placeholder='Username or Email' id="userId" onChange={handleChange}
          className="border rounded-lg p-3" />

        <input type="password" placeholder='Password' id="password" onChange={handleChange}
          className="border rounded-lg p-3" />
        <button type="submit" disabled={loading}

          className="border rounded-lg p-3 bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading" : "sing In"}
        </button>
      </form>
      <div className="flex flex-col gap-y-4 m-4">
        <OAuth />
        <div className="flex gap-2 mt-5">
          <p>don not Have an  account? </p>
          <Link to="/sign-up"
            className="text-blue-600"
          >Sign Up</Link>
        </div>

      </div>
    </div>
  )
}

export default SignIn
