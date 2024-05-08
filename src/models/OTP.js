const { Schema, SchemaTypes, model } = require("mongoose");

const schema = new Schema({
    userId: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    otp: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    createdAt : {
        type: SchemaTypes.Date,
        default: new Date()
    }
});

module.exports = model('verifyOTP', schema);