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

  newData.push(...data); // Append the new data to the existing buffer

  while (newData.length >= 130) {
    const temp = newData.slice(0, 130);
    newData = newData.slice(130);

    // Parse the data
    const length = Buffer.from(temp.slice(0, 4)).readInt32LE(0);
    const symbol = temp.slice(4, 34).toString('utf-8');
    const sequenceNumber = Buffer.from(temp.slice(34, 42)).readBigInt64LE().toString();
    const timeStamp = Buffer.from(temp.slice(42, 50)).readBigInt64LE().toString();
    const LTP = Buffer.from(temp.slice(50, 58)).readBigInt64LE().toString();
    const LTQ = Buffer.from(temp.slice(58, 66)).readBigInt64LE().toString();
    const volume = Buffer.from(temp.slice(66, 74)).readBigInt64LE().toString();
    const bidPrice = Buffer.from(temp.slice(74, 82)).readBigInt64LE().toString();
    const bidQuantity = Buffer.from(temp.slice(82, 90)).readBigInt64LE().toString();
    const askPrice = Buffer.from(temp.slice(90, 98)).readBigInt64LE().toString();
    const askQuantity = Buffer.from(temp.slice(98, 106)).readBigInt64LE().toString();
    const OI = Buffer.from(temp.slice(106, 114)).readBigInt64LE().toString();
    const previousClosePrice = Buffer.from(temp.slice(114, 122)).readBigInt64LE().toString();
    const previousOpenInterest = Buffer.from(temp.slice(122, 130)).readBigInt64LE().toString();

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
