import {
  FETCH_FORMS_BEGIN,
  FETCH_FORMS_SUCCESS,
  FETCH_FORMS_FAILURE,
} from "../constants/constants";

import axios from "axios";
import { BASE_URL } from "../../constants/constants";

export const fetchAllForms = (page, limit, filter = "ALL") => {
  return (dispatch) => {
    dispatch(fetchAllFormsBegin());
    let owner = JSON.parse(localStorage.getItem("owner"));
    let currentUserEmail =
      localStorage.getItem("currentUserEmail") ?? owner?.emails?.[0];
    let accountType = localStorage.getItem("accountType");

    const ownerId = owner?._id;

    axios
      .get(
        `${BASE_URL}/forms?page=${page}&limit=${limit}&filter=${filter}&ownerId=${ownerId}&currentUserEmail=${currentUserEmail}&accountType=${accountType}`
      )
      .then((response) => {
        dispatch(fetchAllFormsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchAllFormsFailure(error.message));
      });
  };
};

export const fetchAllFormsBegin = () => ({
  type: FETCH_FORMS_BEGIN,
});

export const fetchAllFormsSuccess = (List) => ({
  type: FETCH_FORMS_SUCCESS,
  payload: List,
});

export const fetchAllFormsFailure = (error) => ({
  type: FETCH_FORMS_FAILURE,
  payload: error,
});
