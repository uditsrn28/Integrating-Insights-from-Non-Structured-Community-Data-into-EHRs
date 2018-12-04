// var csvToJson = require('./csvToJson');
var _ = require('lodash');
var testObservation = require('../observationSchema');
var csv = require("csvtojson");
var Patient = require('../schemas/patient');
var Observation = require('../schemas/observation');
// var initOrangization = require('./orangization');
var initHealthCareService = require('./healthcareservice');
var weightObservation = require('./observation/weight');
var hba1cObservation = require('./observation/hba1c');

const NOT_FOUND = 'not_found';

var process = function (key) {
    const lowerKey = key.toLowerCase();
    var headers = [
        { types: ['weight', 'wt'], name: 'weight' },
        { types: ['height', 'ht','HEIGHT'], name: 'height' },
        { types: ['dob', 'age', 'dateofbirth'], name: 'birthDate' },
        { types: ['hba1c'], name: 'HBA1C' },
        { types: ['glc'], name: 'GLC'},
        { types: ['pa'], name: 'PA'},
        { types: ['gender', 'sex'], name: 'Gender' },
        { types: ['event date','event_date','date'], name: 'EventDate' },
        { types: ['particip'], name: 'patientID' },
        { types: ['orgcode'], name: 'orgID'},
        { types: ['fname'], name: 'firstName' },
        { types: ['lname'], name: 'lastName' }
    ];

    var match;
    _.each(headers, (head) => {
        if (head.types.indexOf(lowerKey) > -1) {
            match = { dbName: head.name, originalName: key };
        }
        if (!match) {
            _.each(head.types, (type) => {
                if (lowerKey.indexOf(type) > -1) {
                    match = { dbName: head.name, originalName: key };
                }
            });
        }
    });
    return match || NOT_FOUND;
};

var writeToDb = function (records, matchingColumns) {
    var dbToRecordNames = {};
    _.each(matchingColumns, (matchingColumn) => {
        dbToRecordNames[matchingColumn.dbName] = matchingColumn.originalName;
    });

    _.each(records, (record) => {

        var query = {
            'name.text': record[dbToRecordNames['firstName']] + ' ' + record[dbToRecordNames['lastName']]
        };

        initHealthCareService(record, dbToRecordNames);

        Patient.find(query, (err, results) => {
            if(err) {
                console.log(err);
            }
            else {
                //got patient from mongodb
                if (results.length === 0) {
                    var patient = new Patient({
                        resourceType: 'Patient',
                        id: record[dbToRecordNames['patientID']],
                        name: [
                            {
                                use: 'official',
                                family: record[dbToRecordNames['lastName']],
                                text: record[dbToRecordNames['firstName']] + ' ' + record[dbToRecordNames['lastName']],
                                given: [
                                    record[dbToRecordNames['firstName']],
                                    record[dbToRecordNames['lastName']]
                                ]
                            }
                        ],
                        gender: record[dbToRecordNames['Gender']]
                    });
                    patient.save((err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    createObservations(patient, record, dbToRecordNames);
                }
                else {
                    //got patient from mongodb
                    var patient = results[0];
                    createObservations(patient, record, dbToRecordNames);
                }
            }
        });
    });
};

var createObservations = function(patient, record, dbToRecordNames) {
    if (dbToRecordNames['weight'] != undefined && _.isNumber(Number(record[dbToRecordNames['weight']])) &&
    Number(record[dbToRecordNames['weight']]) > 0 && Number(record[dbToRecordNames['weight']]) < 1000) {
        console.log('creating weight observation');
        var observation = weightObservation(record, dbToRecordNames, patient);
        console.log("saving observation");
        observation.save((err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    if (dbToRecordNames['HBA1C'] != undefined && _.isNumber(Number(record[dbToRecordNames['HBA1C']])) &&
    Number(record[dbToRecordNames['HBA1C']]) > 0 && Number(record[dbToRecordNames['HBA1C']]) < 13) {
        console.log("creating HBA1C observation");
        var observation = hba1cObservation(record, dbToRecordNames, patient);
        console.log("saving observation");
        observation.save((err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    
};

var ingestJSON = function (records) {
    var matchedColumns = []
    _.each(Object.keys(records[0]), (key) => {
        var matchingColumnName = process(key);
        if (matchingColumnName !== NOT_FOUND) {
            matchedColumns.push(matchingColumnName)
        }
    });
    // return matchedColumns;

    return writeToDb(records, matchedColumns);
};

module.exports = {
    fromFile: function (filePath) {
        return new Promise(function (resolve) {
            return csv().fromFile(filePath)
                .then((results) => {
                    // return resolve(results);
                    return resolve(ingestJSON(results))
                });
        });
    },
    fromData: function (dataObj){
        return new Promise(function (resolve){
            return csv().fromString(dataObj)
                .then((results) => {
                    return resolve(ingestJSON(results))
                });
        })

    }
};