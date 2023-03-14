import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";
import { IoRocketSharp, IoMenuSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import { RiWhatsappFill } from "react-icons/ri";
import { connect } from "react-redux";
import { fetchOwner } from "../../redux/actions/OwnerAction";

const NavBar = ({ setIsOpen, fetchOwner, owner }) => {
  let location = useLocation();
  const navbarRef = useRef();

  // const [owner, setOwner] = useState({});
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [accountType, setAccountType] = useState(null);

  const getProfilePhoto = () => {
    let profilePicUrl =
      owner?.profilePic ??
      "https://lh3.googleusercontent.com/a/AEdFTp5t4OlCVgrF7r_kwe-MZeJJpgpPwt-kARTawPPq=s96-c";

    return profilePicUrl;
  };

  const getProfileName = () => {
    let name = owner?.name;
    // console.log(profilePicUrl);
    return name?.split(" ")?.[0] ?? "User";
  };

  const handleOutsideClick = (e) => {
    if (navbarRef.current !== null) {
      if (navbarRef.current.contains(e.target)) return;
    }
    setShowProfileOptions(false);
  };

  useEffect(() => {
    let owner = JSON.parse(localStorage.getItem("owner"));
    // setOwner(owner);
    // console.log(owner);
    fetchOwner();
    setCurrentUserEmail(
      localStorage.getItem("currentUserEmail") ?? owner?.emails?.[0]
    );

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    let accountType = localStorage.getItem("accountType");

    accountType = accountType === "admin" ? "Owner" : accountType;
    // let accountType =
    //   currentUserEmail === owner?.emails?.[0]
    //     ? "Owner"
    //     : owner?.collaborators?.find((c) => c.email === currentUserEmail).role;

    setAccountType(accountType);
  }, [owner]);

  return (
    <div
      className={`absolute top-0 left-0 w-full h-[70px] px-4 xs:px-6 bg-[#262626] text-white flex items-center justify-between`}
    >
      <div
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="xs:hidden"
      >
        <IoMenuSharp className="text-2xl" />
      </div>
      <h1 className="capitalize text-sm xs:text-base  ml-4 xs:ml-0 mr-auto  xs:mx-auto">
        {location.pathname.slice(1)?.split("/")[0]?.replace("-", " ")}
      </h1>
      {/* <div className="mr-2 sm:mr-4 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center">
        Quota:{" "}
        <span className="bg-gray-700  mt-1 sm:mt-0 text-white px-2 py-[2px] sm:px-4 sm:py-1 rounded-md sm:ml-2 font-light text-[10px] sm:text-xs">
          {owner?.planhistory?.[owner?.planhistory?.length - 1]?.usedQuanity[0]}
          /
          {
            owner?.planhistory?.[owner?.planhistory?.length - 1]
              ?.usageQuantityAllowed[0]
          }
        </span>
      </div> */}
      <div ref={navbarRef} className="relative">
        <div
          onClick={() => setShowProfileOptions((prev) => !prev)}
          className="flex flex-row items-center justify-center hover:bg-gray-700 p-1 rounded-md cursor-pointer"
        >
          <div className="w-10 h-10 bg-white rounded-full mr-2 overflow-hidden border border-gray-600">
            <img
              src={getProfilePhoto()}
              alt="profile"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="text-sm capitalize">{getProfileName()}</p>
            <span className="text-[8px] bg-green-300 px-3 py-1 text-gray-700 rounded-md capitalize">
              {`Admin`}
            </span>
          </div>
        </div>
        {showProfileOptions && (
          <ProfileOptions setShowProfileOptions={setShowProfileOptions} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    owner: state.OwnerReducer.owner,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOwner: () => dispatch(fetchOwner()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

const ProfileOptions = ({ setShowProfileOptions }) => {
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUserEmail");

    window.location.href = "/login";
  };

  function openExternalLink(link) {
    window.open(link, "_blank");
    setShowProfileOptions(false);
  }

  return (
    <div className="w-[170px] border absolute z-50 top-0 right-0 mt-[50px] ml-2 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-y-auto">
        <div
          onClick={() =>
            openExternalLink("https://approval-docs.boloforms.com/")
          }
          className="py-4 px-3 text-xs text-gray-700 flex flex-row items-center hover:bg-gray-50 cursor-pointer"
        >
          <IoIosHelpCircle className="text-lg mr-3 text-gray-600" />
          <div>Help & Docs</div>
        </div>

        <div
          onClick={logOut}
          className="border-t py-4 px-3 text-xs text-gray-700 flex flex-row items-center hover:bg-gray-50 cursor-pointer"
        >
          <FiLogOut className="text-lg mr-3 text-gray-600" />
          <div>Log Out</div>
        </div>
      </div>
    </div>
  );
};
