import React from "react";
import {
  Link, useRouteMatch 
} from 'react-router-dom'
import './css/NavSideBar.css'

const NavSideBar = ({className}) => {

  const path = useRouteMatch().path.substring(1)
  const [mainPath, subPath] = path.split('/')

  const tabs = {
    admin: [
      { path: "addStaff", label: "เพิ่มพนักงาน" },
      { path: "getStaff", label: "เรียกดูพนักงาน" },
      { path: "addBranch", label: "เพิ่มสาขา"},
      { path: "getBranch", label: "เรียกดูสาขา"},
    ],
    staff: [
      { path: "addParcel", label: "เพิ่มพัสดุ" },
      { path: "updateParcelStatus", label: "อัปเดตสถานะพัสดุ" },
    ],
    postman: [
      { path: "updateParcelStatus", label: "อัปเดตสถานะพัสดุ" },
    ]
  }

  return (
    <div className={className}>
      <ul className="navlist-container"> { 
        tabs[mainPath].map(({path, label}, index) => 
          <li key={index}>
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