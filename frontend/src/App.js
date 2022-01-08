import React from 'react';
import './App.css';
import AddStaffForm from './components/AddStaffForm';
import Login from './components/Login'

const App = () => {

  return (
    <React.Fragment>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"></link>
      <Login />
      <AddStaffForm />
    </React.Fragment>
  );
}

export default App;
