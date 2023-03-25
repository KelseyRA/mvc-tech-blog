const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('./:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    return res.status(200).json(newComment);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updated = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updated) {
      const updatedComment = await Comment.findOne({
        where: { id: req.params.id },
      });
      return res.status(200).json({ post: updatedComment });
    }
    throw new Error('Post not found');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      return res.status(404).json({ message: 'No comment found with this id' });
    }

    return res.status(200).json(commentData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
