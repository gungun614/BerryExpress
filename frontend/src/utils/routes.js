import Home from "../pages/Home"
import Login from "../pages/Login"
import Admin from "../pages/Admin"
import Staff from "../pages/Staff"
import AddStaff from "../pages/AddStaff"
import AddBranch from "../pages/AddBranch"
import AddParcel from "../pages/AddParcel"
import GetStaff from "../pages/GetStaff"

export const routes = [
  {
    path: "/",
    label: "Home",
    component: Home,
    routes: [
      {
        path: "/Login",
        label: "Login",
        component: Login,
      },
      {
        path: "/Admin",
        label: "Admin",
        component: Admin,
        routes: [
          {
            path: "/AddStaff",
            label: "AddStaff",
            component: AddStaff
          },
          {
            path: "/AddBranch",
            label: "AddBranch",
            component: AddBranch
          },
          {
            path: "/GetStaff",
            label: "GetStaff",
            component: GetStaff
          },
        ]
      },
      {
        path: "/Staff",
        label: "Staff",
        component: Staff,
        routes: [
          {
            path: "/AddParcel",
            label: "AddParcel",
            component: AddParcel
          }

        ]
      },
    ]
  }
]
