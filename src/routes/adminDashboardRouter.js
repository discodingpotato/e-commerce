const express = require('express');
const router = express.Router();

const categoryControllers = require('../controllers/adminControllers/categoryControllers');
const productControllers = require('../controllers/adminControllers/productControllers');
const userControllers = require('../controllers/adminControllers/userControllers');
const { uploadProductImages } = require('../middlewares/uploadProductImages');

const uploadNone = require('../middlewares/uploadNone');
const { uploadUpdateImages } = require('../middlewares/uploadUpdateImages');
const postNewUpdate = require('../controllers/adminControllers/postNewUpdate');
const { default: axios } = require('axios');
const updates = require('../models/updates');
const { editProductImages } = require('../middlewares/editProductImages');

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
 * -------------------------------------------------------------------------------
 * ----------------------------- Category Management -----------------------------
 * -------------------------------------------------------------------------------
 */

/**
 * Base, render all categoriess
 */
router.get('/categories', categoryControllers.renderCategories);
/**
 * Umm, what about creating a new category? do it!
 */
router.get('/categories/new', (req, res) => {
    res.render('category/newCategory')
});
/**
 * New category? create!
 */
router.post('/categories', categoryControllers.addNewCategory);
/**
 * Render, editing
 */
router.get('/categories/:categoryId/edit', categoryControllers.renderEditCategory)
/**
 * Any changes? just edit it
 */
router.put('/categories/:categoryId', categoryControllers.editCategory)
/**
 * No need? delete option is here             |         Have a problem on this : )
 */
router.delete('/categories/:categoryId', categoryControllers.deleteCategory)








/**
 * ------------------------------------------------------------------------------
 * ----------------------------- Product Management -----------------------------
 * ------------------------------------------------------------------------------
 */

router.get('/products', productControllers.listProducts);
router.get('/products/add', productControllers.renderAddProduct);
router.post('/products', uploadProductImages, productControllers.addProduct)
router.get('/products/:productId', productControllers.renderEditProduct);
router.put('/products/:productId', editProductImages, productControllers.editProduct)





/**
 * -------------------------------------------------------------------------------
 * ------------------------------------ Users ------------------------------------
 * -------------------------------------------------------------------------------
 */

/**
 * The user list, 
 */
router.get('/users', userControllers.renderUsers);
/**
 * Block user, don't allow to enter em;
 */
router.delete('/users/:userId', userControllers.blockUser);
/**
 * Unblock
 */
router.patch('/users/:userId/unblock', userControllers.unblockUser);

/**
 * Own implementaion, inspired from https://gemini.google.com/updates
*/

router.get('/updates', (req, res) => {
    res.render('createUpdates');
});

router.post('/updates', uploadUpdateImages, postNewUpdate);

router.get('/updates/packages', async (req, res) => {
    let responce = await axios.get(`https://www.npmjs.com/search/suggestions?q=${req.query.search}`);
    let packageData = responce.data.map(pkg => ({
        name: pkg.name,
        description: pkg.description
    }))
    res.json({ success: true, packageData })
})

module.exports = router