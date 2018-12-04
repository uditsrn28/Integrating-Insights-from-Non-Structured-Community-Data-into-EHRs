var mongoose = require("mongoose");

var testSchema = new mongoose.Schema({
    Age: Number,
    Gender: String,
    HBA1C: String,
    EventDate: Date,
    patientID: String,
    firstName: String,
    lastName: String,
    height: String,
    weight: String,
    GLC: String,
    PA: String,
    ingestedAt: Date
});

var testObservation = mongoose.model('testObservation', testSchema);

module.exports = testObservation;
