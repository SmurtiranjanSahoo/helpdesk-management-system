import React, { useEffect } from "react";
import "./index.css";
import { useNavigate, Navigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../constants/constants";
import { IoPeopleCircleOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = React.useState("admin");
  const [loginDetails, setLoginDetails] = React.useState({
    email: "raj@g.com",
    password: "raj@123",
    role: "ADMIN",
  });

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/users/signin`, {
        email: loginDetails.email,
        password: loginDetails.password,
        role: loginDetails.role,
      });
      console.log(data);
      data.password = null;
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("userType", userType);
      localStorage.setItem("currentUserEmail", data.email);

      toast.success("Login Successful");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    setUserType(
      searchParams.get("type") === "collaborator" ? "collaborator" : "admin"
    );
  }, []);

  /* This is checking if the user is already logged in. If the user is logged in, it will redirect to
  the dashboard. */
  let user = localStorage.getItem("user");
  if (user) {
    console.log("user found");
    return <Navigate to="/home" />;
  }

  return (
    <div className="login-wrapper w-full h-screen flex flex-col items-center justify-center bg-gray-200">
      {/* <div className="absolute right-0 bottom-0 mb-8 h-[55%]">
        <img
          className="h-full"
          src="https://internal-images.s3.ap-south-1.amazonaws.com/login/undraw_active_support_re_b7sj.svg"
        />
      </div> */}
      {/* <div className="absolute left-0 bottom-0 mb-8 h-[55%]">
        <img
          className="h-full"
          src="https://internal-images.s3.ap-south-1.amazonaws.com/login/undraw_things_to_say_re_jpcg.svg"
        />
      </div> */}
      <div className="login-card-container flex flex-row w-full h-full xs:h-fit  xs:w-[400px] xs:rounded-xl overflow-hidden relative z-10">
        <div className="w-full px-2 sm:px-3 py-8 flex flex-col ">
          <div className="pb-8 w-full h-full flex flex-col justify-end items-center  text-black">
            <div className="flex flex-row items-center mb-2">
              <img
                src="https://images.pexels.com/photos/323503/pexels-photo-323503.jpeg"
                className="w-[90px] h-[90px] object-cover rounded-full"
                alt="Logo"
              />
            </div>
            <div className="mb-2">
              <h2 className="text-lg font-medium ">Helpdesk</h2>
              {/* <p className="text-xs -mt-1">By BoloForms</p> */}
            </div>
            <p className="text-xs">
              Sign in to your account to continue to Helpdesk
            </p>
          </div>
          <hr className="-mx-4" />
          <div className=" pt-4 w-full h-full flex flex-col justify-start items-center">
            <div className="w-full  flex flex-col p-3">
              <div
                onClick={() => {
                  setUserType("admin");
                }}
                className={`${
                  userType === "admin" ? "border-gray-700" : "border-gray-200"
                } mb-3 bg-gray-50 w-full p-3 rounded-md border  flex flex-col cursor-pointer`}
              >
                <div className="w-full flex items-center">
                  <FaUserTie className="text-gray-700" />
                  <label className="ml-2 mr-6 text-sm">Admin</label>
                  <input
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox1"
                    value="admin"
                    label="Owner"
                    checked={userType === "admin" ? true : false}
                    onChange={(e) => setUserType(e.target.value)}
                    className="ml-auto"
                  />
                </div>
                <div className="pl-6">
                  <p className="text-xs text-gray-500">
                    Admins can create and manage support tickets.
                  </p>
                </div>
              </div>
              {/* <div
                onClick={() => {
                  setUserType("collaborator");
                }}
                className={`${
                  userType === "collaborator"
                    ? "border-gray-700"
                    : "border-gray-200"
                } mb-3 bg-gray-50 w-full p-3 rounded-md border  flex flex-col cursor-pointer`}
              >
                <div className="w-full flex items-center">
                  <IoPeopleCircleOutline className="text-gray-700 text-xl" />
                  <label className="ml-2 mr-6 text-sm">Collaborator</label>
                  <input
                    inline
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineCheckbox1"
                    value="collaborator"
                    label="Collaborator"
                    checked={userType === "collaborator" ? true : false}
                    onChange={(e) => setUserType(e.target.value)}
                    className="ml-auto"
                  />
                </div>
                <div className="pl-7">
                  <p className="text-xs text-gray-500">
                    View forms and collabrate with owners.
                  </p>
                </div>
              </div> */}
            </div>
            <div className="w-full flex flex-col px-3 pb-3">
              <div className="w-full flex flex-col">
                <label className="text-xs mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm"
                  placeholder="Enter your email"
                  value={loginDetails.email}
                  onChange={(e) => {
                    setLoginDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                />

                <label className="text-xs mt-3 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm"
                  placeholder="Enter your password"
                  value={loginDetails.password}
                  onChange={(e) => {
                    setLoginDetails((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                />

                <div className="flex flex-row items-center mt-4">
                  <button
                    onClick={handleLogin}
                    className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
                  >
                    Sign In
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500 text-center">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-500">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full">
          <img
            src="https://internal-images.s3.ap-south-1.amazonaws.com/approvals+Login+screen+image+(Poster+(Portrait))/1.png"
            alt="login img"
            className="h-full w-full"
          />
        </div> */}
      </div>
      <ToastContainer theme="dark" position="bottom-right" />
    </div>
  );
};

export default Login;
