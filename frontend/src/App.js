import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import './App.css';
import Home from "./pages/Home"
import LoginPage from './pages/LoginPage';

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
      </Switch>
    </Router>
  );
}

export default App;
