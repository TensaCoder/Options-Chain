import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

let socket = io("http://localhost:4000")

socket.on("connect", () => {
    console.log(`connected with id : ${socket.id}`)
})

const Option = () => {

    const [data, setData] = useState([])
    const [symbol, setSymbol] = useState("MAINIDX")
    const [TTM, setTTM] = useState('11JUL23');
    // const [optionType, setOptionType] = useState("CE")
    const [main, setmain] = useState([])
    const [all, setall] = useState([])
    const [mid, setmid] = useState([])
    const [fin, setfin] = useState([])
    const [underlying, setunderlying] = useState([])

    const names = ["MAINIDX", "FINANCIALS", "ALLBANKS", "MIDCAPS"];
    const dates = {
        "MAINIDX": ['06JUL23', '13JUL23', '20JUL23', '27JUL23', '03AUG23', '31AUG23', '28SEP23', '26OCT23', '28DEC23', '25JUN26', '26JUN25', '27JUN24', '28MAR24', '26DEC24', '25DEC25', '31DEC26', '30DEC27', '24JUN27'],
        "FINANCIALS": ['04JUL23', '11JUL23', '18JUL23', '25JUL23', '29AUG23', '26SEP23'],
        "MIDCAP": ['05JUL23', '26JUL23'],
        "ALLBANKS": ['06JUL23', '13JUL23', '20JUL23', '27JUL23', '03AUG23', '28SEP23', '31AUG23', '26OCT23', '28DEC23']
    }

    let cleanData = (dataArray) => {
        for (let i = 0; i < dataArray.length; i++) {

            let currentData = dataArray[i];
            currentData.symbol = currentData.symbol.replace(/\x00/g, '');


            for (let i = 0; i < names.length; i++) {
                // if (currentData.symbol.toString().length === names[i].length) {
                //     // console.log(currentData)
                // }
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


            if (currentData.symbol.startsWith("MAINIDX") && currentData.symbol > "MAINIDX".length) {
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

            else if (currentData.symbol.startsWith("MIDCAP") && currentData.symbol.length > "MIDCAP".length) {
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

    let seperateData = (dataArray) => {
        // const filteredData = dataArray.filter(item => item.symbol.includes(TTM));
        let filteredArray = dataArray.filter((item) => {
            console.log("item: ", item)
            if (item.symbol.includes(TTM)) {
                console.log("item: ", item)
                return item;
            }
        });
        console.log("Filtered Data : ", filteredArray)
        setData(filteredArray);
    }

    let dataArray = []
    useEffect(() => {
        if (symbol == "MAINIDX") {
            dataArray = main;
        }
        else if (symbol == "FINANCIALS") {
            dataArray = fin;
        }
        else if (symbol == "ALLBANKS") {
            dataArray = all;
        }
        else if (symbol == "MIDCAP") {
            dataArray = mid;
        }
        console.log("Displaying data of : ", symbol)
        seperateData(dataArray);
        console.log("DATA : ", data)

    }, [symbol, TTM])

    // setInterval(() => {
    //     if (symbol=="MAINIDX"){
    //         dataArray=main;
    //     }
    //     else if (symbol=="FINANCIALS"){
    //         dataArray=fin;
    //     }
    //     else if (symbol=="ALLBANKS"){
    //         dataArray=all;
    //     }
    //     else if (symbol=="MIDCAPS"){
    //         dataArray=mid;
    //     }
    //     seperateData(dataArray);

    // }, 5000);

    // setInterval(() => {
    //     console.log("DATA : ", data)

    // }, 5000);


    return (
        <>
            <label htmlFor="option">Choose a symbol:</label>
            <select name="symbol" id="symbol" value={symbol} onChange={(event) => {
                const selectedSymbol = event.target.value;
                setSymbol(selectedSymbol);
                setTTM(dates[selectedSymbol][0]);
            }}>
                <option value="MAINIDX">MAINIDX</option>
                <option value="FINANCIALS">FINANCIALS</option>
                <option value="ALLBANKS">ALLBANKS</option>
                <option value="MIDCAP">MIDCAP</option>
            </select>


            {/* <label htmlFor="option">Choose a TTM:</label>
            <select name="TTM" id="TTM" value={TTM} onChange={(event) => { setTTM(event.target.value) }}>
                <option value="06JUL23">06-Jul-2023</option>
                <option value="11JUL23">13-Jul-2023</option>
                <option value="20JUL23">20-Jul-2023</option>
                <option value="27JUL23">27-Jul-2023</option>
                <option value="03AUG23">03-Aug-2023</option>
                <option value="31AUG23">31-Aug-2023</option>

            </select> */}
            <label htmlFor="option">Choose a TTM:</label>
            <select name="TTM" id="TTM" value={TTM} onChange={(event) => { setTTM(event.target.value) }}>
                {dates[symbol].map((ttm) => (
                    <option key={ttm} value={ttm}>{ttm}</option>
                ))}
            </select>

            {data.map((item) => (
                <p>
                    {item.sequenceNumber},{item.symbol}, {item.timeStamp}, {item.LTP}, {item.LTQ}, {item.volume}
                </p>
            ))
            }

            {/* {symbol === 'MAINIDX' && (
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
            )} */}
        </>
    );
}

export default Option