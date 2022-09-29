const router = require('express').Router();
const {  User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User},
                { model: Comment}
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            post,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// use withAuth to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // if user is logged in, redirect to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

router.get('/signup', async (req, res) => {
    try {
        res.render('signup', {
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/newpost', async (req, res) => {
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
    });

const user = userData.get({ plain: true });

    try {
        res.render('newpost', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/editpost/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }],
    });

const post = postData.get({ plain: true });

    try {
        res.render('editpost', {
            post,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/comment/:id', async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [
            { model: User },
        ],
    });

    const comment = postData.get({ plain: true });

    try{
        res.render('comment', {
           Post
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/comment', async (req, res) => {
    const commentData = await Comment.findByPk(req.params.id, {
        include: [
            { model: Post }
        ],
    });

    const comment = commentData.get({ plain: true });

    try{
        res.render('comment', {
           comment,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;