const addNewCategory = require("./category/addNewCategory");
const blockCategory = require("./category/blockCategory");
const deleteCategory = require("./category/deleteCategory");
const editCategory = require("./category/editCategory");
const renderCategories = require("./category/renderCategories");

const blockUser = require("./user/blockUser");
const renderUsers = require("./user/renderUsers");
const unblockUser = require("./user/unblockUser");

module.exports = {
    renderUsers,
    blockUser,
    unblockUser,

    addNewCategory,
    blockCategory,
    deleteCategory,
    editCategory,
    renderCategories
}