const router = require("express").Router();
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  try {

    const blogData = await Blog.findAll({
      incule: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    //serialize data
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    //pass serialize data 
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
