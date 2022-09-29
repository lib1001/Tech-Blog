const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
	Post.findAll({})
	  .then((dbPostData) => {
		const posts = dbPostData.map((post) => post.get({ plain: true }));
		res.render('homepage', {
		  posts,
		  logged_in: req.session.logged_in
		});
	  })
	  .catch((err) => {
		console.log(err);
		res.status(500).json(err);
	  });
  });

  router.get('/post/:id', (req, res) => {
	Post.findOne({
	  where: {
		id: req.params.id,
	  },
	})
	  .then((dbPostData) => {
		if (!dbPostData) {
		  res.status(404).json({ message: 'No post found with this id!' });
		  return;
		}
		const post = dbPostData.get({ plain: true });
		res.render('onePost', {
		  post,
		  logged_in: req.session.logged_in,
		});
	  })
	  .catch((err) => {
		console.log(err);
		res.status(500).json(err);
	  });
  });
  
  router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
	  res.redirect('/');
	  return;
	}
	res.render('login');
  });
  
  router.get('/signup', (req, res) => {
	res.render('signup');
  });
  
  

module.exports = router;
