const express = require('express')
const connectDB = require('./db'); // Import the connectDB function


// Connect to the database
connectDB();


const app = express()


//  Use body parameters
app.use(express.json())


app.get('/home', (req, res) => {
    res.send('welcome')
})


// ************************************************
// ************** Request Parameters **************
// ************************************************

//? Path Parameters
app.get('/sum/:number1/:number2', (req, res) => {
    // console.log(req.params.number1)
    const number1 = parseFloat(req.params.number1)
    const number2 = parseFloat(req.params.number2)
    res.send(`Result is: ${number1 + number2}`);
})

//? Query Parameters
app.get('/multiply', (req, res) => {
    // console.log(req.query)
    const number1 = parseFloat(req.query.number1)
    const number2 = parseFloat(req.query.number2)
    res.send(`Result is: ${number1 * number2}`);
})

//? Body Parameters
app.get('/subtract', (req, res) => {
    // console.log(req.body)
    const number1 = parseFloat(req.body.number1)
    const number2 = parseFloat(req.body.number2)
    res.send(`Result is: ${number1 - number2}`);
})


// ************************************************
// ************************************************
// ************************************************

app.get('/book/:bookId', (req, res) => {
    // console.log(req.params.number1)
    const bookId = req.params.bookId
    // res.sendFile(__dirname + "/views/book.ejs");
    res.render('book.ejs', {
        bookId: bookId
    })
})

// Start the server and listen on port 8000, logging a welcome message
app.listen(8000, () => {
    console.log('welcome to port 8000');
});
