const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

//comment belongsto user
//comment belongsto post

//post belongsto user
//post hasmany comment

//user hasmany post
//user hasmany comment


module.exports = { Comment, Post, User };