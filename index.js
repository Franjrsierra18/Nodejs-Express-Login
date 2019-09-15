const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to DB
mongoose.connect('mongodb+srv://franjrsierra18:Sierra2991@registro-travel-agency-bhwrc.mongodb.net/db_Node?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

//Check connection
db.once('open', () => {
  console.log('Connected to MongoDB...');
})

// Check for DB errors
db.on('error', (error) => {
  console.log(error);
})

// Init App
const app = express();

//Bring in Models
const Article = require('./models/Article');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, '/public')));

// Home Route
app.get('/', (req,res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Home',
        articles: articles
      });
    }
  })
});

app.get('/article/:id', (req,res) => {
  Article.findById(req.params.id, (err,article) => {
    res.render('article', {
      article:article
    });
  });
});

app.get('/articles/add', (req,res) => {
  res.render('add_articles', {
    title: 'Add Articles'
  });
});

app.post('/articles/add', (req,res) => {
  const article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;
  article.save((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  })
})

// Start Server
app.listen(3000, () => console.log('Server started on port 3000'));