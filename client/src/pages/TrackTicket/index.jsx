import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../constants/constants";

const TrackTicket = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  let location = useLocation();
  const [ticketId, setTicketId] = React.useState("");
  const [ticket, setTicket] = React.useState("");

  const getTicket = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tickets/${ticketId}`);
      console.log(response.data);
      setTicket(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="w-[60%] p-6 ">
      <h1 className="text-2xl text-gray-800 font-light">Track Ticket</h1>
      <div className="mt-4 ">
        <label
          htmlFor="ticketId"
          className=" block text-gray-700 text-sm font-bold mb-2"
        >
          Enter Ticket ID
        </label>
        <input
          type="text"
          name="ticketId"
          id="ticketId"
          className="w-[40%] text-sm border rounded-md p-2"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />
      </div>

      <button
        onClick={() => {
          location.pathname === "/track"
            ? getTicket()
            : navigate(`/view-ticket/${ticketId}`);
        }}
        className="bg-gray-700 text-sm flex justify-center items-center text-white px-4 py-2 rounded-md mt-4"
      >
        Track
      </button>

      {ticket && (
        <div className="mt-6 pb-4">
          <div className="mx-auto py-4 bg-white p-4 shadow rounded-md">
            <div className="flex justify-between">
              <h1 className="text-2xl text-gray-800 font-light">Ticket</h1>
              {location.pathname !== "/track" && (
                <button
                  onClick={() => {
                    navigate(`/update-ticket/${id}`);
                  }}
                  className="bg-gray-700 text-sm flex justify-center items-center text-white px-4 py-2 rounded-md"
                >
                  Update
                </button>
              )}
            </div>

            <div className="mt-4 ">
              <label
                htmlFor="ticketId"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Ticket ID
              </label>
              <p
                onClick={() => {
                  navigator.clipboard.writeText(ticket.id);
                  toast.success("Copied to clipboard");
                }}
                className="cursor-pointer w-fit mb-4 text-white text-[10px] border rounded py-1 px-3 bg-gray-700"
              >
                #{ticket.id}
              </p>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <p className="w-fit mb-4  text-sm text-gray-700">
                {ticket.title ?? "No Subject"}
              </p>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <p className="w-fit mb-4  text-sm text-gray-700">
                {ticket.description ?? "No Description"}
              </p>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="issueDate"
              >
                Issue Date
              </label>
              <p className="w-fit mb-4  text-sm text-gray-700">
                {ticket?.createdAt
                  ? new Date(ticket?.createdAt).toString()
                  : "No Date"}
              </p>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <p className="w-fit mb-4 text-white text-[10px] border rounded py-1 px-3 bg-red-500 capitalize">
                {ticket.status ?? "open"}
              </p>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="priority"
              >
                Priority
              </label>
              <p className="w-fit mb-4 text-white text-[10px] border rounded py-1 px-3 bg-gray-700 capitalize">
                {ticket.priority ?? "low"}
              </p>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="type"
              >
                Deadline Date
              </label>
              <p className="w-fit mb-4  text-sm text-gray-700">
                {ticket.deadline ?? "-"}
              </p>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="assignee"
              >
                Assignee
              </label>
              <p className="w-fit mb-4  text-sm text-gray-700">
                {ticket.assignedTo ?? "No Assignee"} (
                <span className="text-blue-500">
                  <a href={`mailto:${ticket.assignee}`}>
                    {ticket.assignedTo ?? "No Assignee"}
                  </a>
                </span>
                )
              </p>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="createdBy"
              >
                Created By
              </label>
              <p className="w-fit mb-4  text-sm text-gray-700">
                {ticket.createdBy ?? "-"}{" "}
                {ticket.createdBy && (
                  <span className="text-blue-500">
                    (
                    <a href={`mailto:${ticket.createdBy}`}>
                      {ticket.createdBy}
                    </a>
                    )
                  </span>
                )}
              </p>
            </div>
          </div>
          <ToastContainer
            theme="dark"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
          />
        </div>
      )}
    </div>
  );
};

export default TrackTicket;
