import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from './profileReducer';
export default combineReducers({
  // this is the naming of the reducer it will become this.props.auth, can name whatever
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
