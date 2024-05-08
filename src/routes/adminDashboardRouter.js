const express = require('express');
const router = express.Router();

const adminControllers = require('../controllers/adminControllers')

/**
 * To Implement active tab mechanism in navbar, just passing current route to the frontend
 */

router.use((req, res, next) => {
    console.log(req.url)
    res.locals.currentPath = req.url;
    next();
})

/**
 * Main Dashboard
 */

router.get('/', (req, res) => {
    res.render('dashboard');
});

/**
 * Product Categorties
 */

router.get('/categories', adminControllers.renderCategories);
router.get('/categories/new', (req, res) => {
    res.render('newCategory')
});

router.post('/categories', adminControllers.renderCategories);

/**
 * List Products
 */

router.get('/products', (req, res) => {
    res.render('products');
});

/**
 * Users
 */

router.get('/users', adminControllers.renderUsers);
router.delete('/users/:userId', adminControllers.blockUser);
router.patch('/users/:userId/unblock', adminControllers.unblockUser)

module.exports = router