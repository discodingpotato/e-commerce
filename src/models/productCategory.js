const { Schema, SchemaTypes, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    isBlocked: {
        type: SchemaTypes.Boolean,
        default: false
    },
    isDeleted: {
        type: SchemaTypes.Boolean,
        default: false
    }
});

/**
 * Soft Delete? cannot find you : )
 */

// schema.pre('find', function () {
//     this.where({isDeleted: false});
// })

// schema.pre('findOne', function () {
//     this.where({isDeleted: false});
// })

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