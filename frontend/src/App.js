import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import './App.css';

import Home from "./pages/Home"
import LoginPage from './pages/LoginPage';
import Admin from './pages/Admin';
import Staff from './pages/Staff';
import AddBranch from './pages/AddBranch';

const App = () => {

  return (
    <Router>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"></link>


      <Switch>
        <Route exact path='/' >
          <Home />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route exact path="/admin">
          <Admin />
        </Route>
        <Route path="/staff">
          <Staff />
        </Route>
        <Route path="/admin/addBranch">
          <AddBranch />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
