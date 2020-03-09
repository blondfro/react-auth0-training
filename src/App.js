import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navigation from "./components/Navigation";
import Callback from "./components/Callback";
import Auth from "./Auth/Auth";
import Public from "./components/public";
import Private from "./components/Private";
import Courses from "./components/Courses";
import PrivateRoute from "./components/PrivateRoute";
import AuthContext from "./components/AuthContext";

function App({ history }) {
  const [auth, setAuth] = useState(new Auth(history));
  const [tokenRenewalComplete, setTokenRenewalComplete] = useState(false);

  useEffect(() => {
    auth.renewToken(() => setTokenRenewalComplete(true));
  }, [auth]);

  if (!tokenRenewalComplete) return "Loading...";

  return (
    <AuthContext.Provider value={auth}>
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
      <PrivateRoute path="/profile" component={Profile} />
      <Route path="/public" component={Public} />
      <PrivateRoute path="/private" component={Private} />
      <PrivateRoute
        path="/courses"
        component={Courses}
        scopes={["read:courses"]}
      />
    </AuthContext.Provider>
  );
}

export default App;
