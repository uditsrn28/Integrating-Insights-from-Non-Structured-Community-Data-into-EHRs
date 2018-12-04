var Observation = require('../../schemas/observation');
module.exports = function (record, dbToRecordNames, patient) {
    return new Observation({
        resourceType: 'Observation',
        id: 'body-weight',
        status: 'final',
        category: [
            {
                coding: [
                    {
                        system: "http://hl7.org/fhir/observation-category",
                        code: "vital-signs",
                        display: "Vital Signs"
                    }
                ]
            }
        ],
        code: {
            coding: [
                {
                    system: "http://loinc.org",
                    code: "29463-7",
                    display: "Body Weight"
                }
            ]
        },
        effectiveDateTime: record[dbToRecordNames['EventDate']],
        performer: {
            reference: record[dbToRecordNames['orgID']]
        },
        valueQuantity: {
            value: Number(record[dbToRecordNames['weight']]),
            unit: 'kg',// lbs,
            system: 'http://unitsofmeasure.org',
            code: ['lb_av'] //[lb_av]
        },
        subject: {
            reference: patient.id,
            display: patient.name.text
        }
    });
}