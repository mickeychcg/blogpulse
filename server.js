const express = require('express');
const db = require('./models');
const session = require('express-session');
const ejsLayouts = require('express-ejs-layouts');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(ejsLayouts);-

// session credentials
app.use(session({
  secret: 'Super secrettttt',
  resave: false,
  saveUninitialized: true
}));

// GET ALL

app.get('/', function(req, res) {
  db.post.findAll({
    include: [db.author]
  }).then(function(posts) {
    res.render('main/index', {posts});
  });
});

app.use('/authors', require('./routes/authors'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));
app.use('/tags', require('./routes/tags'));

app.listen(3000);