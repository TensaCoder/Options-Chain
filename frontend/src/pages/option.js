import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

let socket = io("http://localhost:4000")

socket.on("connect", () => {
    console.log(`connected with id : ${socket.id}`)
})

const Option = () => {

    const [data, setData] = useState([])
    const [symbol, setSymbol] = useState("MAINIDX")
    // const [TTM, setTTM] = useState("06JUL23");
    // const [optionType, setOptionType] = useState("CE")
    const [main, setmain] = useState([])
    const [all, setall] = useState([])
    const [mid, setmid] = useState([])
    const [fin, setfin] = useState([])
    const [underlying, setunderlying] = useState([])

    const names = ["MAINIDX", "FINANCIALS", "ALLBANKS", "MIDCAPS"];

    let cleanData = (dataArray) => {
        for (let i = 0; i < dataArray.length; i++) {

            let currentData = dataArray[i];
            currentData.symbol = currentData.symbol.replace(/\x00/g, '');


            for (let i = 0; i < names.length; i++) {
                if (currentData.symbol.toString().length === names[i].length) {
                    // console.log(currentData)
                }
                if (currentData.symbol.includes(names[i]) && currentData.symbol.length === names[i].length) {
                    setunderlying(prevUnderlying => {
                        const index = prevUnderlying.findIndex((item) => item.symbol === currentData.symbol);
                        if (index !== -1) {
                            return prevUnderlying.map((item, itemIndex) => itemIndex === index ? currentData : item);
                        } else {
                            return [...prevUnderlying, currentData];
                        }
                    });

                }
            }


            if (currentData.symbol.startsWith("MAINIDX") && currentData.symbol !== symbol) {
                setmain(prevMain => {
                    const index = prevMain.findIndex((item) => item.symbol === currentData.symbol);
                    if (index !== -1) {
                        return prevMain.map((item, itemIndex) => itemIndex === index ? currentData : item);
                    } else {
                        return [...prevMain, currentData];
                    }
                });
            }

            else if (currentData.symbol.startsWith("ALLBANKS") && currentData.symbol.length > "ALLBANKS".length) {
                setall(prevAll => {
                    const index = prevAll.findIndex((item) => item.symbol === currentData.symbol);
                    if (index !== -1) {
                        return prevAll.map((item, itemIndex) => itemIndex === index ? currentData : item);
                    } else {
                        return [...prevAll, currentData];
                    }
                });
            }

            else if (currentData.symbol.startsWith("MIDCAPS") && currentData.symbol.length > "MIDCAPS".length) {
                setmid(prevMid => {
                    const index = prevMid.findIndex((item) => item.symbol === currentData.symbol);
                    if (index !== -1) {
                        return prevMid.map((item, itemIndex) => itemIndex === index ? currentData : item);
                    } else {
                        return [...prevMid, currentData];
                    }
                });
            }
            else if (currentData.symbol.startsWith("FINANCIALS") && currentData.symbol.length > "FINANCIALS".length) {
                setfin(prevFin => {
                    const index = prevFin.findIndex((item) => item.symbol === currentData.symbol);
                    if (index !== -1) {
                        return prevFin.map((item, itemIndex) => itemIndex === index ? currentData : item);
                    } else {
                        return [...prevFin, currentData];
                    }
                });
            }
        }
        // console.log("Length: ", data);
        console.log("UNDERLYING ", underlying)
    };

    socket.on("option-data", (jsonArray) => {
        // callback(jsonArray)
        cleanData(jsonArray)
        // console.log("after cleanData function")
        console.log(jsonArray)
        // console.log("Length : ", data)
    })

    // will execute when the expiry date column is selected and will remove the expiry data from there and send it to the frontend -> use the "data" useState to store the value
    setInterval(() => {
        let seperateData = () => {
    
        }
        
    }, 5000);


    return (
        <>
            <label htmlFor="option">Choose a symbol:</label>
            <select name="symbol" id="symbol" value={symbol} onChange={(event) => { setSymbol(event.target.value) }}>
                <option value="MAINIDX">MAINIDX</option>
                <option value="FINANCIALS">FINANCIALS</option>
                <option value="ALLBANKS">ALLBANKS</option>
                <option value="MIDCAPS">MIDCAPS</option>
            </select>

            {symbol === 'MAINIDX' && (
                <>
                    {main.map((item) => (
                        <p>
                            {item.sequenceNumber},{item.symbol}, {item.timeStamp}, {item.LTP}, {item.LTQ}, {item.volume}
                        </p>
                    ))}
                </>
            )}

            {symbol === 'FINANCIALS' && (
                <>
                    {fin.map((item) => (
                        <p>
                            {item.sequenceNumber},{item.symbol}, {item.timeStamp}, {item.LTP}, {item.LTQ}, {item.volume}
                        </p>
                    ))}
                </>
            )}

            {symbol === 'ALLBANKS' && (
                <>
                    {all.map((item) => (
                        <p>
                            {item.sequenceNumber},{item.symbol}, {item.timeStamp}, {item.LTP}, {item.LTQ}, {item.volume}
                        </p>
                    ))}
                </>
            )}

            {symbol === 'MIDCAPS' && (
                <>
                    {mid.map((item) => (
                        <p>
                            {item.sequenceNumber},{item.symbol}, {item.timeStamp}, {item.LTP}, {item.LTQ}, {item.volume}
                        </p>
                    ))}
                </>
            )}
        </>
    );
}

export default Option