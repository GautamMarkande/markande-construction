import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import { ToastContainer } from "react-toastify";
import Listing from "./pages/Listing";
import UpdateListing from "./pages/UpdateListing";
import Search from "./pages/Search";
import AboutContact from "./pages/Aboutcontact";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutContact />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <About />
    </BrowserRouter>
  );
}

export default App;
