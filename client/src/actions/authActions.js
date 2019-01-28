import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
// register user and pass the data to the store

export const registerUser = (userData, history) => dispatch => {
  // need to use thunk because the data is asyncronous
  // the syntax of this is the users.js file in the routes folder in the server section
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))

    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        // this is the error data coming from the server passed into the
        // payload error reducer
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login', userData)
    .then(res => {
        // save to localstorage
        const {token} = res.data;
        // set token to localstorage
        localStorage.setItem('jwtToken', token);
        // set to the auth header
        setAuthToken(token);
        // decode the token to get user data
        const decoded = jwt_decode(token);
        // set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err=> dispatch({
        type: GET_ERRORS,
        // this is the error data coming from the server passed into the
        // payload error reducer
        payload: err.response.data
      }));
};
// set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER, 
        payload: decoded
    }
}