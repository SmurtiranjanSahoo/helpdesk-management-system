import {
  FETCH_FORMS_BEGIN,
  FETCH_FORMS_SUCCESS,
  FETCH_FORMS_FAILURE,
} from "../constants/constants";

const FORM_LIST = {
  loading: true,
  forms: {},
  error: null,
};

const FormListReducer = (state = FORM_LIST, action) => {
  switch (action.type) {
    case FETCH_FORMS_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_FORMS_SUCCESS:
      return {
        ...state,
        loading: false,
        forms: action.payload,
      };
    case FETCH_FORMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default FormListReducer;
