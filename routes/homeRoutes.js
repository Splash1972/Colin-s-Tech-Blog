const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      attributes: ['id', 'title', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
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
    });

    const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/blog/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'created_at', 'contents'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
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
    });

    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id.' });
      return;
    }

    const blog = dbBlogData.get({ plain: true });
    res.render('single-blog', {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;