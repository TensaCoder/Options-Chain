const app = require("express")();

app.get("/", (req, res) => res.send("hello!"));

app.get("/stream", (req, res) => {

    console.log('Client connected');
    res.setHeader('Content-Type', 'text/event-strean');
    res.setHeader('Access - Control - ALlow - 0rigin', '*')

    // call function 


    res.on('close', () => {
        console.log('Client closed connection');
        res.end()
    })
});


app.listen(8080)
console.log("Listening on 8080") 