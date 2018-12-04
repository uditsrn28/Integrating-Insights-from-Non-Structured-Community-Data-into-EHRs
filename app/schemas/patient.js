var mongoose = require("mongoose");

var patientSchema = new mongoose.Schema({
    resourceType : String,
    id: String,
    active: Boolean,
    name: [
        {
            use: String,
            family: String,
            text: String,
            given: Array
        }
    ],
    telecom: [
        {
            system: String,
            value: String,
            use: String,
            rank: Number
        }
    ],
    gender: String,
    birthDate: String,
    address: [
        {
          use: String,
          type: String,
          text: String,
          line: Array,
          city: String,
          district: String,
          state: String,
          postalCode: String
        }
    ],
    contact: [
        {
          relationship: [
            {
              coding: [
                {
                  system: String,
                  code: String
                }
              ]
            }
          ],
          organization: {
            reference: String,
            display: String
          }
        }
    ],
    managingOrganization: {
        reference: String,
        display: String
    }
});

patientSchema.virtual("fullName").get(function(){
    return this.name.given[0] + " " + this.name.given[1];
});

module.exports = mongoose.model('Patient', patientSchema);