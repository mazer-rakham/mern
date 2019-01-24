import { GET_ERRORS } from "../actions/types";

// this is setting the initial application state for the auth reducer
const initialState = {};
  // take in initial state and and action to dispatch actions
  export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
        return action.payload;
      default:
        return state;
    }
  }
  