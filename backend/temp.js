const express = require("express");
const cors = require('cors');

// code for Dual socket
const net = require('net');
const serverAddress = 'localhost';
const serverPort = 9011;

port = 8093    // express server port

const app = express();
app.use(cors());
app.use(express.json());

app.listen(port)
console.log(`Backend listening on port : ${port}`)

// Create a TCP client socket
const clientSocket = new net.Socket();

// frontend socket
const io = require("socket.io")(4000, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})


clientSocket.connect(serverPort, serverAddress, () => {

    console.log(`Connected to server ${serverAddress}:${serverPort}`);

    // Send initial request
    clientSocket.write(Buffer.from([0x01]));
    console.log('Initial request sent to the server.');

});

let getPacketComponent = (temp) => {
    let length = temp.slice(0, 4)

    // console.log(length)
    length = length.readInt32LE(0);
    // console.log(length);
    if (length !== 124) {
        // console.log("Length not matched : ", length)
        return
    }

    let symbol = temp.slice(4, 34);
    symbol = symbol.toString('utf-8');
    // if (symbol.includes(requestSymbol) == false) {
    //     console.log("symbol not matched : ", symbol)
    //     return
    // }
    // console.log(symbol)

    let sequenceNumber = temp.slice(34, 42);
    sequenceNumber = sequenceNumber.readBigInt64LE();
    sequenceNumber = sequenceNumber.toString()
    // console.log(sequenceNumber)

    let timeStamp = temp.slice(42, 50);
    timeStamp = timeStamp.readBigInt64LE();

    timeStamp = parseInt(timeStamp)
    timeStamp = new Date(timeStamp);
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

    return (jsonDataIndividual)

}




let jsonData = [];
let dataArray = [];
let requestSymbol = "MAINIDX";




clientSocket.on('data', async (data) => {
    dataArray.push(data);

    // console.log("sending new data : ", new Date().toString())
    // console.log("JsonData : ", jsonData.length)
    // console.log("Data Array : ", dataArray)
    // console.log("Data Array length: ", dataArray.length)
    // console.log("Data Array [0] length : ", dataArray[0].length)



    while (dataArray.length != 0) {
        // gets the first packet(packet may not be of size 130 bytes)
        // console.log("Inside while loop")
        currentPacket = dataArray[0];
        
        if (currentPacket.length != 130) {
            // console.log("Packet length is not 130 : ", currentPacket.length)
            // console.log(currentPacket)
            // console.log("Here")
            for (let i = 0; i < currentPacket.length; i += 130) {

                let temp = currentPacket.slice(i, i + 130);
                if (temp.length != 130) {
                    // console.log("Temp length : " + temp.length)
                    continue;
                }

                // console.log("Temp length : "+temp.length)
                let jsonDataIndividual = getPacketComponent(temp)

                if (jsonDataIndividual == undefined) {
                    continue;
                }
                // console.log(jsonDataIndividual)

                // jsonData[sequenceNumber] = { jsonDataIndividual }
                jsonData.push(jsonDataIndividual)

            }

        }
        else {

            let temp = currentPacket;
            
            let jsonDataIndividual = await getPacketComponent(temp)
            
            // console.log("Here")
            // console.log(jsonDataIndividual)
            if (jsonDataIndividual == undefined) {
                continue;
            }

            jsonData.push(jsonDataIndividual)
            // console.log(jsonDataIndividual)


        }

        // deletes the first array item
        // console.log("Json data array length : ", jsonData.length)
        dataArray.splice(0, 1);
    }



})


io.on("connection", (socket) => {
    setInterval(() => {
        // console.log(socket.id)
        if (jsonData.length != 0) {
            // console.log("inside if loop")
            socket.emit("option-data", jsonData)
            console.log(jsonData)
            jsonData = []
        }
    }, 1000);
})