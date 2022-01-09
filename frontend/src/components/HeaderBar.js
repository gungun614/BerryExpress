import Label from "../widgets/Label"
import Icon from "../widgets/Icon"

const HeaderBar = () => {

    return(
        <div>
            <div style={{ backgroundColor : "#E0E0E0" , width:"100%" , height :"60px" , display: "flex" ,  alignItems: "center"}}>
                <Icon className="bi bi-apple" size="40px" />
                <Label text ="Berry Express" size="20px" />
                <hr/>
            </div>
        </div>
    )
}

export default HeaderBar