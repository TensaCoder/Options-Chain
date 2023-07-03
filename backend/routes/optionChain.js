const Router = require('express')
const router = Router();
const net = require('net');
const fs = require('fs')



const serverAddress = 'localhost';
const serverPort = 9011;

// Create a TCP client socket
const clientSocket = new net.Socket();

// frontend socket
const io = require("socket.io")(4000, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

router.post("/getdata", async (req, res) => {


    clientSocket.connect(serverPort, serverAddress, () => {
        console.log(`Connected to server ${serverAddress}:${serverPort}`);

        // Send initial request
        clientSocket.write(Buffer.from([0x01]));
        console.log('Initial request sent to the server.');
    });



    // indexSymbol = "MAINIDX20JUL23"
    indexSymbol = req.body.symbol;
    console.log("Index symbol : ", indexSymbol)

    // var logger = fs.createWriteStream('log.txt', {
    //     flags: 'a' // 'a' means appending (old data will be preserved)
    // })

    clientSocket.on('data', async (data) => {
        let jsonData = {};

        // console.log("Data package length : " + data.length)

        // Iterate over the buffer in chunks of 4 bytes (assuming 32-bit little-endian integers)
        for (let i = 0; i < data.length; i += 130) {

            let temp = data.slice(i, i + 130);
            if (temp.length != 130) {
                // console.log("Temp length : " + temp.length)
                continue;
            }

            // console.log("Temp length : "+temp.length)
            let length = temp.slice(0, 4)

            // console.log(length)
            length = length.readInt32LE(0);
            // console.log(length);
            if (length !== 124) {
                // console.log("Length not matched : ", length)
                continue;
            }

            let symbol = temp.slice(4, 34);
            symbol = symbol.toString('utf-8');
            if (symbol.includes(indexSymbol) == false) {
                continue
            }
            // console.log(symbol)

            let sequenceNumber = temp.slice(34, 42);
            sequenceNumber = sequenceNumber.readBigInt64LE();
            sequenceNumber = sequenceNumber.toString()
            // console.log(sequenceNumber)

            let timeStamp = temp.slice(42, 50);
            timeStamp = timeStamp.readBigInt64LE();
            timeStamp = timeStamp.toString()
            // console.log(timeStamp)

            let LTP = temp.slice(50, 58);
            LTP = LTP.readBigInt64LE();
            LTP = LTP.toString()
            // console.log("LTP : " + LTP)

            let LTQ = temp.slice(58, 66);
            LTQ = LTQ.readBigInt64LE();
            LTQ = LTQ.toString()
            // console.log("LTQ : " + LTQ)

            let volume = temp.slice(66, 74);
            volume = volume.readBigInt64LE();
            volume = volume.toString()
            // console.log("volume : " + volume)

            let bidPrice = temp.slice(74, 82);
            bidPrice = bidPrice.readBigInt64LE();
            bidPrice = bidPrice.toString()
            // console.log("bidPrice : " + bidPrice)

            let bidQuantity = temp.slice(82, 90);
            bidQuantity = bidQuantity.readBigInt64LE();
            bidQuantity = bidQuantity.toString()
            // console.log("bidQuantity : " + bidQuantity)

            let askPrice = temp.slice(90, 98);
            askPrice = askPrice.readBigInt64LE();
            askPrice = askPrice.toString()
            // console.log("askPrice : " + askPrice)

            let askQuantity = temp.slice(98, 106);
            askQuantity = askQuantity.readBigInt64LE();
            askQuantity = askQuantity.toString()
            // console.log("askQuantity : " + askQuantity)

            let OI = temp.slice(106, 114);
            OI = OI.readBigInt64LE();
            OI = OI.toString()
            // console.log("OI : " + OI)

            let previousClosePrice = temp.slice(114, 122);
            previousClosePrice = previousClosePrice.readBigInt64LE();
            previousClosePrice = previousClosePrice.toString()
            // console.log("previousClosePrice : " + previousClosePrice)

            let previousOpenInterest = temp.slice(122, 130);
            previousOpenInterest = previousOpenInterest.readBigInt64LE();
            previousOpenInterest = previousOpenInterest.toString()
            // console.log("previousOpenInterest : " + previousOpenInterest)


            // jsonData.push({
            //     length: length,
            //     symbol: symbol,
            //     sequenceNumber: sequenceNumber,
            //     timeStamp: timeStamp,
            //     LTP: LTP,
            //     LTQ: LTQ,
            //     volume: volume,
            //     bidPrice: bidPrice,
            //     bidQuantity: bidQuantity,
            //     askPrice: askPrice,
            //     askQuantity: askQuantity,
            //     OI: OI,
            //     previousClosePrice: previousClosePrice,
            //     previousOpenInterest: previousOpenInterest
            // });

            let jsonDataIndividual = {
                length: length,
                symbol: symbol,
                sequenceNumber: sequenceNumber,
                timeStamp: timeStamp,
                LTP: LTP,
                LTQ: LTQ,
                volume: volume,
                bidPrice: bidPrice,
                bidQuantity: bidQuantity,
                askPrice: askPrice,
                askQuantity: askQuantity,
                OI: OI,
                previousClosePrice: previousClosePrice,
                previousOpenInterest: previousOpenInterest
            }
            // console.log(jsonDataIndividual)

            jsonData[sequenceNumber]={jsonDataIndividual}

            console.log(jsonData)

            io.on("connection", socket => {
                // console.log(socket.id)
                socket.emit("option-data", jsonDataIndividual)
                console.log(jsonDataIndividual)
            })

    
        }
        
        // JSON.stringify(jsonData);
        // res.send(jsonData);
        // jsonData = []

        if (jsonData.length !=0 && jsonData.length != undefined){
            JSON.stringify(jsonData);
            console.log("jsonData.length : "+jsonData.length)
    
            io.on("connection", socket => {
                // console.log(socket.id)
                socket.emit("option-data", jsonData)
                console.log(jsonData)
            })
    
            jsonData={};


        }
        


    })


});


module.exports = router
