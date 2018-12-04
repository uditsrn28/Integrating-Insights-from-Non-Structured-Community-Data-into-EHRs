var Healthcareservice = require('../../schemas/healthcareservice');
var mordor = require('./mordorWeightLoss');
var healthLevelSeven = require('./healthLevelSeven');


module.exports = function (record, dbToRecordNames) {
    console.log('saving Healthcareservice')
    var healthcareservice = record[dbToRecordNames['orgID']] == 'W0plXOBXYhf7jubSMv4F4B'? mordor(record, dbToRecordNames) 
        : healthLevelSeven(record, dbToRecordNames);

    var query = { indetifier: record[dbToRecordNames['orgID']] };


    console.log('saving Healthcareservice')
    Healthcareservice.findOneAndUpdate(query, healthcareservice, { upsert: true }, function (err, doc) {
        if (err) 
            console.log(err)
        console.log('created a healthcareservice')
    });
}