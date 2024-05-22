const bcryptjs = require('bcryptjs');
const { Schema, SchemaTypes, model } = require("mongoose");

let schema = new Schema({
    displayName: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
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

/**
 * Implementation of password hashing before saving
 */
schema.pre('save', async function(next) {
    try {
        /**
         * Generate salt
         */
        let salt = await bcryptjs.genSalt(10);
        /**
         * Hash the password
         */
        let passwordHash = await bcryptjs.hash(this.password, salt);
        /**
         * Set the password
         */
        this.password = passwordHash;
        /**
         * Proceed
         */
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * valid password check
 */
schema.methods.isValidPassword = async function(password) {
    try {
        return await bcryptjs.compare(password, this.password);
    } catch (error) {
        return false;
    }
}

module.exports = model("User", schema);
