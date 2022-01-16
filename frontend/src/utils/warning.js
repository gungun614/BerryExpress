const getMessageWarning = (name) => {
    switch (name) {
        case 'nationId': return 'ป้อนเฉพาะตัวเลขเท่านั้น'
        case 'firstname': return 'ป้อนเฉพาะตัวอักษรและสระเท่านั้น'
        case 'lastname': return 'ป้อนเฉพาะตัวอักษรและสระเท่านั้น'
        case 'tel': return 'ป้อนเฉพาะตัวเลขเท่านั้น'
        case 'homeNo': return 'ป้อนเฉพาะตัวเลขและ / เท่านั้น'
        case 'villageNo': return 'ป้อนเฉพาะตัวเลขเท่านั้น'
        case 'alley': return 'ไม่อนุญาตให้ใช้เครื่องหมายอื่นนอกจาก /'
        case 'zipcode': return 'ป้อนเฉพาะตัวเลขเท่านั้น'
        case 'weight': return 'ป้อนเฉพาะตัวเลขและ . เท่านั้น'
        case 'road': return 'ไม่อนุญาตให้ใช้อักษรพิเศษ'
        // case '': return ''
        // case '': return ''
        default: return 'Invalid [name]'
    }
}

module.exports = {
    getMessageWarning
}