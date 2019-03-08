const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:name', function (req, res) {
  db.tag.findOne( {
    where: {name: req.params.name}
  }).then(function(tag) {
    tag.getPosts().then(function(posts) {
      res.render('tags/show', {tag, posts})
    });
  });
});


// POST route to tags
router.post('/', function(req,res) {
  db.post.findById(parseInt(req.body.postId))
    .then(function(post) {
      db.tag.findOrCreate({
        where: {name: req.body.name}      
      }).spread(function(tag, created) {
        post.addTag(tag).then(function(tag) {
          res.redirect('/posts/' + post.id);
        });
      });
    });
  });

module.exports = router;