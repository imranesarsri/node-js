const express = require('express')
const connectDB = require('./db'); // Import the connectDB function
const Article = require('./models/Article');

const app = express()
//  Use body parameters
app.use(express.json())



// =================================================
// ************ Connect to the database ***********
// =================================================
// *** Start the server and listen on port 8000, ***
// *********** logging a welcome message ***********
// =================================================


connectDB().then(() => {
    app.listen(8000, () => {
        console.log('WELCOME TO PORT 8000');
    });
}).catch(error => {
    console.error('Failed to connect to the database', error);
});



// ================================================
// ************** Request Parameters **************
// ================================================


app.get('/home', (req, res) => {
    res.send('welcome')
})


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



// ================================================
// ************** Create new article **************
// ================================================

app.get('/book/:bookId', (req, res) => {
    // console.log(req.params.number1)
    const bookId = req.params.bookId
    // res.sendFile(__dirname + "/views/book.ejs");
    res.render('book.ejs', {
        bookId: bookId
    })
})

// ? create new article
app.post('/newArticle', (req, res) => {
    console.log(req.body)
    const Title = req.body.title
    const Body = req.body.body

    if (Title && Body) {
        const newArticle = new Article
        newArticle.title = Title
        newArticle.body = Body
        newArticle.numberOfLikes = 0

        newArticle.save().then(
            res.send('Create new Post is successfully')
        )
    } else {
        res.send('Please file body Parameters')
    }
})


// ? get all articles
app.get('/articles', async (req, res) => {
    const Articles = await Article.find()
    res.json(Articles)
})


//? Get article
app.get('/article/:articleID', async (req, res) => {
    const articleID = req.params.articleID;
    try {
        const article = await Article.findById(articleID);
        if (!article) {
            return res.status(404).send("Article not found");
        }
        res.json(article);
    } catch (error) {
        console.log("Error while reading article with ID ", articleID, error);
        return res.status(500).send("Error fetching article with ID " + articleID);
    }
});


//? Delete article
app.delete('/article/:articleID', async (req, res) => {
    const articleID = req.params.articleID;
    try {
        const article = await Article.findByIdAndDelete(articleID);
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }
        res.json({ message: `The article titled "${article.title}" has been successfully deleted.` });
    } catch (error) {
        console.error("Error while deleting article with ID ", articleID, error);
        return res.status(500).json({ message: "Error deleting article with ID " + articleID, error: error.message });
    }
});


//? Render the Articles page using EJS template engine
app.get('/showArticles', async (req, res) => {
    try {
        const articles = await Article.find();
        res.render('Articles.ejs', {
            allArticles: articles,
            error: null
        });
    } catch (error) {
        console.error("Error fetching articles", error);
        res.render('Articles.ejs', {
            allArticles: [],
            error: "Error fetching articles. Please try again later."
        });
    }
});
