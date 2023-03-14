import axios from "axios";
import { BASE_URL } from "../constants/constants";

export const isAdminPermission = async (owner = null) => {
  if (!owner) {
    owner = await fetchOwner();
  }

  let currentUserEmail =
    localStorage.getItem("currentUserEmail") ?? owner?.emails?.[0];

  let collaborator = owner?.collaborators?.find(
    (c) => c.email === currentUserEmail
  );

  return currentUserEmail === owner?.emails?.[0]
    ? true
    : collaborator?.role === "admin";
};

export const getCollaboratorPermission = async (owner) => {
  if (!owner) {
    owner = await fetchOwner();
  }

  let currentUserEmail =
    localStorage.getItem("currentUserEmail") ?? owner?.emails?.[0];

  let collaborator = owner?.collaborators?.find(
    (c) => c.email === currentUserEmail
  );

  return collaborator;
};

export const fetchOwner = async () => {
  let user = JSON.parse(localStorage.getItem("owner"));
  try {
    let { data } = await axios.get(`${BASE_URL}/owners?id=${user._id}`);
    return data.owner;
  } catch (error) {
    console.log(error);
  }
};

// generate unique id
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
