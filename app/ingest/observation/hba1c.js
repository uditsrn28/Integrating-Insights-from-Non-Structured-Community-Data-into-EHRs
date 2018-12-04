var Observation = require('../../schemas/observation');
module.exports = function (record, dbToRecordNames, patient) {
    return new Observation({
        resourceType: 'Observation',
        id: 'hba1c',
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
                    code: "4548-4",
                    display: "Hemoglobin A1c"
                }
            ]
        },
        effectiveDateTime: record[dbToRecordNames['EventDate']],
        performer: {
            reference: record[dbToRecordNames['orgID']]
        },
        valueQuantity: {
            value: Number(record[dbToRecordNames['HBA1C']]),
            unit: '%',
            system: 'https://www.diabetes.co.uk/hba1c-units-converter.html',
            code: ['dcct']
        },
        subject: {
            reference: patient.id,
            display: patient.name.text
        }
    });
}