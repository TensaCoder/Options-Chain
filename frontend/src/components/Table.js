import React from 'react'
import IV from 'implied-volatility'
var bs = require("black-scholes");

const moment = require('moment');

function Table(props) {
   let newDataframe=[]
   let originalDataframe=[]
  try {
    console.log(props.data)
    const jsonData = props.data;
    // Extract rows with symbols ending in "PE" into a new dataframe
     newDataframe = jsonData.filter(row => row.symbol.endsWith('PE'));

    // Keep rows with symbols ending in "CE" in the original dataframe
     originalDataframe = jsonData.filter(row => row.symbol.endsWith('CE'));

    // Calculate strike price for each row
    calculateStrikePrice(newDataframe);
    calculateStrikePrice(originalDataframe);

    // Extract expiry date for each row
    extractExpiryDate(newDataframe);
    extractExpiryDate(originalDataframe);

    // Calculate implied volatility for each row
    calculateImpliedVolatility(newDataframe,"put");
    calculateImpliedVolatility(originalDataframe,"call");

    console.log('New Dataframe (Symbols ending in "PE"):', newDataframe);
    console.log('Original Dataframe (Symbols ending in "CE"):', originalDataframe);
  } catch (error) {
    console.error('Error parsing JSON data:', error);
  }




function calculateStrikePrice(dataframe) {
  for (let i = 0; i < dataframe.length; i++) {
    const row = dataframe[i];
    const symbol = row.symbol;
    const strikePrice = extractStrikePrice(symbol);
    row.strikePrice = strikePrice;
  }
}

function extractStrikePrice(symbol) {
    const regex = /\d{5}(?=PE|CE)/;
    const matches = symbol.match(regex);
  
    if (matches && matches.length > 0) {
      const strikePrice = parseInt(matches[0]);
      return strikePrice;
    }
  
    return null; // Invalid symbol format
}


function extractExpiryDate(dataframe) {
    for (let i = 0; i < dataframe.length; i++) {
      const row = dataframe[i];
      const symbol = row.symbol;
      const expiryDate = extractExpiryDateFromSymbol(symbol);
      row.expiryDate = expiryDate;
    }
  }
  
  function extractExpiryDateFromSymbol(symbol) {
    const regex = /(\d{2})(\w{3})(\d{2})/;
    const match = symbol.match(regex);
    if (match) {
      const day = match[1];
      const month = convertMonthAbbreviationToNumber(match[2]);
      const year = match[3];
      const currentYear = new Date().getFullYear().toString().substring(2);
      const fullYear = (parseInt(year) < parseInt(currentYear) ? '20' : '20') + year;
      return `${fullYear}-${month}-${day}`;
    } else {
      return '';
    }
  }
  
  
  function convertMonthAbbreviationToNumber(abbreviation) {
    const months = {
      JAN: '01',
      FEB: '02',
      MAR: '03',
      APR: '04',
      MAY: '05',
      JUN: '06',
      JUL: '07',
      AUG: '08',
      SEP: '09',
      OCT: '10',
      NOV: '11',
      DEC: '12',
    };
    return months[abbreviation.toUpperCase()];
  }

  function calculateImpliedVolatility(dataframe,optionType) {
    const riskFreeInterest = 0.05; // 5%
  
    for (let i = 0; i < dataframe.length; i++) {
      const row = dataframe[i];
      const timeToMaturity = calculateTimeToMaturity(row.expiryDate, row.timestamp);
      console.log(row.timestamp)

      if (timeToMaturity <= 0) {
        row.impliedVolatility = 0; // TTM is negative, implied volatility is 0
      } else {
        // const optionPrice = row.LTP; // Assuming the observed market price is the option price
        const strikePrice = row.strikePrice;
        const underlyingPrice = row.LTP
        const optionPrice=bs.blackScholes(underlyingPrice, strikePrice, timeToMaturity, .2, riskFreeInterest, optionType); // 0.23834902311961947
        // console.log(props.underlyingPrice[0])
        console.log(strikePrice)
        console.log(riskFreeInterest)
        console.log(timeToMaturity)
        const impliedVolatility = IV.getImpliedVolatility(optionPrice, underlyingPrice, strikePrice,timeToMaturity,riskFreeInterest,optionType);
        // const impliedVolatility=0;
        console.log(optionPrice)
        row.impliedVolatility = impliedVolatility;
      }
    }
  }
  
  function calculateTimeToMaturity(expiryDate, timestamp) {
    const timestampObj = moment(timestamp, "HH:mm:ss");

    // Set the expiry time to 15:30 IST on the expiry day
    const expiryTime = moment("15:30:00", "HH:mm:ss");
    
    // Combine the expiry date and time
    const expiryDateTime = moment(`${expiryDate} ${expiryTime.format("HH:mm:ss")}`, "YYYY-MM-DD HH:mm:ss");
    
    // Calculate the time to maturity in milliseconds
    const ttmMillis = expiryDateTime.diff(timestampObj);
    
    // Convert the ttm to years
    const ttmYears = ttmMillis / (1000 * 60 * 60 * 24 * 365);
      
    return ttmYears;
  }
  
  return (
    <div style={{display: "flex;", justifyContent: "space-around;"}}>
      <h2>PUT:</h2>
      <table>
        <thead>
        <tr>
            <th>Strike Price</th>
            <th>Expiry Date</th>
            <th>Implied Volatility</th>
            <th>LTQ</th>
            <th>LTP</th>
            <th>bestBid</th>
            <th>bestAsk</th>
            <th>bestBidQTY</th>
            <th>bestAskQTY</th>
            <th>totalTradedVolume</th>
            <th>openInterest</th>
            <th>prevClosePrice</th>
            <th>prevOpenInterest</th>
          </tr>
        </thead>
        <tbody>
          {newDataframe.map((item) => (
            <tr key={item.symbol}>
              <td>{item.strikePrice}</td>
              <td>{item.expiryDate}</td>
              <td>{item.impliedVolatility}</td>
              <td>{item.LTQ}</td>
              <td>{item.LTP}</td>
              <td>{item.bidPrice}</td>
              <td>{item.askPrice}</td>
              <td>{item.bidQuantity}</td>
              <td>{item.askQuantity}</td>
              <td>{item.volume}</td>
              <td>{item.OI}</td>
              <td>{item.previousClosePrice}</td>
              <td>{item.previousOpenInterest}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

      <h2>CALL:</h2>
      <table>
        <thead>
          <tr>
            <th>Strike Price</th>
            <th>Expiry Date</th>
            <th>Implied Volatility</th>
            <th>LTQ</th>
            <th>LTP</th>
            <th>bestBid</th>
            <th>bestAsk</th>
            <th>bestBidQTY</th>
            <th>bestAskQTY</th>
            <th>totalTradedVolume</th>
            <th>openInterest</th>
            <th>prevClosePrice</th>
            <th>prevOpenInterest</th>
          </tr>
        </thead>
        <tbody>
          {originalDataframe.map((item) => (
            <tr key={item.symbol}>
              <td>{item.strikePrice}</td>
              <td>{item.expiryDate}</td>
              <td>{item.impliedVolatility}</td>
              <td>{item.LTQ}</td>
              <td>{item.LTP}</td>
              <td>{item.bidPrice}</td>
              <td>{item.askPrice}</td>
              <td>{item.bidQuantity}</td>
              <td>{item.askQuantity}</td>
              <td>{item.volume}</td>
              <td>{item.OI}</td>
              <td>{item.previousClosePrice}</td>
              <td>{item.previousOpenInterest}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
