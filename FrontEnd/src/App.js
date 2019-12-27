import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Routes
import Login from './Modules/LogIn/Login'

export default function App() {
  return (
    <Router>
      <Switch>
        {/* default route */}
        <Route exact path="/" component={Login} />
        <Route exact path="/connexion" component={Login} />
        <Route exact path="/connection" component={Login} />

        

      </Switch>
    </Router>
  );
}
