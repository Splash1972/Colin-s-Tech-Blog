const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // Authenticate user logic here
  res.redirect('/');
});

module.exports = router;
