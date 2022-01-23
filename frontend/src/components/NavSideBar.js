import React from "react";
import {
  Link, useRouteMatch 
} from 'react-router-dom'
import './css/NavSideBar.css'
import MaterialIcon from "../icons/MaterialIcon";

const NavSideBar = ({className}) => {

  const path = useRouteMatch().path.substring(1)
  const [mainPath, subPath] = path.split('/')

  const tabs = {
    admin: [
      { path: "addStaff", label: "เพิ่มพนักงาน", iconName: "person_add"},
      { path: "getStaff", label: "เรียกดูพนักงาน", iconName: "person_search" },
      { path: "addBranch", label: "เพิ่มสาขา", iconName: "add_business"},
      { path: "getBranch", label: "เรียกดูสาขา", iconName: "map"},
    ],
    staff: [
      { path: "addParcel", label: "เพิ่มพัสดุ", iconName: "add"},
      { path: "updateParcelStatus", label: "อัปเดตสถานะพัสดุ", iconName: "local_shipping"},
    ],
    postman: [
      { path: "updateParcelStatus", label: "อัปเดตสถานะพัสดุ", iconName: "local_shipping"},
    ]
  }

  return (
    <div className={className}>
      <ul className="navlist-container"> { 
        tabs[mainPath].map(({path, label, iconName}, index) => 
          <li key={index}>
            {/* <span className="material-icons-outlined">
      person_add
    </span> */}
    <MaterialIcon iconName={iconName} />
            <Link 
              style={
                subPath === path
                ? {color:'red'}
                : {color:'black'}
              } 
              to={`/${mainPath}/${path}`}
            >
              {label}
            </Link>
          </li>
        )}
      </ul>
      
    </div>
 )
}

export default NavSideBar