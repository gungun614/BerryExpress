const genUpdate = async (result, data) => {
    for (const attr in data) {
        result[attr] = data[attr]
    }
    return result
}

const getDateTime = (type, datetime = new Date()) => {
    const result = datetime.toLocaleString("th-TH", { timeZone: "Asia/Jakarta" })
    switch (type) {
        case 'date': return result.split(' ')[0]
        case 'time': return result.split(' ')[1]
        case 'datetime': return result
    }
}

module.exports = {
    genUpdate,
    getDateTime
}