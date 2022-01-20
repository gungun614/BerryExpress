const re = {}

const EN = /^[A-z]*$/
const TH = /^[ก-์]*$/
const ENandTH = /^[ก-์A-z]*$/
const characterAndNumber = /^[ก-์A-z0-9\s]*$/
const characterAndNumberSlash = /^[ก-์A-z0-9\s\/]*$/
const numberOnly = /^\d*$/
const numberSlash = /^\d*(\/)*\d*$/
const numberTwoFloatingPoint = /^(\d*(\.\d{0,2})?|\.?\d{1,2})$/

re.firstname = ENandTH
re.lastname = ENandTH
re.nationId = numberOnly
re.tel = numberOnly
re.address = characterAndNumber
re.subdistrict = TH
re.district = TH
re.province = TH
re.zipcode = numberOnly
re.weight = numberOnly
re.homeNo = numberSlash
re.villageNo = numberOnly
re.alley = characterAndNumberSlash
re.road = characterAndNumber

module.exports = {
    re
}