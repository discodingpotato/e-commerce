const { Schema, SchemaTypes, model } = require("mongoose");

const schema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'User'
    },
    referalCode: {
        type: SchemaTypes.String,
    },
    referedUsers: [{
        type: SchemaTypes.ObjectId,
        ref: 'User'
    }]
});

module.exports = model('user-referals', schema)