import React from "react";
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";
import "./css/Admin.css"

const Admin = () => {

  return (
    <div className="page-container admin">
      <HeaderBar className="header-section admin"/>
      <NavSideBar className="nav-section admin"/>
      <div className="main-section admin"></div>
    </div>
  )
}

export default Admin 