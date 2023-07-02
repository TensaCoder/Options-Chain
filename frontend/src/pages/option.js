import React, { useState, useEffect } from 'react';

function Option() {
  const [jsonData, setJsonData] = useState([]);

//   useEffect(() => {
    // create event source
    const eventSource = new EventSource('http://localhost:5000/events');

    // handle message event
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setJsonData(prevData => [...prevData, data]);
    };

    // handle connection errors
    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
    };

//     // clean up before component unmounts
//     return () => {
//       eventSource.close();
//     };

//   }, []);

  return (
    <div>
      {jsonData.map((item, index) => (
        <div key={index}>
          {/* Render the data fields */}
          {/* Example: <p>{item.symbol}</p> */}
        </div>
      ))}
    </div>
  );
}

export default Option;