import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navigation from "./components/Navigation";
import Callback from "./components/Callback";
import Auth from "./Auth/Auth";
import Public from "./components/public";

function App({ history }) {
  const auth = new Auth(history);

  return (
    <>
      <Navigation auth={auth} />
      <div className="body">
        <Route
          path="/"
          exact
          render={props => <Home auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={props => <Callback auth={auth} {...props} />}
        />
      </div>
      <Route
        path="/profile"
        render={props =>
          auth.isAuthenticated() ? (
            <Profile auth={auth} {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
      <Route path="/public" component={Public} />
    </>
  );
}

export default App;
