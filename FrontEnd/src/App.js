import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Routes
import Login from './Modules/LogIn/Login';
import Panel from './Modules/Panel/Panel';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount = () => {
    document.title="Knowlegde Recipe";
  }


  render() {
    return (
      <Router>
        <Switch>
          {/* default route */}
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/connexion" component={Login} />
          <Route exact path="/connection" component={Login} /> */}

          {/* Panel */}
          <Route exact path="/Panel" component={Panel} />
        </Switch>
      </Router>
    );
  }
}
