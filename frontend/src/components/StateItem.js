import React from 'react'
import Icon from '../widgets/Icon'
import Label from '../widgets/Label'



const StateItem = (props) => {

    const { state, branch, date, time } = props

    const getStateDetial = (state) => {
        switch (state) {
            case 1: return { icon: 'bi bi-box-seam', stateName: 'รับพัสดุ'}
            case 2: return { icon: 'bi bi-check-circle', stateName: 'จัดส่งสำเร็จ'}
            case 3: return { icon: 'bi bi-exclamation-circle', stateName: 'หมายเหตุ'}
            case 4: return { icon: 'bi bi-send', stateName: 'กำลังนำส่ง'}
            case 5: return { icon: 'bi bi-truck', stateName: 'ศูนย์คัดแยก'}
            case 6: return { icon: 'bi bi-truck', stateName: 'ศูนย์กระจาย'}
            default: return { icon: 'bi bi-bug', stateName: 'แก้บักด่วน!!!'}
        }
    }
    
    const { icon, stateName } = getStateDetial(state)

    return (
        <div>
            <Icon className={icon} size="40px" />
            <br/>
            <Label text={stateName} />
            <br/>
            <Label text="สาขา :" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Label text={branch} />
            <br/>
            <Label text="วันที่ :" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Label text={date} />
            <br/>
            <Label text="เวลา :" />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Label text={time} />
        </div>
    )
}

export default StateItem