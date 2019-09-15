const express = require('express');
const path = require('path');

// Init App
const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Home Route
app.get('/', (req,res) => {
  let articles = [
    {
      id: 1,
      title: 'article one',
      author: 'Frank',
      body: 'this is article one'
    },
    {
      id: 2,
      title: 'article two',
      author: 'Jose',
      body: 'this is article two'
    },
    {
      id: 3,
      title: 'article three',
      author: 'Luis',
      body: 'this is article three'
    },
    {
      id: 4,
      title: 'article four',
      author: 'Juan',
      body: 'this is article four'
    },
  ]
  res.render('index', {
    title: 'Home'
  });
});

app.get('/articles/add', (req,res) => {
  res.render('add_articles', {
    title: 'Add Articles'
  });
});

// Start Server
app.listen(3000, () => console.log('Server started on port 3000'));