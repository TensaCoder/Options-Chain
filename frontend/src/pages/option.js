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


    let cleanData = (dataArray) => {
        for (let i = 0; i < dataArray.length; i++) {
            let currentData = dataArray[i];


            //  MAINIDX20JUL2318400PE
            //  MAINIDX
            if (currentData.symbol.includes(symbol) != true) {
                continue;
            }
            if (currentData.symbol.includes(TTM) != true){
                continue;
            }
            if (currentData.symbol.includes(optionType) != true){
                continue;
            }

            console.log("Symbol name : ", currentData.symbol)
            setData(prevData => [...prevData, currentData])


            
        }
        console.log("Length : ", data)
    }

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
            <div className='container'>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">symbol name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={symbol} onChange={(event) => { setSymbol(event.target.value) }} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>




            </div>



            {data.map((item)=>{
                return (
                    <p>
                        {item.sequenceNumber},{item.symbol}, {item.timeStamp}, {item.LTP}, {item.LTQ}, {item.volume}
                    </p>
                )
            })}

        </>
    )
}

export default Option