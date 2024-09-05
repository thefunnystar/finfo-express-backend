const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const newUser = new User({ email, password, name });
      await newUser.save();
      // do I need to redirect if my front end is separate?
      res.redirect('/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

/* GET users listing. */
router.get('/login', function(req, res, next) {
  // front end
  res.render('login');
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input data here //////

        // should I use email instead of id?
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if( !isMatch ) {
            return res.status(400).send('Invalid email or password');
        }
        // front end
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/logout', (req, res) => {
  // Clear session or token

  res.redirect('/login');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: userData });
});

module.exports = router;
