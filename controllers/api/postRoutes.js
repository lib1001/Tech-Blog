const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [{
				model: User,
				attributes: ['username'],
			},
    {
      model: Comment,
      attributes: ['id', 'comment_content', 'date_created', 'user_id', 'post_id']
    }
    ],
		});
    res.status(200).json(postData.reverse());
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [{
				model: User,
				attributes: ['username'],
			},
    {
      model: Comment,
      attributes: ['id', 'comment_content', 'date_created', 'user_id', 'post_id']
    }
    ],
		});
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
})


router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
      const postData = await Post.update(
          req.body, { where: { id: req.params.id }
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with that id!' });
        return;
      }
      res.status(200).json(postData);
  } catch (err) {
      res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with that id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;