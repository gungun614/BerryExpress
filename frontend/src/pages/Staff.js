import React from "react";
import HeaderBar from "../components/HeaderBar";
import NavSideBar from "../components/NavSideBar";
import "./css/Staff.css"

const Staff = () => {
  return (
    <div className="page-container staff">
      <HeaderBar className="header-section staff" />
      <NavSideBar className="nav-section staff" />
      <div className="main-section staff"></div>
    </div>
  )
}

export default Staff