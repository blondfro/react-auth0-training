import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Route path="/" exact component={Home} />
      <Route path="/profile" component={Profile} />
    </>
  );
}

export default App;
