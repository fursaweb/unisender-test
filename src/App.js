import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
// import Pagination from "@material-ui/lab/Pagination";
import "./App.scss";

function App() {
  return (
    <Container maxWidth="md" className="wrapper">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/:login" render={(props) => <Profile {...props} />} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
