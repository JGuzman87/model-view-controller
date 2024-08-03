const router = require('express').Router();
const { User } = require('../../models');

//if a POST request is made to /api/users, a new user is created.
router.post('/', async (req, res) => {
    try{
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            req.statusCode(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

