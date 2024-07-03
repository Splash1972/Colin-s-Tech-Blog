const router = require('express').Router();

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({ include: User }); // Fetch blogs with associated user
  res.render('homepage', {
    title: 'Homepage',
    blogs,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
