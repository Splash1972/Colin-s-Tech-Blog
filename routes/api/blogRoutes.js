const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Fetch all blogs
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      attributes: ['id', 'title', 'bloginfo', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
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
    res.render('dashboard', { blogs }); // Render dashboard.handlebars with blogs data
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json(err);
  }
});


// blogs with ids

router.get('/:id', (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'created_at', 'bloginfo'],
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
  })
  .then(dbBlogData => {
    if (!dbBlogData) {
      res.status(404).json({ message: 'No Blog found with this id.' });
      return;
    }
    res.json(dbBlogData);
  })
  .catch(err => res.status(500).json(err));
});

//Post

router.post('/', withAuth, (req, res) => {
  console.log(req.body);
  Blog.create({
      title: req.body.title,
      bloginfo: req.body.bloginfo,
      user_id: req.session.user_id
  })
      .then(dbBlogData => res.json(dbBlogData))
      .catch(err => res.status(400).json(err));
});

// Put with id's

router.put('/:id', withAuth, (req, res) => {
  Blog.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbBlogData => {
    if (!dbBlogData) {
      res.status(404).json({ message: 'No blog found with this id.'});
      return;
    }
    res.json(dbBlogData);
  })
  .catch(err => res.status(400).json(err));
});

// delete

router.delete('/:id', withAuth, (req, res) => {
  Blog.destroy({
      where: {
          id: req.params.id
      }
  })
      .then(dbBlogData => {
          if (!dbBlogData) {
              res.status(404).json({ message: 'No blog found with this id.' });
              return;
          }
          res.json(dbBlogData);
      })
      .catch(err => res.status(400).json(err));
})

module.exports = router;
