// initialize the store procedures
import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "./reducers";

import thunk from "redux-thunk";

const initialState = {};

const middleware = [thunk];
// initialize the store with empty parameters
// the redux store just keeps the data ad shares it between application states
const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
