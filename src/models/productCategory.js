const { Schema, SchemaTypes, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    isDeleted: {
        type: SchemaTypes.Boolean,
        required: true,
        unique: true
    },
    isBlocked: {
        type: SchemaTypes.Boolean,
        required: true,
        unique: true
    },
});

module.exports = model('product-categories', schema);

/**
 * Note : - Just a plan
 * 
 * Instead of making isDeleted, isBlocked, is... etc., Just add status field as type of Number
 * 
 * 0 - Live
 * 1 - Blocked
 * 2 - Deleted (soft)
 * 3,4,5 - [any status texts?]
 */