const User = require('./Users');
const Blogs = require('./Blogs');

User.hasMany(Blogs, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blogs.belogsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Blogs };