import React, { Component } from "react";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { getPatients } from "./services";
import Table from "./components/Table";
import Practitioner from "./components/Practitioner";
import Questionnaire from "./components/Questionnaire";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Route exact path='/' component={Table} />
        <Switch>
          <Route exact path='/patients' component={Table} />
          <Route exact path='/practitioners' component={Practitioner} />
          <Route exact path='/questionnaire' component={Questionnaire} />
        </Switch>
      </Router>
    );
  }
}

export default App;
