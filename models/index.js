const User = require('./Users');
const Blog = require('./Blog');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belogsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blog };