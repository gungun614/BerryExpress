import React from 'react';
import './App.css';
import Label from "./widgets/Label"
import Login from './components/Login'
import  AddBranch from './components/AddBranch'
import ConsigneeDetail from './components/ConsigneeDetali'

const App = () => {

  return (
    <React.Fragment>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css"></link>
      {/* <Login /> */}
      {/* <Label text="เพิ่มข้อมูลสาขา" /> */}
      {/* <Label text="ยืนยันการบันทึกข้อมูล" /> */}
      {/* <AddBranch /> */}
      <ConsigneeDetail/>
    </React.Fragment>
  );
}

export default App;
