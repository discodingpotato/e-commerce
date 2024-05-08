const { Schema, SchemaTypes, model } = require("mongoose");

const schema = new Schema({
    displayName: {
        type: SchemaTypes.String,
        // required: true,
        // unique: true,
    },
    password: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    phoneno: {
        type: SchemaTypes.Number,
        required: true,
        unique: true,
    },
    isBlocked: {
        type: SchemaTypes.Boolean,
        default: false
    },
    isVerified: {
        type: SchemaTypes.Boolean,
        default: false
    },
    isAdmin: {
        type: SchemaTypes.Boolean,
        default: false
    },
    
}, { timestamps: true });

module.exports = model("User", schema)