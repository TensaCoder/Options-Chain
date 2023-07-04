import React from 'react'
import Finance from 'financejs';
import IV from 'implied-volatility'

const moment = require('moment');

function Table(props) {

  const finance = new Finance();
  try {
    console.log(props.data)
    const jsonData = props.data;
    // Extract rows with symbols ending in "PE" into a new dataframe
    const newDataframe = jsonData.filter(row => row.symbol.endsWith('PE'));

    // Keep rows with symbols ending in "CE" in the original dataframe
    const originalDataframe = jsonData.filter(row => row.symbol.endsWith('CE'));

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

      if (timeToMaturity <= 0) {
        row.impliedVolatility = 0; // TTM is negative, implied volatility is 0
      } else {
        const optionPrice = row.LTP; // Assuming the observed market price is the option price
        const strikePrice = row.strikePrice;
        //const underlyingPrice = row.LTP
        
        // console.log(props.underlyingPrice[0])
        console.log(strikePrice)
        console.log(riskFreeInterest)
        console.log(timeToMaturity)
        const impliedVolatility = IV.getImpliedVolatility(optionPrice, 10000, strikePrice,timeToMaturity,riskFreeInterest,optionType);
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
    <div>
      {props.data.map((item) => (
                        <p>
                            {item.LTP}, {item.LTQ}
                        </p>
                    ))}
    </div>
  )
}

export default Table