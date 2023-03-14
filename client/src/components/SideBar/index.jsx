import React, { useState, useEffect, Fragment } from "react";
import "./index.css";
import {
  MdSpaceDashboard,
  MdColorLens,
  MdMonetizationOn,
  MdSettings,
  MdStar,
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdAddTask,
  MdAccountCircle,
} from "react-icons/md";
import { ImHome } from "react-icons/im";
import { CgTrack } from "react-icons/cg";
import ReactTooltip from "react-tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import { isAdminPermission } from "../../utils";
import { BsPlusSquareFill } from "react-icons/bs";
import { HiTicket } from "react-icons/hi";

const SideBar = ({ isOpen, setIsOpen }) => {
  let navigate = useNavigate();
  let location = useLocation();
  let accounType = localStorage.getItem("accountType");
  const [isAdmin, setIsAdmin] = useState(false);

  let navItems = [
    {
      name: "Create Ticket",
      icon: <BsPlusSquareFill className="w-6 h-6" />,
      link: "/create-ticket",
      approver: false,
    },
    {
      name: "Home",
      icon: <ImHome className="w-6 h-6" />,
      link: "/home",
      approver: true,
    },
    {
      name: "Tickets",
      icon: <HiTicket className="w-6 h-6" />,
      link: "/tickets",
      // admin: true,
      approver: false,
    },
    {
      name: "Track Ticket",
      icon: <CgTrack className="w-6 h-6" />,
      link: "/track-ticket",
      admin: true,
      approver: false,
    },
    // {
    //   name: "Account",
    //   icon: <MdAccountCircle className="w-6 h-6" />,
    //   link: "/account",
    //   approver: false,
    // },
  ];

  useEffect(() => {
    (async () => {
      let isAdmin = await isAdminPermission();
      setIsAdmin(isAdmin);
    })();
  }, []);

  return (
    <div
      className={`h-screen relative bg-white transition-all duration-300 xs:border-r`}
      style={{
        zIndex: "100",
        width: isOpen ? "270px" : window.innerWidth <= 425 ? "0" : "70px",
      }}
    >
      {(window.innerWidth > 425 || isOpen) && (
        <Fragment>
          {" "}
          <div
            className={`absolute bottom-0 w-full h-14 flex ${
              isOpen ? "justify-end" : "justify-center"
            } items-center bg-[#262626] text-white`}
          >
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={`h-12 outline-none`}
            >
              {!isOpen ? (
                <MdOutlineArrowForwardIos className="text-xl" />
              ) : (
                <MdOutlineArrowBackIos className="text-xl mr-5" />
              )}
            </button>
          </div>
          {isOpen ? (
            <div className="h-[70px] p-1 flex items-start overflow-hidden">
              <img
                className="h-full object-fill scale-[2]"
                src="https://images.pexels.com/photos/323503/pexels-photo-323503.jpeg"
                alt="logo"
              />
            </div>
          ) : (
            <div className="h-[70px] p-2">
              <img
                className="h-full w-full object-cover rounded-full"
                src="https://images.pexels.com/photos/323503/pexels-photo-323503.jpeg"
                alt="logo"
              />
            </div>
          )}
          <div className="mt-0">
            {/* // Nav Items */}
            {navItems.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex items-center ${
                    isOpen ? "pl-5" : "justify-center"
                  } ${
                    location.pathname.includes(item.link)
                      ? "text-[#262626] bg-gray-100"
                      : "text-gray-700"
                  } py-3 cursor-pointer hover:text-[#262626] hover:bg-gray-100 transition-all duration-300`}
                  data-tip={item.name}
                  onClick={() =>
                    item.link.includes("http")
                      ? window.open(item.link, "_blank")
                      : navigate(item.link)
                  }
                >
                  <div className="w-10 h-10  flex items-center justify-center">
                    {item.icon}
                  </div>
                  {!isOpen && (
                    <ReactTooltip
                      place="right"
                      effect="solid"
                      globalEventOff="click"
                    />
                  )}
                  {isOpen && <p className="ml-3 text-sm fade">{item.name}</p>}
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default SideBar;
