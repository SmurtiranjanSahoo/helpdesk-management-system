import { createStore, combineReducers, applyMiddleware } from "redux";
import FormReducer from "../reducers/FormReducer";
import OwnerReducer from "../reducers/OwnerReducer";
// import RespondentListReducer from "./redux/reducer/RespondentListReducer";
// import RespondentReducer from "./redux/reducer/RespondentReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  FormReducer,
  OwnerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
