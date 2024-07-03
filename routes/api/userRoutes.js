const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all users
router.get('/', async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Blog,
          attributes: ['id', 'title', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Blog,
            attributes: ['title']
          }
        }
      ]
    });

    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id.' });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.logged_in = true;
      res.json(dbUserData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!dbUserData) {
      res.status(400).json({ message: 'No user found with this username.' });
      return;
    }

    const validPassword = await dbUserData.comparePassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.logged_in = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Update user by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id
      }
    });

    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id.' });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete user by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const dbUserData = await User.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!dbUserData) {
      res.status(404).json({ message: 'No user found with this id.' });
      return;
    }
    res.json(dbUserData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
