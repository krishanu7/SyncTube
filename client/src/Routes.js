import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Room from "./components/Room/Room";
import Welcome from "./components/Welcome/Welcome";
import Footer from "./components/common/Footer";
import Topbar from "./components/common/Topbar";

function Routes() {
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route path="/" component={Welcome} exact />
        <Route path="/room/:id" component={Room} exact />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Routes;
