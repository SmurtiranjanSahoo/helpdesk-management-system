import React, { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./pages/Login";
// import PhoneCollectModal from "./components/PhoneCollectModal";
import { fetchOwner } from "./utils";
import Register from "./pages/Register";
import TrackTicket from "./pages/TrackTicket";

function App() {
  const [isShowPhoneCollection, setIsShowPhoneCollection] = useState(false);
  let location = useLocation();
  useEffect(() => {
    let owner = localStorage.getItem("owner");
    if (owner) {
      (async () => {
        owner = await fetchOwner();
        if (!owner?.phoneNumber) {
          console.log("show phone collection");
          setTimeout(() => {
            setIsShowPhoneCollection(true);
          }, 10000);
        }
      })();
    }
  }, [location.pathname]);

  return (
    <div className="bg-gray-50">
      <div className="main-container">
        <Routes>
          <Route path="*" name="Home" element={<DefaultLayout />} />
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={<Register />}
          />
          <Route
            exact
            path="/track/:id"
            name="Track Ticket"
            element={<TrackTicket />}
          />
          <Route
            exact
            path="/track"
            name="Track Ticket"
            element={<TrackTicket />}
          />
        </Routes>

        {/* {isShowPhoneCollection && (
        <PhoneCollectModal
          modalContent={
            <AccountInfo setIsShowPhoneCollection={setIsShowPhoneCollection} />
          }
        />
      )} */}
      </div>

      <div className="mobile-container px-4 h-screen flex flex-col justify-center items-center md:hidden">
        <h2 className="text-center text-2xl font-bold text-gray-500 mb-4">
          This app is not supported on mobile devices!
        </h2>
        <p className="text-center text-gray-500 text-sm ">
          Please use a desktop or laptop to access this app. This app is not yet
          optimized for mobile devices. because our customers are mostly using
          desktops and laptops.
        </p>
      </div>
    </div>
  );
}

export default App;
