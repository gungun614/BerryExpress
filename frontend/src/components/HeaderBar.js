import Label from "../widgets/Label"
import logo from "../image/cherryLogo.svg"

const HeaderBar = () => {

    return(
        <div>
            <div style={{ backgroundColor : "#E0E0E0" , width:"100%" , height :"60px" , display: "flex" ,  alignItems: "center"}}>
                <img src={logo} alt="Logo" width="40px"/>
                <Label text ="Berry Express" size="20px" />
                <hr/>
            </div>
        </div>
    )
}

export default HeaderBar