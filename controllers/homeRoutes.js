const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
	Post.findAll({
	  include: [
		{
		  model: Comment,
		  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
		  include: {
			model: User,
			attributes: ['username'],
		  },
		},
		{
		  model: User,
		  attributes: ['username'],
		},
	  ],
	})
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
	  include: [
		{
		  model: Comment,
		  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
		},
		{
		  model: User,
		  attributes: ['username'],
		},
	  ],
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
  
  
//   router.get('/posts-comments', (req, res) => {
// 	Post.findOne({
// 	  where: {
// 		id: req.params.id,
// 	  },
// 	  attributes: ['id', 'content', 'title', 'created_at'],
// 	  include: [
// 		{
// 		  model: Comment,
// 		  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
// 		  include: {
// 			model: User,
// 			attributes: ['username'],
// 		  },
// 		},
// 		{
// 		  model: User,
// 		  attributes: ['username'],
// 		},
// 	  ],
// 	})
// 	  .then((dbPostData) => {
// 		if (!dbPostData) {
// 		  res.status(404).json({ message: 'No post found with this id' });
// 		  return;
// 		}
// 		const post = dbPostData.get({ plain: true });
  
// 		res.render('posts-comments', {
// 		  post,
// 		  logged_in: req.session.logged_in,
// 		  username: req.session.username,
// 		});
// 	  })
// 	  .catch((err) => {
// 		console.log(err);
// 		res.status(500).json(err);
// 	  });
//   });

module.exports = router;
