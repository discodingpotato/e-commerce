const { Schema, SchemaTypes, model } = require("mongoose");

const schema = new Schema({
    strategyId: {
        type: SchemaTypes.String
    },
    displayName: {
        type:SchemaTypes.String,
    },
    provider: {
        type: SchemaTypes.String
    },
    email: {
        type: SchemaTypes.String
    },
    profile: {
        type: SchemaTypes.String
    }
});

module.exports = model('oauth-logins', schema)