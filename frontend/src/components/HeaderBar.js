import logo from "../image/cherryLogo.svg"
import "./css/HeaderBar.css"

const HeaderBar = ({className}) => {

  return(
    <div className={className}>
      <div className="brand-section">
        <img src={logo} alt="Logo" style={{ width:"3.4rem" }} />
        <div className="brand-text">
          <h1>Berry</h1>
          <h5>Express</h5>
        </div>
      </div>
    </div>
  )
}

export default HeaderBar