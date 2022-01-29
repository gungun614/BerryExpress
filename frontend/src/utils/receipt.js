const genReceipt = (data) => {
    // const element = 
    //     <div>
    //         hello 
    //     </div>
    let list = ''
    for (let i = 0; i < 5; ++i) {
        // list += `
        //     <div style="display: block;">
        //         <p style="text-align: left;"></p>
        //         <p style="text-align: right">40</p> 
        //     </div>
        //     <br/>
        // `

        list += `
        <div style="display: flex; flex-direction: columns">

            <div style="width: 50%; text-align: left;">
                BE22012200000${i}
                <br/>
                name customer
            </div>

            <div style="width: 50%; text-align: right;">
                40
                <br/>
            </div>

        </div>
        <br/>
        `
    }


    return `
    <div style="width: 100%; padding-top: 1%; padding-bottom: 2%; background-color: #444;">
    
        <div style="padding-top: 1%;">

            <div style="width: 40%; ; margin: auto; padding: 1%; background-color: white;">

                <h1 style="text-align: center;"> Berry Express </h1>
                
                <hr/>
                
                <div style="text-align: center;">
                    ...ที่อยู่สาขา
                </div>

                <br/>

                <div style="display: flex; flex-direction: columns">

                    <div style="width: 50%; text-align: left;">
                        staff name
                    </div>

                    <div style="width: 50%; text-align: right;">
                        date time
                    </div>

                </div>

                <hr/>
                <br/>

                ${list}

                <div style="display: flex; flex-direction: columns">

                    <div style="width: 50%; text-align: left;">
                        รวมยอดชำระ
                        <br/>
                    </div>

                    <div style="width: 50%; text-align: right;">
                        200 บาท
                        <br/>
                    </div>

                </div>

                <hr/>

            </div>

        </div>
        
    </div>
    `
}

module.exports = {
    genReceipt
}