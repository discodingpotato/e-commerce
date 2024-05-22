const { Schema, model, SchemaTypes } = require("mongoose");

const schema = new Schema({
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    brand: {
        type: SchemaTypes.String,
        required: true,
    },
    category: {
        type: SchemaTypes.ObjectId,
        required: true,
        ref: "product-categories",
    },
    quantity: {
        type: SchemaTypes.Number,
        required: true,
    },
    price: {
        type: SchemaTypes.Number,
        required: true,
    },
    images: [
        {
            type: SchemaTypes.String,
            required: true,
        },
    ],
    description: {
        type: SchemaTypes.String,
        required: true,
    },
    specifications: [{
        type: SchemaTypes.String
    }],
    isBlocked: {
        type: SchemaTypes.Boolean,
        default: false,
    },
    isDeleted: {
        type: SchemaTypes.Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = model('product-details', schema);