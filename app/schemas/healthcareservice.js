var mongoose = require('mongoose');


var healthcareserviceSchema = new mongoose.Schema({
    resourceType: String,
    indetifier: String,//body-weight,
    active : Boolean, // Whether this healthcareservice is in active use
    providedBy : { 
        refenence: String
    }, // Organization that provides this service
    category : {
        coding: [
            {
              system: String,
              code: String,
              display: String
            }
          ],
          text: String
    }, // Broad category of service being performed or delivered
    type : [{
        coding: [
          {
            system: String,
            code: String,
            display: String
          }
        ]
      }], // Type of service that may be delivered or performed
    specialty : [{
        coding: [
          {
            system: String,
            code: String,
            display: String
          }
        ]
      }], // Specialties handled by the HealthcareService
    location : [{
        reference: String
      }], // Location(s) where service may be provided
    name : String, // Description of service as presented to a consumer while searching
    comment : String, // Additional description and/or any specific issues not covered elsewhere
    extraDetails : String, // Extra details about the service that can't be placed in the other fields
    // photo : { Attachment }, // Facilitates quick identification of the service
    telecom : [{
        system: String,
        value: String,
        use: String
      }], // Contacts related to the healthcare service
    coverageArea : [{
        reference: String,
        display: String
      }], // Location(s) service is inteded for/available to
    serviceProvisionCode : [{
        coding: [
          {
            system: String,
            code: String,
            display: String
          }
        ]
      }], // Conditions under which service is available/offered
    // eligibility : { CodeableConcept }, // Specific eligibility requirements required to use the service
    // eligibilityNote : <string>, // Describes the eligibility conditions for the service
    programName : [String], // Program Names that categorize the service
    characteristic : [{
        coding: [
          {
            display: String
          }
        ]
      }], // Collection of characteristics (attributes)
    // referralMethod : [{ CodeableConcept }], // Ways that the service accepts referrals
    // appointmentRequired : <boolean>, // If an appointment is required for access to this service
    // availableTime : [{ // Times the Service Site is available
    //   daysOfWeek : [<code>], // mon | tue | wed | thu | fri | sat | sun
    //   allDay : <boolean>, // Always available? e.g. 24 hour service
    //   availableStartTime : <time>, // Opening time of day (ignored if allDay = true)
    //   availableEndTime : <time> // Closing time of day (ignored if allDay = true)
    // }],
    // notAvailable : [{ // Not available during this time due to provided reason
    //   description : <string>, // R!  Reason presented to the user explaining why time not available
    //   during : { Period } // Service not availablefrom this date
    // }],
    // availabilityExceptions : <string>, // Description of availability exceptions
    // endpoint : [{ Reference(Endpoint) }] 
});

module.exports = mongoose.model('Healthcareservice', healthcareserviceSchema);
