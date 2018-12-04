// var Organization = require('../../schemas/organization');

// var orgType = {
//     W0plXOBXYhf7jubSMv4F4B: 'Diabetes Management Org',
//     W0plXOBXYhf7jubSMv4F4A: 'Mordor weight loss'
// };

// var programType = {
//     W0plXOBXYhf7jubSMv4F4B: 'Weight loss program',
//     W0plXOBXYhf7jubSMv4F4A: 'Diabetes management'
// };

// module.exports = function (record, dbToRecordNames) {
//     var oraganization = {
//         resourceType: 'Oragnization',
//         id: record[dbToRecordNames['orgID']],
//         name: names[record[dbToRecordNames['orgID']]],
//         programType: programType[record[dbToRecordNames['orgID']]]
//     };

//     var query = { id: record[dbToRecordNames['orgID']] };

//     Organization.findOneAndUpdate(query, oraganization, { upsert: true }, function (err, doc) {
//         if (err) 
//             console.log(err)
//     });
// }