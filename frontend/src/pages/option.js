import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

let socket = io("http://localhost:4000")

socket.on("connect", () => {
    console.log(`connected with id : ${socket.id}`)
})

const Option = () => {

    const [data, setData] = useState([])
    const [symbol, setSymbol] = useState("MAINIDX")
    const [TTM, setTTM] = useState("06JUL23");
    const [optionType, setOptionType] = useState("CE")
    const [main, setmain] = useState([])
    const [all, setall] = useState([])
    const [mid, setmid] = useState([])
    const [fin, setfin] = useState([])
    let cleanData = (dataArray) => {
        for (let i = 0; i < dataArray.length; i++) {
          let currentData = dataArray[i];
      
          if (!currentData.symbol.startsWith(symbol)) {
            continue;
          }
          if (currentData.symbol.includes(TTM) !== true) {
            continue;
          }
          if (currentData.symbol.includes(optionType) !== true) {
            continue;
          }
      
          console.log("Symbol name: ", currentData.symbol);

      
        if(symbol.startsWith("MA")){
            const exist_data = main.findIndex((item) => item.symbol === currentData.symbol);
          if (exist_data !== -1) {
            setmain((prevData) => {
              const newData = [...prevData];
              newData[exist_data] = currentData;
              return newData;
            });
          } else {

            setmain((prevData) => [...prevData, currentData]);
          }
        }

        if(symbol.startsWith("A")){
            const exist_data = all.findIndex((item) => item.symbol === currentData.symbol);
            if (exist_data !== -1) {
              setall((prevData) => {
                const newData = [...prevData];
                newData[exist_data] = currentData;
                return newData;
              });
            } else {
    
              setall((prevData) => [...prevData, currentData]);
            }
          }

          if(symbol.startsWith("MI")){
            const exist_data = mid.findIndex((item) => item.symbol === currentData.symbol);
            if (exist_data !== -1) {
              setmid((prevData) => {
                const newData = [...prevData];
                newData[exist_data] = currentData;
                return newData;
              });
            } else {
    
              setmid((prevData) => [...prevData, currentData]);
            }
          }

          if(symbol.startsWith("F")){
            const exist_data = fin.findIndex((item) => item.symbol === currentData.symbol);
            if (exist_data !== -1) {
              setfin((prevData) => {
                const newData = [...prevData];
                newData[exist_data] = currentData;
                return newData;
              });
            } else {
    
              setfin((prevData) => [...prevData, currentData]);
            }
          }

    }
      
        console.log("Length: ", data);
      };


      

    // setInterval(() => {
    //     for (let i = 0; i < data.length; i++) {
    //         let currentData = dataArray[i];
    //         let timeStamp = currentData.timeStamp;

    //         if (currentData.timeStamp) {
    //             console.log("Symbol name : ", currentData.symbol)
    //             setData(prevData => [...prevData, currentData])
    //         }
    //     }
        
    // }, 40000);

    // useEffect(() => {

    //     const callback = (datas) => {
    //         setData(prevData => [...prevData, datas])
    //         console.log("Setting the data usestate")
    //     };



    //     // return () => {
    //     //     socket.off("option-data", callback);
    //     // };
    // }, [])

    socket.on("option-data", (jsonArray) => {
        // callback(jsonArray)
        cleanData(jsonArray)
        console.log("after cleanData function")
        console.log(jsonArray)
        // console.log("Length : ", data)
    })


    return (
        <>
           <label for="option">Choose a symbol:</label>
<select name="symbol" id="symbol" value={symbol} onChange={(event) => { setSymbol(event.target.value) }}>
  <option value="MA">MAINIDX</option>
  <option value="F">FINANCIALS</option>
  <option value="A">ALLBANKS</option>
  <option value="MI">MIDCAPS</option>
</select>

    {symbol === 'MA' && (
      <>
        {main.map((item) => (
          <p key={item.sequenceNumber}>
            {item.sequenceNumber},{item.symbol}, {item.timeStamp}, {item.LTP}, {item.LTQ}, {item.volume}
          </p>
        ))}
      </>
    )}

    {symbol === 'F' && (
      <>
        {fin.map((item) => (
          <p key={item.sequenceNumber}>
            {item.sequenceNumber},{item.symbol}, {item.timeStamp}, {item.LTP}, {item.LTQ}, {item.volume}
          </p>
        ))}
      </>
    )}

    {symbol === 'A' && (
      <>
        {all.map((item) => (
          <p key={item.sequenceNumber}>
            {item.sequenceNumber},{item.symbol}, {item.timeStamp}, {item.LTP}, {item.LTQ}, {item.volume}
          </p>
        ))}
      </>
    )}

    {symbol === 'MI' && (
      <>
        {mid.map((item) => (
          <p key={item.sequenceNumber}>
            {item.sequenceNumber},{item.symbol}, {item.timeStamp}, {item.LTP}, {item.LTQ}, {item.volume}
          </p>
        ))}
      </>
    )}
  </>
);
        }

export default Option