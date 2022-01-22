
import axios from 'axios'
// Services
import staffService from "./staff"
import branchService from "./branch"

const { SERVER_URL } = require('../utils/config')

const baseUrl = `${SERVER_URL}/api/trackingHistories`

const findByTrackingNumber = async (TrackingNumber) => {
  const response = await axios.get(`${baseUrl}/find/${TrackingNumber}`)
  return response.data
}

const addTracking = async (trackingNumber, postManState = 0 , remark = null) => {
  const staffData = await staffService.findById(sessionStorage.getItem('session'))
  let itemStateId = '' // 1. รับพัสดุ 2.จัดส่งสำเร็จ 3.หมายเหตุ 4.กำลังนำส่ง 5.ศูนย์คัดแยก 6.ศูนย์กระจาย
  
  // Find itemStateId
  if (staffData.positionId = 2){ // 1 Admin, 2 Staff, 3 Postman
    const branchData = await branchService.findById(staffData.branchId)
    switch ( branchData.branchTypeId ){ // 1 รับพัสดุ, 2 คัดแยก, 3 กระจาย, 4 สนง ใหญ
      case 2 : itemStateId = 5
        break;
      case 3 : itemStateId = 6
        break;
      default : break;
    }
  } else if (staffData.positionId = 3) {
    switch ( postManState ){ // 1 รับพัสดุ, 2 คัดแยก, 3 กระจาย, 4 สนง ใหญ
      case 1 : itemStateId = 2
        break;
      case 2 : itemStateId = 3
        break;
      case 3 : itemStateId = 4
        break;
      case 0 : default : break;
    }
  }
  const trackingUpdateData = {
    trackingNo : trackingNumber,
    itemStateId : itemStateId,
    staffId : staffData.id,
    branchId : staffData.branchId,
    dateReceived : '',
    remark : remark
  }
  const response = await axios.post(`${baseUrl}/addTracking` , trackingUpdateData )
  return response.data
}

const trackingHistoryService = {
    findByTrackingNumber,
    addTracking
}

export default trackingHistoryService