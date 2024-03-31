import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase"


function Profile() {
  const { currentUser } = useSelector(state => state.user)
  const [file,setfile] = useState(undefined)
  const [filePerc,setfilePerc] = useState(0)
  const [fileError,setfileError] = useState(false)
  const [formData,setFormData]=useState({})
  const fileRef = useRef(null);
  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])
   console.log(formData)
  function handleFileUpload (file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime( )+file.name;
    const StorageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(StorageRef,file)
    uploadTask.on('state_changed',(snapshot)=>{
        const progress =(snapshot.bytesTransferred / snapshot.totalBytes) *100
        setfilePerc(Math.round(progress))
    },(err)=> {
        setfileError(err)
    },()=>{
        // success
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            let imgLink= downloadURL
           console.log(imgLink)
            setFormData({...formData,photo:imgLink})
        })
    })
  }
  console.log(file)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center font-semibold text-3xl my-5">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <input onChange={(e)=>setfile(e.target.files[0])} type="file" ref={fileRef} accept="image/*" hidden />
        <img onClick={()=>fileRef.current.click()} src={formData?.photo||currentUser.data.photo} alt="profile" className="border-solid border-white border-8 cursor-pointer mt-2 w-24 h-24 rounded-full self-center object-cover" />
        {
          fileError?
            <span className="text-red-700 text-center text-sm">Image upload error(image size must be less then 2MB)</span>
          :
            filePerc>0 && filePerc<100?
              <span className="text-slate-700 text-center text-sm">{`upload ${filePerc}%`}</span>
            :
              filePerc===100?<span className="text-green-700 text-center text-sm">Image uploaded successfully</span>:""
        }
        <input type='text' placeholder='Name' id="name" className="border p-3 rounded-lg outline-orange-300" />
        <input type='text' placeholder='Username' id="username" className="border p-3 rounded-lg outline-orange-300" />
        <input type='email' placeholder='Email' id="email" className="border p-3 rounded-lg outline-orange-300" />
        <input type='text' placeholder='Password' id="password" className="border p-3 rounded-lg outline-orange-300" />
        <button className="uppercase text-white p-3 bg-slate-700 rounded-lg">Update</button>
      </form>
      <div className="flex justify-between mt-2 font-semibold">
        <span className="text-red-700 capitalize cursor-pointer">Delete acoount</span>
        <span className="text-red-700 capitalize cursor-pointer">sing out</span>
      </div>
    </div>
  )
}

export default Profile
