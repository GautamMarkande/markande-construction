import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/Userslice";
import { useNavigate } from "react-router-dom";

function OAuth({ authFrom, from }) {
  const navigate = useNavigate(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  async function handlclick() {
    try {
      dispatch(signInStart());
      authFrom("google");
      const Provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, Provider);
      const res = await fetch("/api/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.status === 400 || data.status == 500) {
        signInFailure(data.error);
        throw new Error(data.error);
      }
      dispatch(signInSuccess(data));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error));
    }
  }
  return (
    <button
      className="bg-red-700 text-white p-3 rounded-lg uppercase"
      onClick={handlclick}
    >
      {from === "google" && state.loading ? "loading" : "continue with google"}
    </button>
  );
}

export default OAuth;
