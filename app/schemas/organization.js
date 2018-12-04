var mongoose = require("mongoose");

var organizationSchema = new mongoose.Schema({
    resourceType: String,
    id: String,
    name: String,
    type: String,
    telecom: [
        {
            system: String,
            value: String
        }
    ],
    address: [
        {
            line: Array,
            city: String,
            state: String,
            postalCode: String,
            country: String
        }
    ],
    endpoint: [
        {
            reference: String
        }
    ]
});

module.exports = mongoose.model('Organization', organizationSchema);