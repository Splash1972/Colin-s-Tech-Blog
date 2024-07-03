const router = require('express').Router();
const apiRoutes = require('./api');
const htmlRoutes = require('./htmlRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/', htmlRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', loginRoutes);

router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    res.render('homepage', { title: 'Home' });
  });

module.exports = router;
