const { Schema, SchemaTypes, model } = require("mongoose");

const schema = new Schema({
    date: {
        type: SchemaTypes.Date,
        required: true,
        default: new Date()
    },
    description: {
        type: SchemaTypes.String,
        required: true
    },

    what: {
        type: SchemaTypes.String,
        required: true
    },

    why: {
        type: SchemaTypes.String,
        required: true
    },

    changes: [{
        type: SchemaTypes.String,
        // required: true
    }],

    newPackages: [
        {
            packageName: {
                type: SchemaTypes.String
            },
            packageDescription: {
                type: SchemaTypes.String
            },
        }
    ],
    // images: [
    //     {
    //         type: SchemaTypes.String
    //     }
    // ]
});

module.exports = model('project-updates', schema);