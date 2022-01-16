import React from "react";
import Icon from "../widgets/Icon";

const GetTablePosition = (props) => {
  const {data} = props
  const rows = data.map((item) => {

    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.position}</td>
        <td><Icon className = {"bi-pencil-fill"}/></td>
      </tr>
    )
  })


  return (
  <table>
    <thead>
      <tr>
        <td>id</td>
        <td>ตำแหน่ง</td>
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


export default GetTablePosition