const router = require("express").Router();
const { Blog, User } = require('../models');

router.get('/', async (req, res) => {
  try {

    const blogData = await Blog.findAll({
      include: [
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

router.get('/homepage', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true}));
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  }catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/dashboard', async (req, res) => {
//   try {
//     const blogData = await Blog.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const blogs = blogData.map((blog) => blog.get({ plain: true }));

//     res.render('dashboard', {
//       blogs,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/dashboard", async (req, res) => {
  try {
    // Ensure the user is logged in
    if (!req.session.logged_in) {
      res.redirect("/login");
      return;
    }

    // Fetch the logged-in user's data
    const userData = await User.findByPk(req.session.user_id, {
      attributes: ["name"], // Only fetch the 'name' attribute
    });

    // Ensure user data exists
    if (!userData) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Fetch the blogs associated with the user
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id }, // Only fetch the user's blogs
      include: [{ model: User, attributes: ["name"] }],
    });

    // Serialize the data
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    const user = userData.get({ plain: true });

    // Render the dashboard with the user's blogs and name
    res.render("dashboard", {
      blogs,
      user, // Pass the user object to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  //if user is already logged in, reditect
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup')
})
module.exports = router;
