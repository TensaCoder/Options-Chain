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
    const [underlying, setunderlying] = useState([[],[],[],[]])

    let cleanData = (dataArray) => {
        for (let i = 0; i < dataArray.length; i++) {
            let currentData = dataArray[i];

            const names = ["MAINIDX", "FINANCIALS", "ALLBANKS", "MIDCAPS"];
            console.log(currentData.symbol.toString().length === symbol.toString().length)
            if(currentData.symbol.toString().length === symbol.toString().length){
                for (let i=0;i<names.length; i++){
                    if (currentData.symbol.includes(names[i]) && currentData.symbol.length === names[i].length) {
                        setunderlying(prevUnderlying => {
                            const updated = [...prevUnderlying];
                            updated[i] = [currentData];
                            return updated;
                          })
                        
                // store the data in a array and not dictionary and use the logic from line 42 for finding new occurence and updating old one with new
            }
        }
    }
            
           else if (currentData.symbol.startsWith("MAINIDX") && currentData.symbol!==symbol) {
                setmain(prevMain => {
                    const index = prevMain.findIndex((item) => item.symbol === currentData.symbol);
                    if (index !== -1) {
                        return prevMain.map((item, itemIndex) => itemIndex === index ? currentData : item);
                    } else {
                        return [...prevMain, currentData];
                    }
                });
            }
    
            else if (currentData.symbol.startsWith("ALLBANKS") && currentData.symbol!==symbol) {
                setall(prevAll => {
                    const index = prevAll.findIndex((item) => item.symbol === currentData.symbol);
                    if (index !== -1) {
                        return prevAll.map((item, itemIndex) => itemIndex === index ? currentData : item);
                    } else {
                        return [...prevAll, currentData];
                    }
                });
            }
    
            else if (currentData.symbol.startsWith("MIDCAPS") && currentData.length!==symbol) {
                setmid(prevMid => {
                    const index = prevMid.findIndex((item) => item.symbol === currentData.symbol);
                    if (index !== -1) {
                        return prevMid.map((item, itemIndex) => itemIndex === index ? currentData : item);
                    } else {
                        return [...prevMid, currentData];
                    }
                });
            }
            else if (currentData.symbol.startsWith("FINANCIALS") && currentData.symbol!==symbol) {
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
        console.log("Length: ", data);
        console.log("UNDERLYING ",underlying)
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
