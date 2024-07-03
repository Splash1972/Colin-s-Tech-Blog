const router = require('express').Router();

const blogRoutes = require('./blogController');
const userRoutes = require('./userController');

router.use('/blogs', blogRoutes);
router.use('/users', userRoutes);

module.exports = router;
