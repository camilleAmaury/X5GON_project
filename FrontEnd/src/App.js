import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Panel from './Modules/Components/Scene/Panel';
import Login from './Modules/Components/LogIn/Login';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount = () => {
    document.title = "Gako";
  }


  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* default route */}
          <Route exact path="/Panel" component={Panel} />
        </Switch>
      </Router>
    );
  }
}
