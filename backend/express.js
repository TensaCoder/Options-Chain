const express = require('express');
const app = express();
const net = require('net');

// Define the server address and port
const serverAddress = 'localhost';
const serverPort = 9013;
let newData=[]
let jsonData=[]

// Create a TCP client socket
const clientSocket = new net.Socket();

// Connect to the server
clientSocket.connect(serverPort, serverAddress, () => {
  console.log(`Connected to server ${serverAddress}:${serverPort}`);

  // Send initial request
  clientSocket.write(Buffer.from([0x01]));
  console.log('Initial request sent to the server.');
});

// Handle data received from the server
clientSocket.on('data', (data) => {
  console.log("Data package length: " + data.length)

  newData.push(...data); 

  while (newData.length >= 130) {
    const temp = newData.slice(0, 130);
    newData = newData.slice(130);

    console.log(temp.length)
    let length = Buffer.from(temp.slice(0, 4))

    console.log(length)
    length = length.readInt32LE(0);

    console.log("length " +length);

    let symbol = Buffer.from(temp.slice(4, 34));
    symbol = symbol.toString('utf-8');
    console.log("symbol "+ symbol)

    let sequenceNumber = Buffer.from(temp.slice(34, 42));
    sequenceNumber = sequenceNumber.readBigInt64LE();
    sequenceNumber = sequenceNumber.toString()
    console.log("seq no " +sequenceNumber)

    let timeStamp = Buffer.from(temp.slice(42, 50));
    timeStamp = timeStamp.readBigInt64LE();
    timeStamp = timeStamp.toString()
    console.log(timeStamp)

    let LTP = Buffer.from(temp.slice(50, 58));
    LTP = LTP.readBigInt64LE();
    LTP = LTP.toString()
    console.log("LTP : " + LTP)

    let LTQ = Buffer.from(temp.slice(58, 66));
    LTQ = LTQ.readBigInt64LE();
    LTQ = LTQ.toString()
    console.log("LTQ : " + LTQ)

    let volume = Buffer.from(temp.slice(66, 74));
    volume = volume.readBigInt64LE();
    volume = volume.toString()
    console.log("volume : " + volume)

    let bidPrice = Buffer.from(temp.slice(74, 82));
    bidPrice = bidPrice.readBigInt64LE();
    bidPrice = bidPrice.toString()
    console.log("bidPrice : " + bidPrice)

    let bidQuantity = Buffer.from(temp.slice(82, 90));
    bidQuantity = bidQuantity.readBigInt64LE();
    bidQuantity = bidQuantity.toString()
    console.log("bidQuantity : " + bidQuantity)

    let askPrice = Buffer.from(temp.slice(90, 98));
    askPrice = askPrice.readBigInt64LE();
    askPrice = askPrice.toString()
    console.log("askPrice : " + askPrice)

    let askQuantity = Buffer.from(temp.slice(98, 106));
    askQuantity = askQuantity.readBigInt64LE();
    askQuantity = askQuantity.toString()
    console.log("askQuantity : " + askQuantity)

    let OI = Buffer.from(temp.slice(106, 114));
    OI = OI.readBigInt64LE();
    OI = OI.toString()
    console.log("OI : " + OI)

    let previousClosePrice = Buffer.from(temp.slice(114, 122));
    previousClosePrice = previousClosePrice.readBigInt64LE();
    previousClosePrice = previousClosePrice.toString()
    console.log("previousClosePrice : " + previousClosePrice)

    let previousOpenInterest = Buffer.from(temp.slice(122, 130));
    previousOpenInterest = previousOpenInterest.readBigInt64LE();
    previousOpenInterest = previousOpenInterest.toString()
    console.log("previousOpenInterest : " + previousOpenInterest)

    const dataObject = {
      length,
      symbol,
      sequenceNumber,
      timeStamp,
      LTP,
      LTQ,
      volume,
      bidPrice,
      bidQuantity,
      askPrice,
      askQuantity,
      OI,
      previousClosePrice,
      previousOpenInterest
    };

    jsonData.push(dataObject);
  }
});

// Handle connection close
clientSocket.on('close', () => {
  console.log('Connection to the server closed.');
});

// Handle connection errors
clientSocket.on('error', (error) => {
  console.error('Error connecting to the server:', error);
});


app.get('/events', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

    const sendData = () => {
      if (jsonData.length > 0) {
        res.write(`data: ${JSON.stringify(jsonData)}\n\n`);
        jsonData = []; 
      }
    };

    sendData();

    const intervalId = setInterval(sendData, 1000);

    req.on('close', () => {
      clearInterval(intervalId);
    });

});

app.listen(5000, () => {
  console.log('Server running on port 5000...');
});
