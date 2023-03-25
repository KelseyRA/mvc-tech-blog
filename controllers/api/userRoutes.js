const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  console.log('signup');
  try {
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // const plainUser = userData.get({ plain: true });
    // console.log(plainUser);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      // req.session.password = userData.password;
      req.session.loggedIn = true;

      // res.json(userData);
      res.redirect('/dashboard');
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    console.log(userData);
    if (!userData) {
      res
        .status(500)
        .json({ message: 'Incorrect username or password. Please try again' });
      return;
    }
    console.log(req.body.password);
    const validPassword = await userData.comparePassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again' });
      return;
    }
    req.session.save(() => {
      req.session.userData = userData;
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      return res.send({ user: userData, message: 'You are logged in' });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => res.status(204).end());
  } else {
    return res.status(500).end();
  }
});

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return res.json(userData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'post_title', 'post_text', 'created_at'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at',
          ],
          include: {
            model: Post,
            attributes: ['post_title'],
          },
        },
      ],
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    return res.json(userData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
