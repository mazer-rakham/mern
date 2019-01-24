import { TEST_DISPATCH } from "./types";

// register user and pass the data to the store

export const registerUser = (userData) => {
    return {
        type: TEST_DISPATCH,
        payload: userData
    }
}