import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/Userslice";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import ShowListings from "./ShowListings";

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [file, setfile] = useState(undefined);
  const [filePerc, setfilePerc] = useState(0);
  const [fileError, setfileError] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.data?.name || "",
    username: currentUser?.data?.username || "",
    email: currentUser?.data?.email || "",
    photo: currentUser.data?.photo || "",
  });
  const [showListings] = useState(true);
  const fileRef = useRef(null);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  function handleFileUpload(file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const StorageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(StorageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePerc(Math.round(progress));
      },
      (err) => {
        setfileError(err);
      },
      () => {
        // success
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          let imgLink = downloadURL;
          setFormData({ ...formData, photo: imgLink });
        });
      }
    );
  }
  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  async function handleSubmit(e) {
    dispatch(updateUserStart());
    e.preventDefault();
    try {
      if (updatePassword && formData.password.length < 6) {
        toast.error("Password should be at least 6 characters");
        dispatch(updateUserFailure());
        return;
      }
      if (!formData.email || !formData.username) {
        throw new Error("Manditory Feild should not be empty");
      }
      
      let resData;
      if(!updatePassword) {
        if(formData.password) {
          let {password, ...rest} = formData;
          resData = rest
        }
      }
      const res = await fetch(`/api/user/update/${currentUser.data._id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(resData ? resData : formData),
      });
      const data = await res.json();
      if (data.status === 401 || data.status === 500) {
        dispatch(updateUserFailure());
        return;
      }
      dispatch(updateUserSuccess(data));
      toast.success(data.message);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error.message);
    }
  }
  async function handleDeleteUser() {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/delete/${currentUser.data._id}`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.status === 401 || data.status === 500) {
        dispatch(deleteUserFailure());
        return;
      }
      dispatch(deleteUserSuccess(data));
      toast.success(data?.message);
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      toast.error(error?.message);
    }
  }

  const handleSignOutUser = async () => {
    dispatch(signOutUserStart());
    try {
      const res = await fetch("/api/user/sign-out");
      const data = await res.json();
      if (data.status === 200) {
        dispatch(signOutUserSuccess(data));
        toast.success(data?.message);
      } else {
        throw Error(data?.message);
      }
    } catch (e) {
      dispatch(signOutUserFailure());
      toast.error(e);
    }
  };
  const handleError = () => {
    toast.error("Error in getListings");
  };
  return (
    <div className="p-3 max-w-5xl mx-auto flex flex-wrap gap-10">
      <ToastContainer autoClose={2000} />
      {currentUser ? (
        <div className="flex-1 -ml-5">
          <h1 className="text-center font-semibold text-3xl my-5">Profile</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setfile(e.target.files[0])}
              type="file"
              ref={fileRef}
              accept="image/*"
              hidden
            />
            {formData.photo && (
              <img
                onClick={() => fileRef.current.click()}
                src={formData.photo}
                alt="profile"
                className="border-solid border-white border-8 cursor-pointer mt-2 w-24 h-24 rounded-full self-center object-cover"
              />
            )}
            {fileError ? (
              <span className="text-red-700 text-center text-sm">
                Image upload error(image size must be less then 2MB)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700 text-center text-sm">{`upload ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="text-green-700 text-center text-sm">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
            <input
              type="text"
              placeholder="Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-orange-300"
            />
            <input
              type="text"
              placeholder="Username"
              id="username"
              required
              value={formData.username}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-orange-300"
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="border p-3 rounded-lg outline-orange-300"
            />
            {!updatePassword ? (
              <button
                className="text-blue-700 w-full text-left text-sm"
                onClick={() => setUpdatePassword(true)}
              >
                Update Password ?
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                  required={updatePassword}
                  className="border p-3 rounded-lg outline-orange-300"
                />
                <button
                  className="text-blue-700 w-full text-left text-sm"
                  onClick={() => {
                    setUpdatePassword(false);
        
                  }}
                >
                  D'not want to Update password ?
                </button>
              </>
            )}

            <button
              type="submit"
              className="uppercase text-white p-3 bg-slate-700 rounded-lg"
              disabled={loading}
            >
              {loading ? "Loading..." : "Update"}
            </button>
            <Link
              className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
              to={"/create-listing"}
            >
              Create Listing
            </Link>
          </form>
          <div className="flex justify-between mt-2 font-semibold">
            <span
              className="text-red-700 capitalize cursor-pointer"
              onClick={handleDeleteUser}
            >
              Delete acoount
            </span>
            <span
              className="text-red-700 capitalize cursor-pointer"
              onClick={handleSignOutUser}
            >
              Sign out
            </span>
          </div>
          <p className="text-red-700 mt-5">{error ? error : ""}</p>
        </div>
      ) : null}
      <div className="flex-1">
        {/* <p className='text-green-700 text-center mt-2 cursor-pointer' onClick={() => setShowListing(!showListings)}>Show Listings</p> */}
        {showListings ? <ShowListings handleError={handleError} /> : null}
      </div>
    </div>
  );
}

export default Profile;
