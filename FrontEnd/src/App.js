import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Panel from './Modules/Components/Scene/Panel';

import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount = () => {
    document.title = "Knowlegde Recipe";
  }


  render() {
    return (
      <Router>
        <Switch>
          {/* default route */}
          <Route exact path="/" component={Panel} />
        </Switch>
      </Router>
    );
  }
}
