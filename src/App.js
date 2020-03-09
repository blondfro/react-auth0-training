import React from "react";
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
      <PrivateRoute path="/profile" component={Profile} auth={auth} />
      <Route path="/public" component={Public} />
      <PrivateRoute path="/private" component={Private} auth={auth} />
      <PrivateRoute
        path="/courses"
        component={Courses}
        auth={auth}
        scopes={["read:courses"]}
      />
    </>
  );
}

export default App;
