const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

//comment belongsto user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
//comment belongsto post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});
//post belongsto user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});
//post hasmany comment
Post.hasMany(Comment, {
    foreignKey: 'post_id',
});
//user hasmany post
User.hasMany(Post, {
    foreignKey: 'user_id',
});
//user hasmany comment
User.hasMany(Comment, {
    foreignKey: 'user_id',
});


module.exports = { Comment, Post, User };