const Post = require('./post');
const Comment = require('./comment');
const User = require('./user');

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
  hooks: true,
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  hooks: true,
});

Comment.belongsTo(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  hooks: true,
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  hooks: true,
});

User.hasMany(Post, {
  foreignKey: 'user_id',
});

module.exports = { User, Post, Comment };
