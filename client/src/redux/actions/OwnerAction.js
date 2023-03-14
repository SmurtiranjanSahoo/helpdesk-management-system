import {
  FETCH_OWNER_BEGIN,
  FETCH_OWNER_FAILURE,
  FETCH_OWNER_SUCCESS,
} from "../constants/constants";
import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const fetchOwner = () => {
  return async (dispatch) => {
    dispatch(fetchOwnerBegin());
    let user = JSON.parse(localStorage.getItem("owner"));

    try {
      let { data } = await axios.get(`${BASE_URL}/owners?id=${user._id}`);
      //   console.log("owner data", data);
      dispatch(fetchOwnerSuccess(data.owner));
    } catch (error) {
      dispatch(fetchOwnerFailure(error.message));
      console.log(error);
    }
  };
};

export const fetchOwnerBegin = () => ({
  type: FETCH_OWNER_BEGIN,
});

export const fetchOwnerSuccess = (owner) => ({
  type: FETCH_OWNER_SUCCESS,
  payload: owner,
});

export const fetchOwnerFailure = (error) => ({
  type: FETCH_OWNER_FAILURE,
  payload: error,
});
