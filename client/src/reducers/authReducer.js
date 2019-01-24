import { TEST_DISPATCH } from "../actions/types";
// this is setting the initial application state for the auth reducer
const initialState = {
    isAuthenticated: false,
    user: {}
}
// take in initial state and and action to dispatch actions
export default function(state = initialState, action){
    switch(action.type){
        case TEST_DISPATCH:
        // never modify the state directly, just make a copy and add
        return{
            ...state,
            // this is filling the user with the payload data from authActions.js
            user: action.payload
        }
        default:
        return state;
    }
}