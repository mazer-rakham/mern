import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// this is a react component that provides the "store" (application level state(data))
import { Provider } from "react-redux";
// bring in the redux store for use
import store from "./store";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";


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
