import React, { Fragment, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsTwitter, BsLinkedin, BsFacebook } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";
import { connect } from "react-redux";
import { fetchOwner } from "../../redux/actions/OwnerAction";
import { BASE_URL } from "../../constants/constants";
import axios from "axios";

const Modal = ({ helpers }) => {
  let { setModal, database, setDatabase, modalType, type } = helpers;

  const [category, setCategory] = React.useState("");
  const [assignee, setAssignee] = React.useState({
    type: "",
    email: "",
  });

  const updateDatabase = async () => {
    try {
      let newDatabase = {
        ...database,
      };

      let newCategories = [...newDatabase.categories];
      let newAssignees = [...newDatabase.assignees];

      if (modalType === "category") {
        newCategories.push(category);
      } else {
        let assignee_ = {};
        assignee_[assignee.type] = assignee.email;
        newAssignees.push(assignee_);
      }
      newDatabase.categories = newCategories;
      newDatabase.assignees = newAssignees;
      setDatabase(newDatabase);
      const response = await axios.put(`${BASE_URL}/databases/`, newDatabase);
      console.log(response.data);
      setModal((prev) => {
        return {
          ...prev,
          status: false,
        };
      });
      setCategory("");
      setAssignee({
        type: "",
        email: "",
      });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.4)",
        zIndex: 100,
      }}
      className="w-full h-screen fixed inset-0 flex sm:justify-center sm:items-center overflow-y-auto"
    >
      <div
        className={`${"w-fit"} w-[700px] relative bg-white sm:rounded-xl px-8 py-5 overflow-y-auto`}
      >
        {type === "create" ? (
          <div id="form-container" className="w-full mt-6 flex flex-col">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">
                {modalType === "category"
                  ? "Create Category"
                  : "Create Assignee"}
              </h1>
            </div>
            <p className="mt-3 text-xs">
              {modalType === "category"
                ? "Create a new category"
                : "Create a new assignee"}
            </p>

            <div className="mt-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                {modalType === "category" ? "Category Name" : "Assignee Type"}
              </label>
              {modalType === "category" ? (
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="w-full text-sm border rounded-md p-2"
                  placeholder="Enter Category Name"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              ) : (
                <Fragment>
                  <div className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm mt-1 mb-3 bg-white">
                    <select
                      name="priority"
                      id="priority"
                      className="w-full outline-none"
                      value={assignee.type}
                      onChange={(e) =>
                        setAssignee((prev) => {
                          return {
                            ...prev,
                            type: e.target.value,
                          };
                        })
                      }
                    >
                      {database.categories.map((category) => {
                        return (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-sm font-bold mt-4 mb-2"
                  >
                    Assignee Email
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="w-full text-sm border rounded-md p-2"
                    placeholder="Enter Assignee Email"
                    value={assignee.email}
                    onChange={(e) =>
                      setAssignee((prev) => {
                        return {
                          ...prev,
                          email: e.target.value,
                        };
                      })
                    }
                  />
                </Fragment>
              )}
            </div>

            <div className="mt-8 flex flex-col-reverse sm:flex-row">
              <button
                onClick={() => {
                  setModal((prev) => {
                    return {
                      ...prev,
                      status: false,
                    };
                  });
                }}
                className="w-full border-red-600 mt-2 sm:mt-0 border-2 text-sm px-8 py-2.5 rounded-xl shadow hover:opacity-80"
              >
                Close
              </button>
              <button
                id="approve-btn"
                onClick={updateDatabase}
                className="w-full bg-[#262626] text-sm text-white px-8 py-3 rounded-xl shadow ml-2 hover:opacity-80"
              >
                {modalType === "category"
                  ? "Create Category"
                  : "Create Assignee"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">
                {modalType === "category"
                  ? "Delete Category"
                  : "Delete Assignee"}
              </h1>

              {modalType === "category" ? (
                <div className="mt-4">
                  {database.categories.map((category, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center bg-gray-100 border py-1.5 px-4 mb-2 rounded-md"
                      >
                        <label htmlFor="category">{category}</label>
                        <AiFillDelete
                          onClick={() => {
                            let newDatabase = { ...database };
                            let newCategories = [...newDatabase.categories];
                            newCategories.splice(index, 1);
                            newDatabase.categories = newCategories;
                            setDatabase(newDatabase);
                          }}
                          className="ml-auto text-xl text-red-500 cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4">
                  {database.assignees.map((assignee, index) => {
                    let key, value;
                    Object.entries(assignee).map(([key_, value_]) => {
                      key = key_;
                      value = value_;
                    });

                    return (
                      <div
                        key={index}
                        className="flex items-center bg-gray-100 border py-1.5 px-4 mb-2 rounded-md"
                      >
                        <label htmlFor="assignee">{`[${key}] - ${value}`}</label>
                        <AiFillDelete
                          onClick={() => {
                            let newDatabase = { ...database };
                            let newAssignees = [...newDatabase.assignees];
                            newAssignees.splice(index, 1);
                            newDatabase.assignees = newAssignees;
                            setDatabase(newDatabase);
                          }}
                          className="ml-auto text-xl text-red-500 cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="mt-8 flex flex-col-reverse sm:flex-row">
                <button
                  onClick={() => {
                    setModal((prev) => {
                      return {
                        ...prev,
                        status: false,
                      };
                    });
                  }}
                  className="w-full border-red-600 mt-2 sm:mt-0 border-2 text-sm px-8 py-2.5 rounded-xl shadow hover:opacity-80"
                >
                  Close
                </button>
                <button
                  id="approve-btn"
                  onClick={async () => {
                    const response = await axios.put(
                      `${BASE_URL}/databases/`,
                      database
                    );
                    console.log(response.data);
                    setModal((prev) => {
                      return {
                        ...prev,
                        status: false,
                      };
                    });
                  }}
                  className="w-full bg-[#262626] text-sm text-white px-8 py-3 rounded-xl shadow ml-2 hover:opacity-80"
                >
                  {modalType === "category"
                    ? "Update Categories"
                    : "Update Assignees"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
