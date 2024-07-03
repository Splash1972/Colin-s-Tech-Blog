const { Blog } = require('../models');

const getAllBlogs = async (req, res) => {
  try {
    const blogData = await Blog.findAll();
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createBlog = async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogData = await Blog.findByPk(blogId);
    if (!blogData) {
      res.status(404).json({ message: 'Blog not found' });
    } else {
      res.status(200).json(blogData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBlog = await Blog.update(req.body, { where: { id: blogId } });
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    await Blog.destroy({ where: { id: blogId } });
    res.status(204).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};