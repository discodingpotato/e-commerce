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
    is_block: {
        type: SchemaTypes.Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = model('Product', schema);