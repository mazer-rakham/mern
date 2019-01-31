import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// this is a react component that provides the "store" (application level state(data))
import { Provider } from "react-redux";
// bring in the cookie to see if logged in
import jwt_decode from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";

// export from a cost insdead of default you have to use destructuring
import {setCurrentUser, logoutUser} from './actions/authActions';


// bring in the redux store for use
import store from "./store";
import "./App.css";


import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// check for token
if(localStorage.jwtToken){
  // set the auth token header auth
  setAuthToken(localStorage.jwtToken);
  // decode the user info and expriation
  const decoded = jwt_decode(localStorage.jwtToken);
  // send the user to the store with the set current user action
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // TODO: Clear the current profile

    
    // redirect to login
    window.location.href= '/login';
  }
}


class App extends Component {
  render() {
    return (
      // apply the store to the provider
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* you need to make the path exact so extra stuff doesn't show up on the screen */}
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
