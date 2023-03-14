import React from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdMarkEmailRead, MdDashboard } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";

const Settings = () => {
  let navigate = useNavigate();

  let settingsList = [
    {
      title: "Collaborators & Team",
      desc: "Add members to manage",
      icon: <BsFillPeopleFill className="text-xl text-purple-500" />,
      link: "/settings/collaborators",
    },
    {
      title: "Approver Dashboard",
      desc: "Manage your approvers",
      icon: <MdDashboard className="text-xl text-purple-500" />,
      link: "/settings/approver",
    },
    {
      title: "Email Settings",
      desc: "Add your sender email",
      icon: <MdMarkEmailRead className="text-xl text-purple-500" />,
      link: "/settings/email",
    },
  ];

  /* This is checking if the user is already logged in. If the user is logged in, it will redirect to
  the dashboard. */
  let user = localStorage.getItem("owner");
  if (!user) {
    console.log("user not found");
    return <Navigate to="/login" />;
  }

  return (
    <div className="m-4">
      <h2 className="text-xl font-semibold mb-2">Settings</h2>
      <p className="text-sm ">Manage BoloForms settings from here.</p>
      <div className="w-full mt-6 flex flex-row flex-wrap">
        {settingsList.map((settings, i) => (
          <div
            onClick={() => navigate(settings.link)}
            className="w-[400px] mb-4 mr-4 py-6 px-12 flex flex-row items-center bg-gray-100 border rounded-lg overflow-hidden cursor-pointer hover:opacity-60"
          >
            <div className="mr-6">{settings.icon}</div>
            <div>
              <h2 className="text-sm font-medium mb-1">{settings.title}</h2>
              <p className="text-xs">{settings.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
