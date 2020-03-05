import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/profile" component={Profile} />
    </>
  );
}

export default App;
