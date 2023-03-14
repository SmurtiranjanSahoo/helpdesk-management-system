import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../constants/constants";

const Home = () => {
  const [analytics, setAnalytics] = React.useState({
    totalTickets: 0,
    totalOpenTickets: 0,
    totalPendingTickets: 0,
    totalClosedTickets: 0,
    totalHighPriorityTickets: 0,
    totalMediumPriorityTickets: 0,
    totalLowPriorityTickets: 0,
  });

  const getAnalytics = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/tickets/analytics`);
      console.log(data);
      setAnalytics(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);
  return (
    <div>
      <h1 className="text-2xl text-gray-800 font-light">Home</h1>

      <div className="mt-2">
        <p className="w-fit mb-10  text-sm text-gray-700">
          Welcome to the Ticketing System Dashboard. Here you can view the an
          overview of the tickets.
        </p>
        <div className="flex flex-wrap">
          <div className="border-2 w-[300px] h-[200px] rounded-lg bg-white flex flex-col  font-semibold mr-4 mb-4">
            <div className="p-4 border-b">
              <p className="text-sm">Total Tickets</p>
            </div>
            <div className="p-4 mt-4">
              <p className="text-5xl">{analytics.totalTickets}</p>
            </div>
            <p className="text-sm text-gray-500 p-4 text-right">Last 30 days</p>
          </div>
          <div className="border-2 w-[300px] h-[200px] rounded-lg bg-white flex flex-col  font-semibold mr-4 mb-4">
            <div className="p-4 border-b">
              <p className="text-sm">Tickets Closed</p>
            </div>
            <div className="p-4 mt-4">
              <p className="text-5xl text-green-500">
                {analytics.totalClosedTickets}
              </p>
            </div>
            <p className="text-sm text-gray-500 p-4 text-right">Last 30 days</p>
          </div>
          <div className="border-2 w-[300px] h-[200px] rounded-lg bg-white flex flex-col  font-semibold mr-4 mb-4">
            <div className="p-4 border-b">
              <p className="text-sm">Tickets Open</p>
            </div>
            <div className="p-4 mt-4">
              <p className="text-5xl text-red-500 ">
                {analytics.totalOpenTickets}
              </p>
            </div>
            <p className="text-sm text-gray-500 p-4 text-right">Last 30 days</p>
          </div>
          <div className="border-2 w-[300px] h-[200px] rounded-lg bg-white flex flex-col  font-semibold mr-4 mb-4">
            <div className="p-4 border-b">
              <p className="text-sm">Tickets Pending</p>
            </div>
            <div className="p-4 mt-4">
              <p className="text-5xl text-yellow-500">
                {analytics.totalPendingTickets}
              </p>
            </div>
            <p className="text-sm text-gray-500 p-4 text-right">Last 30 days</p>
          </div>
        </div>

        <h2 className="text-xl text-gray-800 font-light mt-10 mb-4">
          Priority Wise Tickets
        </h2>
        <div className="flex flex-wrap">
          <div className="border-2 w-[300px] rounded-lg bg-red-100 flex flex-col  font-semibold mr-4 mb-4">
            <div className="p-4">
              <p className="text-sm mb-2">High Priorty</p>
              <p className="text-5xl text-red-500">
                {analytics.totalHighPriorityTickets}
              </p>
            </div>
          </div>
          <div className="border-2 w-[300px] rounded-lg bg-yellow-100 flex flex-col  font-semibold mr-4 mb-4">
            <div className="p-4">
              <p className="text-sm mb-2">Medium Priorty</p>
              <p className="text-5xl text-yellow-500">
                {analytics.totalMediumPriorityTickets}
              </p>
            </div>
          </div>
          <div className="border-2 w-[300px] rounded-lg bg-green-100 flex flex-col  font-semibold mr-4 mb-4">
            <div className="p-4">
              <p className="text-sm mb-2">Low Priorty</p>
              <p className="text-5xl text-green-500">
                {analytics.totalLowPriorityTickets}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
