const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

//comment belongsto user
Comment.belongsto(User, {
    foreignKey: 'user_id',
});
//comment belongsto post
Comment.belongsto(Post, {
    foreignKey: 'post_id',
});
//post belongsto user
Post.belongsto(User, {
    foreignKey: 'user_id',
});
//post hasmany comment
Post.hasmany(Comment, {
    foreignKey: 'post_id',
});
//user hasmany post
User.hasmany(Post, {
    foreignKey: 'user_id',
});
//user hasmany comment
User.hasmany(Comment, {
    foreignKey: 'user_id',
});


module.exports = { Comment, Post, User };