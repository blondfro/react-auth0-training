import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navigation from "./components/Navigation";
import Auth from "./Auth/Auth";

function App({ history }) {
  const auth = new Auth(history);

  return (
    <>
      <Navigation />
      <div className="body">
        <Route
          path="/"
          exact
          render={props => <Home auth={auth} {...props} />}
        />
        <Route path="/profile" component={Profile} />
      </div>
    </>
  );
}

export default App;
