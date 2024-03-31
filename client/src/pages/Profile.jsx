import { useSelector } from "react-redux"


function Profile() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-5">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <img src={currentUser.data.photo} alt="profile" className="border border-solid border-white border-8 cursor-pointer mt-2 w-24 h-24 rounded-full self-center object-cover" />
        <input type='text' placeholder='Name' id="name" className="border p-3 rounded-lg outline-orange-300" />
        <input type='text' placeholder='Username' id="username" className="border p-3 rounded-lg outline-orange-300" />
        <input type='email' placeholder='Email' id="email" className="border p-3 rounded-lg outline-orange-300" />
        <input type='text' placeholder='Password' id="password" className="border p-3 rounded-lg outline-orange-300" />
        <button className="uppercase text-white p-3 bg-slate-700 rounded-lg">Update</button>
      </form>
      <div className="flex justify-between">
        <span className="text-red-700 capitalize cursor-pointer">Delete acoount</span>
        <span className="text-red-700 capitalize cursor-pointer">sing out</span>
      </div>
    </div>
  )
}

export default Profile
