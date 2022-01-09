import React from "react";
import { useLocation } from "react-router-dom";
import AddStaffForm from "../components/AddStaffForm";
import NavSideBar from "../components/NavSideBar";

const AddStaff = () => {

  return (
    <div>
    <NavSideBar />
    <AddStaffForm />
    </div>
  )
}

export default AddStaff
