import React, { useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import AppContent from "../components/AppContent";

const DefaultLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-row h-screen w-full overflow-hidden">
      <div>
        <SideBar setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
      <div
        style={{
          width: window.innerWidth <= 425 ? "100%" : "calc(100% - 70px)", // todo fix this for open sidebar
        }}
        className="relative"
      >
        <NavBar setIsOpen={setIsOpen} isOpen={isOpen} />
        <div
          style={{
            height: "calc(100vh - 70px)",
          }}
          className="mt-[70px] w-full xs:p-4 overflow-y-auto"
        >
          <div className="w-full h-full">
            {/* need to remove */}
            {/* <div className="bg-black -mx-4 -mt-4 h-10 text-white flex items-center justify-center text-xs">
              <h2>
                Approver dashboard is here! ✨
                <a
                  href="https://approval-docs.boloforms.com/approver-dashboard"
                  target="_blank"
                  className="text-blue-200 underline ml-2"
                >
                  Learn more
                </a>{" "}
              </h2>
            </div> */}
            {/* place for app content  */}
            <AppContent />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
