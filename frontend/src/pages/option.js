import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

let socket = io("http://localhost:4000")

socket.on("connect", () => {
    console.log(`connected with id : ${socket.id}`)
})

const Option = () => {

    const [data, setData] = useState([])

    useEffect(() => {

        const callback = (data) => setData(prevData => [...prevData, data]);

        socket.on("option-data", (jsonArray) => {
            console.log(jsonArray)
            callback(jsonArray)
            console.log("Length : ", data.length)
        })


        return () => {
            socket.off("option-data", callback);
        };
    }, [])







    return (
        <>
            <div>option</div>
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