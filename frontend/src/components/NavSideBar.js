import React from "react";
import {
  Link, useRouteMatch 
} from 'react-router-dom'
import './css/NavSideBar.css'

const NavSideBar = () => {

  const path = useRouteMatch().path.substring(1)
  const [mainPath, subPath] = path.split('/')

  const tabs = {
    admin: [
      { path: "addStaff", label: "เพิ่มพนักงาน" },
      { path: "getStaff", label: "เรียกดูพนักงาน" },
      { path: "addBranch", label: "เพิ่มสาขา"},
      { path: "getBranch", label: "เรียกดูสาขา"},
      { path: "addPosition", label: "เพิ่มตำแหน่งงาน"},
      { path: "getPosition", label: "เรียกดูตำแหน่งงาน"},
      { path: "addTrackingState", label: "เพิ่มสถานะพัสดุ"},
      { path: "getTrackingState", label: "เรียกดูสถานะพัสดุ"},
    ],
    staff: [
      { path: "addParcel", label: "เพิ่มพัสดุ" },
      { path: "updateParcelStatus", label: "อัปเดตสถานะพัสดุ" },
    ]
  }

  return (
    <div>
      { tabs[mainPath].map(({path, label}, index) => 
        <li key={index}>
          <Link 
            style={
              subPath === path
              ? {color:'red'}
              : {color:'black'}} 
              to={`/${mainPath}/${path}`}>
            {label}
          </Link>
        </li>
      )}
    </div>
 )
}

export default NavSideBar