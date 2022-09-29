const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('myPosts',{
      layout: 'dashboard',
      posts
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('newPost',{
    layout: 'dashboard',
  });
});

router.get('/posts', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [Users],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('allPosts', { 
      posts
     });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('editPost',{
        layout: 'dashboard',
        post
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;