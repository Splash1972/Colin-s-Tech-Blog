const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('dashboard', { title: 'Dashboard' });
});

module.exports = router;
