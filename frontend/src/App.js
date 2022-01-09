import React from 'react';
import {
  BrowserRouter as Router,
  Switch, Route 
} from 'react-router-dom'
import './App.css';

import Home from "./pages/Home"
import LoginPage from './pages/LoginPage';
import Admin from './pages/Admin';
import AddBranch from './pages/AddBranch';
import AddStaff from './pages/AddStaff';
import AddPosition from './pages/AddPosition';
import AddTrackingState from './pages/AddTrackingState';
import GetBranch  from './pages/GetBranch';
import GetStaff from './pages/GetStaff';
import GetPosition  from './pages/GetPosition';
import GetTrackingState  from './pages/GetTrackingState';

import Staff from './pages/Staff';
import AddParcel from './pages/AddParcel';
import UpdateParcelStatus from './pages/UpdateParcelStatus'

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
        <Route path="/admin/addBranch">
          <AddBranch />
        </Route>
        <Route path="/admin/addStaff">
          <AddStaff />
        </Route>
        <Route path="/admin/addPosition">
          <AddPosition />
        </Route>
        <Route path="/admin/addTrackingState">
          <AddTrackingState />
        </Route>
        <Route path="/admin/getBranch">
          <GetBranch />
        </Route>
        <Route path="/admin/getStaff">
          <GetStaff />
        </Route>
        <Route path="/admin/getPosition">
          <GetPosition />
        </Route>
        <Route path="/admin/getTrackingState">
          <GetTrackingState />
        </Route>
        <Route exact path="/staff">
          <Staff />
        </Route>
        <Route path="/staff/addParcel">
          <AddParcel />
        </Route>
        <Route path="/staff/updateParcelStatus">
          <UpdateParcelStatus />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
