import React, { useState, useEffect } from 'react';
import { json } from 'react-router-dom';

function Option() {
  const [jsonData, setJsonData] = useState({});
  const eventSource = new EventSource('http://localhost:5000/events');

useEffect(() => {

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setJsonData(data);
    };


    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
    };
   console.log(jsonData)

}, [jsonData])

//   useEffect(() => {
    // create event source



  return (
    <div>
    {Array.isArray(jsonData) ? (
      jsonData.map((item, index) => (
        <div key={index}>
          <p>{item.symbol}</p>
          <p>{item.bidPrice}</p>
        </div>
      ))
    ) : (
      <p>{jsonData.symbol}</p>
    )}
    <p>Hello</p>
  </div>
  );
}

export default Option;