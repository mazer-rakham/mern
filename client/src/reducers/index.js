import { combineReducers } from "redux";
import authReducer from "./authReducer";

export default combineReducers({
  // this is the naming of the reducer it will become this.props.auth, can name whatever
  auth: authReducer
});
