const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get All Blogs
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
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    res.status(200).json(dbBlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get blog by id
router.get('/:id', async (req, res) => {
  try {
    const dbBlogData = await Blog.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'created_at', 'contents'],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id.' });
      return;
    }
    res.status(200).json(dbBlogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new blog
router.post('/', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.create({
      title: req.body.title,
      contents: req.body.contents,
      user_id: req.session.user_id
    });
    res.status(200).json(dbBlogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update blog by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.update(
      {
        title: req.body.title,
        contents: req.body.contents
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!dbBlogData[0]) {
      res.status(404).json({ message: 'No blog found with this id.' });
      return;
    }
    res.status(200).json(dbBlogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete blog by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id.' });
      return;
    }
    res.status(200).json(dbBlogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
