const genReceipt = (data) => {

    const { branch, staff, receipts, datetime } = data

    let sumCost = 0
    let list = ''
    console.log(receipts)
    for (const receipt of receipts) {
        console.log(receipt.cost)
        console.log(typeof receipt.cost)

        sumCost += Number(receipt.cost)
        list+= `
        <div style="display: flex; flex-direction: columns">
            <div style="width: 50%; text-align: left;">
                ${receipt.trackingNo}
                <br/>
                ${receipt.receiver.firstname} ${receipt.receiver.lastname}
            </div>
            <div style="width: 50%; text-align: right;">
                ${receipt.cost.toFixed(2)} <br/>
            </div>
        </div>
        <br/>`
    }

    return `
    <body style="margin: 0; background-color: #444;">
        <div style="width: 100%; padding-top: 1%; padding-bottom: 2%; ">
            <div style="padding-top: 1%;">
                <div style="width: 40%; margin: auto; padding: 1%; background-color: white;">
                    <h1 style="text-align: center;"> Berry Express </h1>
                    <hr/>
                    <div style="text-align: center;">
                        ${branch.name} <br/>
                        ${branch.address} ${branch.subdistrict} ${branch.district} ${branch.province} ${branch.zipcode}
                    </div>
                    <br/>
                    <div style="display: flex; flex-direction: columns">
                        <div style="width: 50%; text-align: left;">
                            ${staff.firstname} ${staff.lastname}
                        </div>
                        <div style="width: 50%; text-align: right;">
                            ${datetime}
                        </div>
                    </div>
                    <hr/>
                    <br/>
                    ${list}
                    <hr/>
                    <div style="display: flex; flex-direction: columns">
                        <div style="width: 50%; text-align: left;">
                            รวมยอดชำระ
                            <br/>
                        </div>
                        <div style="width: 50%; text-align: right;">
                            ${sumCost.toFixed(2)} บาท
                            <br/>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
        </div>
    </body>
    `
}

module.exports = {
    genReceipt
}