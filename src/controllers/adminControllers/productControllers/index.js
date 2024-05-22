const addProduct = require("./addProduct");
const blockProduct = require("./blockProduct");
const deleteProduct = require("./deleteProduct");
const editProduct = require("./editProduct");
const listProducts = require("./listProducts");
const renderAddProduct = require("./renderAddProduct");
const renderEditProduct = require("./renderEditProduct");

module.exports = {
    addProduct,
    editProduct,
    blockProduct,
    deleteProduct,

    listProducts,
    
    renderEditProduct,
    renderAddProduct,
}