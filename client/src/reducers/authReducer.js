import {SET_CURRENT_USER} from '../actions/types';
import isEmpty from '../validation/is-empty';
// this is setting the initial application state for the auth reducer
const initialState = {
  isAuthenticated: false,
  user: {}
};
// take in initial state and and action to dispatch actions
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload
    }
    default:
      return state;
  }
}
