const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt');
const config = require('../config/db.config');

const express = require('express');
const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

// Middleware for requiring sign-in
const requireSignIn = expressJwt({
    secret: config.jwtSecret,
    algorithms: ['HS256']
});

// Route for user sign-in
router.post('/auth/signin', authCtrl.signIn);

// Route for user sign-out
router.get('/auth/signout', authCtrl.signOut);

router.get('/example-protected-route', requireSignIn, (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    user: req.auth
  });
});

// Additional protected routes
router.get('/add-book', requireSignIn, (req, res) => {
  // Logic for adding a book
  res.json({ message: "Add Book Route - Protected", user: req.auth });
});

router.get('/delete-product-by-title', requireSignIn, (req, res) => {
  // Logic for deleting a product by title
  res.json({ message: "Delete Product by Title Route - Protected", user: req.auth });
});

router.get('/search', requireSignIn, (req, res) => {
  // Logic for searching by title
  res.json({ message: "Search by Title Route - Protected", user: req.auth });
});

router.get('/update-product-by-title', requireSignIn, (req, res) => {
  // Logic for updating a book by title
  res.json({ message: "Update Book by Title Route - Protected", user: req.auth });
});


module.exports = router;
