import TicketCreation from "../pages/TicketCreation";
import ViewTicket from "../pages/ViewTicket";
import TrackTicket from "../pages/TrackTicket";
import Home from "../pages/Home";
import Tickets from "../pages/Tickets";
import Account from "../pages/Account";

const routes = [
  { path: "/home", exact: true, name: "Home", element: Home, Exact: true },
  {
    path: "/tickets",
    name: "Tickets",
    element: Tickets,
    exact: true,
  },
  {
    path: "/create-ticket",
    name: "Create Ticket",
    element: TicketCreation,
    exact: true,
  },
  {
    path: "/update-ticket/:id",
    name: "Update Ticket",
    element: TicketCreation,
    exact: true,
  },
  {
    path: "/view-ticket/:id",
    name: "View Ticket",
    element: ViewTicket,
    exact: true,
  },

  {
    path: "/track-ticket",
    name: "Track Ticket",
    element: TrackTicket,
    exact: true,
  },

  {
    path: "/account",
    name: "Account",
    element: Account,
    exact: true,
  },
];

export default routes;
