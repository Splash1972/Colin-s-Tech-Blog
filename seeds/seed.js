const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.js');
const blogData = require('./blogData.js');
const commentData = require('./commentData.js');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const blogs = await Blog.bulkCreate(blogData);

  const comments = await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
