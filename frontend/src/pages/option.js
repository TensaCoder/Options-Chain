import React, { useEffect } from 'react'
import { io } from 'socket.io-client';

let socket = io("http://localhost:4000")

socket.on("connect", () => {
    console.log(`connected with id : ${socket.id}`)
})

const Option = () => {

    useEffect(() => {
        
        socket.on("option-data", (jsonArray) => {
            // console.log(jsonArray)
            if (jsonArray.length != 0) {
                console.log(jsonArray)
            }
        })
    
    //   return () => {
    //     second
    //   }
    }, [])

    
    





    return (
        <div>option</div>
    )
}

export default Option