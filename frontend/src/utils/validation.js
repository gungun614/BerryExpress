const validation = {}

validation.isEmptyFields = (object) => {
    return Object.values(object).some((value) => value == '')
}

validation.isFormat = (type, data) => {
    if (type == 'nationId') {

        if (data.length < 13) return 'เลขบัตรประชาชนต้องมี 13 หลักเท่านั้น'
    
    } else if (type == 'tel') {

        const length = data.length
        const prefixTel = data.substring(0, 2)
        
        if (length < 9) {
            return 'กรุณาป้อนเบอร์โทรศัพท์ให้ถูกต้อง'
        } else if (length == 9) {
            if (prefixTel == '02') {
                return null
            } else {
                return 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
            }
        } else if (length == 10) {
            if (prefixTel == '06' || prefixTel == '08' || prefixTel == '09') {
                return null
            } else {
                return 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง'
            }
        }
        return true

    } else {
        return true
    }
}

module.exports = {
    validation
}