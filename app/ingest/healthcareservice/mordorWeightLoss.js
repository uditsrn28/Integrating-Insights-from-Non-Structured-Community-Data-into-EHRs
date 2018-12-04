module.exports = function (record, dbToRecordNames) {
    return {
        resourceType: 'HealthcareService',
        indetifier: record[dbToRecordNames['orgID']],//body-weight,
        active: true, // Whether this healthcareservice is in active use
        providedBy: {
            refenence: record[dbToRecordNames['orgID']]
        }, // Organization that provides this service
        category : {
            coding: [
                {
                  system: "http://hl7.org/fhir/service-category",
                  code: "8",
                  display: "Community medicine"
                }
              ],
              text: "Community medicine"
        }, // Broad category of service being performed or delivered
        type: [{
            coding: [
                {
                    system: "http://snomed.info/sct",
                    code: "469",
                    display: "Weight"
                }
            ]
        }], // Type of service that may be delivered or performed
        specialty: [{
            coding: [
                {
                    system: "http://hl7.org/fhir/service-category",
                    code: "8",
                    display: "Community medicine"
                }
            ]
        }], // Specialties handled by the HealthcareService
        // location: [{
        //     reference: String
        // }], // Location(s) where service may be provided
        name: "Mordor weight loss", // Description of service as presented to a consumer while searching
        // comment: String, // Additional description and/or any specific issues not covered elsewhere
        // extraDetails: String, // Extra details about the service that can't be placed in the other fields
        // photo : { Attachment }, // Facilitates quick identification of the service
        // telecom: [{
        //     system: String,
        //     value: String,
        //     use: String
        // }], // Contacts related to the healthcare service
        // coverageArea: [{
        //     reference: String,
        //     display: String
        // }], // Location(s) service is inteded for/available to
        // serviceProvisionCode: [{
        //     coding: [
        //         {
        //             system: String,
        //             code: String,
        //             display: String
        //         }
        //     ]
        // }], // Conditions under which service is available/offered
        // eligibility : { CodeableConcept }, // Specific eligibility requirements required to use the service
        // eligibilityNote : <string>, // Describes the eligibility conditions for the service
        programName: ["Weight loss program"], // Program Names that categorize the service
        // characteristic: [{
        //     coding: [
        //         {
        //             display: String
        //         }
        //     ]
        // }],
    }
}