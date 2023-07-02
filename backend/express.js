const express = require('express');
const app = express();
const net = require('net');

// Define the server address and port
const serverAddress = 'localhost';
const serverPort = 9013;

let jsonData = [];

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
clientSocket.on('data', async (data) => {
  console.log("Data package length : " + data.length)

  console.log("Data package length : " + data.length)

//   var logger = fs.createWriteStream('log.txt', {
//       flags: 'a' // 'a' means appending (old data will be preserved)
//   })

  // Iterate over the buffer in chunks of 4 bytes (assuming 32-bit little-endian integers)
  for (let i = 0; i < data.length; i += 130) {

      let temp = await data.slice(i, i + 130);
      if (temp.length != 130) {
          console.log("Temp length : " + temp.length)
          continue;
      }

      console.log(temp.length)
      let length = temp.slice(0, 4)

      console.log(length)
      length = length.readInt32LE(0);

      console.log("length " +length);

      let symbol = temp.slice(4, 34);
      symbol = symbol.toString('utf-8');
      console.log("symbol "+ symbol)

      let sequenceNumber = temp.slice(34, 42);
      sequenceNumber = sequenceNumber.readBigInt64LE();
      sequenceNumber = sequenceNumber.toString()
      console.log("seq no " +sequenceNumber)

      let timeStamp = temp.slice(42, 50);
      timeStamp = timeStamp.readBigInt64LE();
      timeStamp = timeStamp.toString()
      console.log(timeStamp)

      let LTP = temp.slice(50, 58);
      LTP = LTP.readBigInt64LE();
      LTP = LTP.toString()
      console.log("LTP : " + LTP)

      let LTQ = temp.slice(58, 66);
      LTQ = LTQ.readBigInt64LE();
      LTQ = LTQ.toString()
      console.log("LTQ : " + LTQ)

      let volume = temp.slice(66, 74);
      volume = volume.readBigInt64LE();
      volume = volume.toString()
      console.log("volume : " + volume)

      let bidPrice = temp.slice(74, 82);
      bidPrice = bidPrice.readBigInt64LE();
      bidPrice = bidPrice.toString()
      console.log("bidPrice : " + bidPrice)

      let bidQuantity = temp.slice(82, 90);
      bidQuantity = bidQuantity.readBigInt64LE();
      bidQuantity = bidQuantity.toString()
      console.log("bidQuantity : " + bidQuantity)

      let askPrice = temp.slice(90, 98);
      askPrice = askPrice.readBigInt64LE();
      askPrice = askPrice.toString()
      console.log("askPrice : " + askPrice)

      let askQuantity = temp.slice(98, 106);
      askQuantity = askQuantity.readBigInt64LE();
      askQuantity = askQuantity.toString()
      console.log("askQuantity : " + askQuantity)

      let OI = temp.slice(106, 114);
      OI = OI.readBigInt64LE();
      OI = OI.toString()
      console.log("OI : " + OI)

      let previousClosePrice = temp.slice(114, 122);
      previousClosePrice = previousClosePrice.readBigInt64LE();
      previousClosePrice = previousClosePrice.toString()
      console.log("previousClosePrice : " + previousClosePrice)

      let previousOpenInterest = temp.slice(122, 130);
      previousOpenInterest = previousOpenInterest.readBigInt64LE();
      previousOpenInterest = previousOpenInterest.toString()
      console.log("previousOpenInterest : " + previousOpenInterest)


      jsonData.push({
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
      });

      
      
  }
//   logger.write(JSON.stringify(jsonData) + "\n") // append string to your file
  // jsonData=[]
  // module.exports = {
  //     jsonData
  //   };
  // console.log(jsonData);

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
    res.write(`data: ${JSON.stringify(jsonData)}\n\n`);
  };

  // Send the current data immediately when a client connects
  sendData();

  // Update the data every second and send it to the client
  const intervalId = setInterval(sendData, 1000);

  // When the client closes the connection, stop sending updates
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(5000, () => {
  console.log('Server running on port 5000...');
});
