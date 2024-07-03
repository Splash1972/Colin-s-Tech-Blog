const { User } = require('../models');

const getAllUsers = async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.findByPk(userId);
    if (!userData) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(userData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.update(req.body, { where: { id: userId } });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.destroy({ where: { id: userId } });
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};