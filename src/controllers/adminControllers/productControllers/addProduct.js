const { rename, mkdir } = require("fs");
const productCategory = require("../../../models/productCategory");
const product = require("../../../models/product");

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const addProduct = async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
  /**
   * Passed values
   */
  const { name, brand, price, category: categoryId, quantity, description, specifications } = req.body;
  /**
   * Find Category ? for sure?
   */
  // console.log(req.body);
  // res.json({ success: true })
  // return;
  let isCategoryAvailable = await productCategory.findById(categoryId);
  /**
   * Convert uploaded image file names into an array
   */
  const fileNames = req.files.map(item => item.originalname);
  /**
   * Create the product
   */
  let newProduct = await product.create({
    name, brand, category: isCategoryAvailable._id, quantity, price, images: fileNames, description, specifications
  });
  /**
   * Rename product image folder name into product id
   */
  rename('src/public/images/products/haha', `src/public/images/products/${newProduct._id}`, (err) => {
    if (err) {
      console.error('Error renaming folder:', err);
    } else {
      console.log(`image folder renamed into ${newProduct._id}`);
    }
  });
  /**
   * By renaming "haha", we need a folder to store the new product files temporary
   * create a new folder
   */
  mkdir('src/public/images/products/haha', (err) => {
    if (err) {
      console.error('Error creating folder', err);
    } else {
      console.log(`New Folder created`);
    }
  })
  // Return success to frontend
  res.status(200).json({ success: true });
}

module.exports = addProduct;