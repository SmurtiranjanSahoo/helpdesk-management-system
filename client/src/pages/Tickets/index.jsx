import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdArchive,
} from "react-icons/md";
import { BiLink } from "react-icons/bi";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { IoCopy } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { AiFillSetting } from "react-icons/ai";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";
import { useNavigate, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = React.useState([]);
  const [currentTickets, setCurrentTickets] = React.useState({
    page: 1,
    tickets: [],
    limit: 10,
  });
  const [searchText, setSearchText] = React.useState("");
  const [tableData, setTableData] = React.useState({
    columns: [
      {
        Header: "Ticket ID",
        accessor: "ticketId",
      },
      {
        Header: "Subject",
        accessor: "subject",
      },
    ],
    data: [
      {
        ticketId: "123",
        subject:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates, quod, quia, voluptate quae voluptatem quibusdam quos accusantium quas dolorum voluptatum. Quisquam, quae. Quisquam, quae.",
      },
    ],
  });

  const getTickets = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tickets/`);
      console.log(response.data);
      setTickets(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const searchTickets = async (e) => {
    try {
      e.preventDefault();
      if (searchText?.trim()?.length === 0) return;
      const response = await axios.get(
        `${BASE_URL}/tickets/search/${searchText}`
      );
      console.log(response.data);
      setTickets(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getTicketsByStatus = async (status) => {
    try {
      setCurrentTickets((prev) => ({ ...prev, page: 1 }));
      if (status === "all") {
        return getTickets();
      }

      const response = await axios.get(
        `${BASE_URL}/tickets/searchByStatus/${status}`
      );
      console.log(response.data);
      setTickets(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
      case "closed":
        return "bg-green-500";
      default:
        return "bg-gray-600";
    }
  };

  useEffect(() => {
    if (searchText?.trim()?.length === 0) {
      getTickets();
    }
  }, [searchText]);

  useEffect(() => {
    getTickets();
  }, []);

  React.useEffect(() => {
    console.log("useMemo");
    let currentTickets_ = tickets.slice(
      (currentTickets.page - 1) * currentTickets.limit,
      currentTickets.page * currentTickets.limit
    );
    // setCurrentTickets((prev) => ({ ...prev, tickets: currentTickets_ }));
    setTableData({
      columns: [
        {
          Header: "Ticket ID",
          accessor: "ticketId",
        },
        {
          Header: "Category",
          accessor: "subject",
        },
        {
          Header: "Created At",
          accessor: "createdAt",
        },
        {
          Header: "Status",
          accessor: "status",
        },
      ],
      data: currentTickets_.map((ticket) => {
        return {
          id: ticket.id,
          ticketId: (
            <p className="w-[180px] text-white text-[10px] border rounded py-1 px-3 bg-gray-700">
              #{ticket.id}
            </p>
          ),
          subject: ticket.title ?? "No Subject",
          createdAt:
            new Date(ticket.createdAt).toDateString() ??
            new Date().toDateString(),
          status: (
            <p
              className={`w-fit text-white text-[10px] border rounded py-1 px-3  capitalize ${getStatusColor(
                ticket.status
              )}`}
            >
              {ticket.status ?? "open"}
            </p>
          ),
        };
      }),
    });
  }, [tickets, currentTickets]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: tableData.columns ?? [], data: tableData.data ?? [] });

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl text-gray-800 font-light">Tickets</h1> */}
      <div className=" bg-white border rounded-lg shadow overflow-hidden mb-12">
        <div className="py-3 px-3 text-gray-700 flex flex-row  items-center border-b">
          <div className=" py-2 px-3 border bg-gray-100 rounded-md">
            <select
              className="w-[100px] h-full text-sm bg-gray-100 outline-none "
              onChange={(e) => getTicketsByStatus(e.target.value)}
              // value={filter}
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <form onSubmit={searchTickets} className="w-full px-3">
            <div className="w-full flex flex-row border rounded-md overflow-hidden">
              <input
                placeholder="Search by ticket subject..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full py-2 px-4   outline-none text-gray-700 "
              />
              <button
                className="py-2 px-4 bg-gray-700 text-white cursor-pointer hover:opacity-90 "
                onClick={searchTickets}
              >
                <span className="">Search</span>
              </button>
            </div>
          </form>
          <div className="flex flex-row h-full text-gray-700">
            <button
              onClick={() =>
                setCurrentTickets((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              disabled={currentTickets.page == 1}
              className="border p-3 bg-gray-100 hover:bg-gray-200 cursor-pointer hover:opacity-90 rounded-l-md"
            >
              <MdOutlineArrowBackIos />
            </button>
            <button
              onClick={() => {
                setCurrentTickets((prev) => ({ ...prev, page: prev.page + 1 }));
              }}
              disabled={
                currentTickets.page * currentTickets.limit >= tickets.length
              }
              className="border p-3 bg-gray-100 hover:bg-gray-200 cursor-pointer hover:opacity-90 rounded-r-md"
            >
              <MdOutlineArrowForwardIos />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="w-full">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className={`${
                        column.name === "#" ? "" : "min-w-[150px] max-w-[300px]"
                      } px-3 py-3 text-left text-gray-600 font-medium text-xs bg-gray-100 truncate`}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);

                return (
                  <tr
                    {...row.getRowProps()}
                    onClick={() => {
                      console.log("row", row.original.id);
                      navigate(`/view-ticket/${row.original.id}`);
                    }}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className={`${
                            cell.column.name === "#"
                              ? ""
                              : "min-w-[150px] max-w-[300px]"
                          } px-3 py-3 border-t text-sm truncate`}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {tickets?.length === 0 ? (
          <div className="w-full flex flex-col items-center py-12 text-gray-600">
            <div className="mb-4">
              <FiSearch className="text-5xl" />
            </div>
            <p className="text-sm">No tickets found!</p>
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center px-5 py-3 border-t-2">
            <div>
              <button
                onClick={() =>
                  setCurrentTickets((prev) => ({
                    ...prev,
                    page: prev.page - 1,
                  }))
                }
                disabled={currentTickets.page == 1}
                className="mr-2 py-2 px-4 border rounded-md text-sm font-medium border-gray-300 text-gray-500 cursor-pointer hover:opacity-90 "
              >
                Previous
              </button>
              <button
                onClick={() => {
                  setCurrentTickets((prev) => ({
                    ...prev,
                    page: prev.page + 1,
                  }));
                }}
                disabled={
                  currentTickets.page * currentTickets.limit >= tickets.length
                }
                className="py-2 px-4 border rounded-md text-sm font-medium border-gray-300 text-gray-500 cursor-pointer hover:opacity-90 "
              >
                Next
              </button>
            </div>
            <div className="text-gray-500 text-sm">
              {" "}
              Showing {currentTickets.page * currentTickets.limit - 9} to{" "}
              {currentTickets.page * currentTickets.limit} of {tickets.length}{" "}
              entries
            </div>
          </div>
        )}
        <ToastContainer theme="dark" position="bottom-right" />
      </div>
    </div>
  );
};

export default Tickets;
