const genUpdate = async (result, data) => {
    for (const attr in data) {
        result[attr] = data[attr]
    }
    return result
}

module.exports = {
    genUpdate
}