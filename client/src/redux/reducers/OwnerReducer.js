import {
  FETCH_OWNER_BEGIN,
  FETCH_OWNER_FAILURE,
  FETCH_OWNER_SUCCESS,
} from "../constants/constants";

const OWNER = {
  loading: true,
  owner: {},
  error: null,
};

const OwnerReducer = (state = OWNER, action) => {
  switch (action.type) {
    case FETCH_OWNER_BEGIN:
      return { ...state, loading: true, error: null };
    case FETCH_OWNER_SUCCESS:
      return {
        ...state,
        loading: false,
        owner: action.payload,
      };
    case FETCH_OWNER_FAILURE:
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

export default OwnerReducer;
