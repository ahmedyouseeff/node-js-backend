const express = require('express');
const mongoose = require('mongoose');

const app = express(); // Calling express to create the web server

app.use(express.json()); // MAke it able to deal with JSON files comes in body

/* Import model */
const Article = require('./models/Article'); // Manipulate the database of the articles table from this model
// In mongo db it go inside the module and check for the schema 

/* Connect Mongodb */
mongoose.connect('mongodb+srv://ahmedyouseeff9:2422354Aa@cluster0.jzdlub6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected successfully')
})
.catch((error) => {
    console.log(error);
})


app.get('/hello', (req, res) => { // Get the data through URL
    res.send('Hello');
});

app.get('/hi', (req, res) => { 
    res.send('hi');
});

app.post('/addComment', (req, res) => { 
    res.send('Comment has been added');
});

app.put('/updateComment', (req, res) => { 
    res.send('Comment has been updated');
});

app.delete('/deleteComment', (req, res) => { 
    res.send('Comment has been deleted');
});

// Params
app.get('/sum/:no1/:no2', (req, res) => {
    const sum = Number(req.params.no1) + Number(req.params.no2);
    res.send(`Summation: ${sum}`)
})

// Body + query params
app.get('/sayHello', (req, res) => {
    const name = req.body.name;
    const age = req.query.age;
    res.send(`Hello ${name} - ${age} years`);
})

// Send File
app.get('/helloFile', (req, res) => {
    // res.sendFile(__dirname + '/views/hello.html');

    const data = {
        name: 'Ahmed',
        age: 23,
        gender: 'Male'
    }

    // By default render say that you have a folder called view, so you don't have to write it
    // except you will change the folder name from view to anything else
    res.render("hello.ejs", data); 
})

/* ============== Article ENDPOINTS ================ */
app.post('/article', async (req, res) => {

    const newArticle = new Article();
    const reqBody = req.body;

    newArticle.title = reqBody.articleTitle;
    newArticle.body =  reqBody.articleBody;
    newArticle.numberOfLikes = reqBody.articleLikes; // Not in the model, not saved to db

    await newArticle.save();

    res.json({
        message: 'Article has been stored.',
        data: newArticle._doc
    });
});

app.get('/articles', async (req, res) => {
    const articles = await Article.find();

    res.send(articles);
});

app.get('/articles/:articleId', async (req, res) => {
    const id = req.params.articleId;
    try {
        const article = await Article.findById(id);
        return res.send(article);
    } catch(error) {
        return res.send(error.message);
    }
});

app.delete('/articles/:articleId', async (req, res) => {
    const id = req.params.articleId;
    try {
        await Article.findByIdAndDelete(id);
        return res.send('Article has been deleted successfully');
    } catch(error) {
        return res.send(error.message);
    }
});

/* ============== Listening to the App ================ */
// You can use nodemon to watch the changes on the server file: npx nodemon <file name>
app.listen(5000, () => { // Used one time in my project to make the client able to call the server (Port, HostName)
    console.log('I am listening from port 5000')
});