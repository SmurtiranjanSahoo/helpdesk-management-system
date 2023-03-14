import axios from "axios";
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Modal from "../../components/Modal";
import { BASE_URL } from "../../constants/constants";

const TicketCreation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = React.useState({
    title: "",
    description: "",
    priority: "low",
    status: "open",
    assignedTo: "",
    tags: "",
    attachments: "",
    deadline: "",
  });

  const [database, setDatabase] = React.useState({});
  const [modal, setModal] = React.useState({
    status: false,
    modalType: "",
    type: "create",
  });

  const getTicket = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/tickets/${id}`);
      console.log(response.data);
      setTicket(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getDatabase = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/databases/`);
      console.log(response.data?.[0]);
      setDatabase(response.data?.[0]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (id) {
      getTicket(id);
    }
    getDatabase();
  }, []);

  const handleTicketCreation = async () => {
    try {
      // validation
      if (!ticket.title) return toast.error("Title is required");

      if (!ticket.description) return toast.error("Description is required");

      if (!ticket.assignedTo) return toast.error("Assignee is required");

      // regex to check email
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(ticket.assignedTo))
        return toast.error("Invalid Assignee Email");

      let { data } = await axios.post(`${BASE_URL}/tickets/`, {
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        assignedTo: ticket.assignedTo,
        createdBy: localStorage.getItem("currentUserEmail"),
        createdAt: new Date(),
        deadline: ticket.deadline,
        // tags: ticket.tags,
        // attachments: ticket.attachments,
      });
      console.log("dtata", data);
      toast.success("Ticket Created Successfully");
      setTicket({
        title: "",
        description: "",
        priority: "low",
        status: "open",
        assignedTo: "",
        tags: "",
        attachments: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTicketUpdate = async () => {
    try {
      // validation
      if (!ticket.title) return toast.error("Title is required");

      if (!ticket.description) return toast.error("Description is required");

      if (!ticket.assignedTo) return toast.error("Assignee is required");

      console.log(ticket.status);
      // regex to check email
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(ticket.assignedTo))
        return toast.error("Invalid Assignee Email");

      let { data } = await axios.put(`${BASE_URL}/tickets/${id}`, {
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        assignedTo: ticket.assignedTo,
        createdBy: ticket.createdBy,
        createdAt: ticket.createdAt,
        deadline: ticket.deadline ?? "",
        // tags: ticket.tags,
        // attachments: ticket.attachments,
      });
      console.log("dtata", data);
      toast.success("Ticket Updated Successfully");
      // navigate("/tickets");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl text-gray-800 font-light mb-6">
        Ticket {id ? "Update" : "Creation"}
      </h1>

      <div className="w-full flex flex-row">
        <div className="flex flex-col w-full mr-2">
          <label className="text-sm" htmlFor="title">
            Category
          </label>
          <div className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm mt-1 bg-white">
            <select
              name="priority"
              id="priority"
              className="w-full outline-none"
              value={ticket.title}
              onChange={(e) => {
                let value = null;
                database?.assignees?.map((assignee) => {
                  let key = Object.keys(assignee)[0];
                  if (key === e.target.value) {
                    value = Object.values(assignee)[0];
                  }
                });

                setTicket({
                  ...ticket,
                  title: e.target.value,
                  assignedTo: value ?? "",
                });
              }}
            >
              <option value="">Select Category</option>
              {database?.categories?.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <p
              onClick={() => {
                setModal({
                  status: true,
                  modalType: "category",
                  type: "create",
                });
              }}
              className="mt-1 mb-3 text-xs text-blue-500 px-1 cursor-pointer"
            >
              Create new category
            </p>
            <p
              onClick={() => {
                setModal({
                  status: true,
                  modalType: "category",
                  type: "delete",
                });
              }}
              className="mt-1 mb-3 text-xs text-red-500 px-1 cursor-pointer"
            >
              Delete category
            </p>
          </div>
          <label className="text-sm" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="8"
            className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm mt-1 mb-3"
            value={ticket.description}
            onChange={(e) =>
              setTicket({ ...ticket, description: e.target.value })
            }
          ></textarea>

          <label className="text-sm" htmlFor="priority">
            Priority
          </label>
          <div className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm mt-1 mb-3 bg-white">
            <select
              name="priority"
              id="priority"
              className="w-full outline-none"
              value={ticket.priority}
              onChange={(e) =>
                setTicket({ ...ticket, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col w-full ml-2">
          <label className="text-sm" htmlFor="status">
            Status
          </label>
          <div className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm mt-1 mb-3 bg-white">
            <select
              name="status"
              id="status"
              className="w-full outline-none"
              value={ticket.status}
              onChange={(e) => {
                console.log(e.target.value);
                setTicket({ ...ticket, status: e.target.value });
              }}
            >
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <label className="text-sm" htmlFor="assignedTo">
            Assignee
          </label>

          <div className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm mt-1 bg-white">
            <select
              name="assignedTo"
              id="assignedTo"
              className="w-full outline-none"
              value={ticket.assignedTo}
              onChange={(e) =>
                setTicket({ ...ticket, assignedTo: e.target.value })
              }
            >
              <option value="">Select Assignee</option>
              {database?.assignees?.map((assignee) => {
                let key, value;
                Object.entries(assignee).map(([key_, value_]) => {
                  key = key_;
                  value = value_;
                });

                return <option value={value}>{`[${key}] - ${value}`}</option>;
              })}
            </select>
          </div>
          <div className="flex justify-between">
            <p
              onClick={() => {
                setModal({
                  status: true,
                  modalType: "assignee",
                  type: "create",
                });
              }}
              className="mt-1 mb-3 text-xs text-blue-500 px-1 cursor-pointer"
            >
              Create new assignee
            </p>
            <p
              onClick={() => {
                setModal({
                  status: true,
                  modalType: "assignee",
                  type: "delete",
                });
              }}
              className="mt-1 mb-3 text-xs text-red-500 px-1 cursor-pointer"
            >
              Delete assignee
            </p>
          </div>
          <label className="text-sm" htmlFor="tags">
            Deadline Date
          </label>
          <input
            className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm mt-1 mb-3"
            type="date"
            name="date"
            id="date"
            value={ticket.deadline}
            onChange={(e) => setTicket({ ...ticket, deadline: e.target.value })}
          />
          <label className="text-sm" htmlFor="tags">
            Tags
          </label>
          <input
            className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm mt-1 mb-3"
            type="text"
            name="tags"
            id="tags"
            value={ticket.tags}
            onChange={(e) => setTicket({ ...ticket, tags: e.target.value })}
          />

          {/* <label className="text-sm" htmlFor="attachments">
            Attachments
          </label>
          <input
            type="file"
            name="attachments"
            id="attachments"
            multiple
            className="w-full p-2 rounded-md border focus:border-gray-700 focus:outline-none text-sm mt-1 mb-3"
            value={ticket.attachments}
            onChange={(e) =>
              setTicket({ ...ticket, attachments: e.target.files })
            }
          /> */}

          <button
            onClick={id ? handleTicketUpdate : handleTicketCreation}
            className="p-2 m-2 bg-gray-700 rounded-md text-white"
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      {modal.status && (
        <Modal
          helpers={{
            setModal,
            database,
            setDatabase,
            modalType: modal.modalType,
            type: modal.type,
          }}
        />
      )}
    </div>
  );
};

export default TicketCreation;
