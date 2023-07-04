const app = require("express")();
const cors = require('cors');

port = 8092

app.use(cors());


app.get("/", (req, res) => res.send("hello!"));

// app.use('/api/auth', require('./routes/auth'));

app.get("/stream", (req, res) => {

    console.log('Client connected');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*')

    // call function 


    res.on('close', () => {
        console.log('Client closed connection');
        res.end()
    })
});

app.use("/api/optionchain", require('./routes/optionChain'));


app.listen(port)
console.log(`Backend listening on port : ${port}`) 