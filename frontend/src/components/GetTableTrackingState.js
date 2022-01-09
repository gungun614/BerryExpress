import React from "react";
import Icon from "../widgets/Icon";

const GetTableTrackingState = (props) => {
  const {data} = props
  const rows = data.map((item) => {

    return (
      <tr>
        <td>{item.id}</td>
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


export default GetTableTrackingState