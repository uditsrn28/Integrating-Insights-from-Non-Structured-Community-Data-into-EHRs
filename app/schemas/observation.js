var mongoose = require('mongoose');

var observationSchema = new mongoose.Schema({
    resourceType: String,
    id: String,//body-weight,
    status: String,//final,
    category: [
        {
            coding: [
                {
                    system: String, //http://hl7.org/fhir/observation-category,
                    code: String,//vital-signs,
                    display: String// Vital Signs
                }
            ]
        }
    ],
    code: {
        coding: [
            {
                system: String,//http://loinc.org,
                code: String, //29463-7,
                display: String //Body Weight
            }
        ]
    },
    effectiveDateTime: Date, //2018-10-03,
    performer: {
        reference: String, //Mordor Weight Loss
        display: String
    },
    valueQuantity: {
        value: Number,//185,
        unit: String,// lbs,
        system: String,//http://unitsofmeasure.org,
        code: [String] //[lb_av]
    },
    subject: {
        reference: String,
        display: String
    }
});

module.exports = mongoose.model('Observation', observationSchema);
