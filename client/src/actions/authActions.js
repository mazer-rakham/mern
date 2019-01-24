import { GET_ERRORS } from "./types";
import axios from "axios";
// register user and pass the data to the store

export const registerUser = (userData, history) => dispatch=> {
   // need to use thunk because the data is asyncronous
   // the syntax of this is the users.js file in the routes folder in the server section
   axios
   .post("/api/users/register", userData)
   .then(res => history.push('/login'))

   .catch(err => 
        dispatch({
            type: GET_ERRORS,
            // this is the error data coming from the server passed into the 
            // payload error reducer
            payload: err.response.data
        })
    );
}