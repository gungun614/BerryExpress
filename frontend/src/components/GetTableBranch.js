import React from "react";
import Icon from "../widgets/Icon";

const GetTableBranch = (props) => {
  const {data} = props
  const rows = data.map((item) => {
    
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.tel}</td>
        <td>{item.status}</td>
        <td><Icon className = {"bi-pencil-fill"}/></td>
      </tr>
    )
  })


  return (
  <table>
    <thead>
      <tr>
        <td>id</td>
        <td>ชื่อ</td>
        <td>เบอร์โทร</td>
        <td>สถานะ</td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      {
        rows
      }
    </tbody>

  </table>
  )
}


export default GetTableBranch