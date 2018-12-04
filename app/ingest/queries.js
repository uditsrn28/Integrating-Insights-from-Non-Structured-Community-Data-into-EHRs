var Observation = require('../observationSchema')
var extend = require('util')._extend;
var Organization  = require('../schemas/organization');
var Promise = require('bluebird');
var fhirAPI = require('../fhirClient');

module.exports = {
    community_programs_dates_served: function (patientID,limit=10,sortBy="EventDate",ascOrder=true) {
            if(ascOrder == false){
                sortBy = "-" + sortBy
            }
            return Observation.find({
                "patientID": patientID
            })
            .sort(sortBy)
            .limit(parseInt(limit,10))
            .select({
                "program_type" : 1,
                "organization" : 1,
                "EventDate" : 1,
                "_id" : 0
            })
            .then((results) => {
                console.log(results)
                return results
            });
    },
    community_programs_dates_served_stats: function (){
        return Observation.aggregate([
           { "$group": {
               "_id": {
                   "month": { "$substr": [ "$EventDate", 5, 2 ] }
               },
               "count": { "$sum": 1 }
           }}
        ])
        .then(function(results){
            final_results = []
            
            results.forEach(function(item){
                a = {}
                x = item["_id"]["month"]
                a[x] = item["count"]
                final_results.push(a)
            })
            return final_results
        })
    },
    community_programs_measurements_obtained: function (patientID,limit=10,sortBy="EventDate",ascOrder=true){
            if(ascOrder == false){
                sortBy = "-" + sortBy
            }
            return Observation.find({
                "patientID": patientID
            })
            .sort(sortBy)
            .limit(parseInt(limit,10))
            .select({
                "weight" : 1,
                "PA" : 1,
                "height" : 1,
                "HBA1C" : 1,
                "GLC" : 1,
                "height" : 1,
                "program_type" : 1,
                "organization" : 1,
                "EventDate" : 1,
                "_id" : 0
            })
            .then((results) => {
                console.log(results)
                final_results = []
                results.forEach(function(item) {
                    a = { }
                    if("program_type" in item){
                        a['program_type'] = item['program_type']
                    }
                    if("organization" in item){
                        a['organization'] = item['organization']
                    }
                    if("EventDate" in item){
                        a['EventDate'] = item['EventDate']
                    }
                    ["weight","height","HBA1C","GLC","PA"].forEach(function(x){
                        if(item[x] != undefined){
                            temp = extend({}, a);
                            temp['measurement'] = x
                            temp['value'] = item[x]
                            console.log("===")
                            console.log(temp)
                            final_results.push(temp)
                        }
                    })
                });
                return final_results
            });
    },
    dimension_stats: function (patientID,dimension="height",limit=10,sortBy="EventDate",ascOrder=true){
            if(ascOrder == false){
                sortBy = "-" + sortBy
            }
            findObj = {
                "patientID": patientID
            }
            selectObj = {
                "method" : 1,
                "organization" : 1,
                "EventDate" : 1,
                "_id" : 0
            }
            findObj[dimension] = { $exists : true }
            selectObj[dimension] = 1
            return Observation.find(findObj)
            .sort(sortBy)
            .limit(parseInt(limit,10))
            .select(selectObj)
            .then((results) => {
                return results
            });
    },
    community_program: function (dataObj){
        return new Promise(function (resolve){
            return csv().fromString(dataObj)
                .then((results) => {
                    return resolve(ingestJSON(results))
                });
        })
    },
    dashboard: function(){
        return Observation.find({})
        .lean()
        .then(function (observations) {
            return Promise.mapSeries(observations, function (observation) {
                return Organization.findOne({ id: observation.performer.reference })
                    .then(function (org) {
                        observation.performer.name = org.name;
                        return observation
                    })
            })
        })
        .then(function (observations) {
            return observations;
        })
        .catch(function (e){
            console.log(e)
        })
    }
};