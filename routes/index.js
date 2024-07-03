const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
// const loginRoutes = require('./loginRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
// router.use('/', loginRoutes);

router.get('/', (req, res) => {
    res.render('homepage', { title: 'Home' });
  });

module.exports = router;
