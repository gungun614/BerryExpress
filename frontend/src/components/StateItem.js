import React from 'react'
import Icon from '../widgets/Icon'
import Label from '../widgets/Label'
import './css/StateItem.css'

const StateItem = (props) => {

    const { state, branch, date, time, remark } = props

    const getStateDetial = (state) => {
        switch (state) {
            case 1: return { 
                icon: 'bi bi-box-seam', 
                stateName: 'รับพัสดุเข้าระบบที่สาขา ' + branch,
            }
            case 2: return { 
                icon: 'bi bi-check-circle', 
                stateName: 'พัสดุถูกจัดส่งให้คุณสำเร็จแล้ว',
            }
            case 3: return { 
                icon: 'bi bi-exclamation-circle', 
                stateName: 'หมายเหตุ' + remark,
            }
            case 4: return { 
                icon: 'bi bi-send', 
                stateName: 'พนักงานกำลังนำส่งพัสดุให้แก่คุณ',
            }
            case 5: return { 
                icon: 'bi bi-truck', 
                stateName: 'พัสดุถึงศูนย์คัดแยก ' + branch ,
            }
            case 6: return { 
                icon: 'bi bi-truck',
                stateName: 'พัสดุถึงศูนย์กระจาย' + branch,
            }
            default: return {
                icon: 'bi bi-bug',
                stateName: 'แก้บักด่วน!!!',
            }
        }
    }
    
    const { icon, stateName } = getStateDetial(state)

    return (
        <div className="grid-container">

            <div className="item-icon">
                <Icon className={icon} size="40px" />
            </div>

            <div className="item-text">
                <Label text={stateName} fontWeight="bold" />
                <br/>
                <Label text={date + ' ' + time} />
            </div>

        </div>
    )
}

export default StateItem