var spawn = require('child_process').spawn;
var ingest = require('./ingest');
var mongoose = require('mongoose');
var observationModel = require('./schemas/observation');
// var organizationModel  = require('./schemas/organization');
var healthcareserviceModel = require('./schemas/healthcareservice')
var fhirAPI = require('./fhirClient');
var queries = require('./ingest/queries')
var Promise = require('bluebird');

console.log(process.argv[2]);

const env = process.argv[2] || null;
const server = env === 'dev' ? 'localhost' : 'iiiiiidb';
mongoose.connect('mongodb://' + server + ':27017/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const express = require('express');
const session = require("express-session");
var multer = require('multer');
var multerupload = multer({ dest: 'files/' })
var async = require('async')
const app = express();
var bodyParser = require('body-parser');
var options = {
  inflate: true,
  limit: '10240kb',
  type: 'application/octet-stream'
};
app.use(bodyParser.raw(options));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); 
var path = require('path');
const http = require('http').Server(app);
const _http = require('http')
const https = require('https');

app.use('/static', express.static(path.join(__dirname, 'web')))


const smart = require("smart-client/adapters/express")({
    scope      : "patient/Patient.read patient/Observation.read launch online_access openid profile",
    redirectUri: "/",
    clientId   : "e0a116ae-6960-4823-8d3e-0b3fa8c7d8c7"
});

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}));

app.get("/launch",  smart.authorize, (req, res) => {
    // this is ONLY invoked if smart.authorizeSmart did not redirect due to missing parameters
    // return res.sendFile("form.html", { root: __dirname + '/  ../' });
});

app.get("/redirect", smart.completeAuth, async (req, res) => {
    const client = await smart.getClient(req);

    // Perhaps the server was restarted or lost it's session for some other reason
    if (!client) {
        console.log("No client found in session");
        return res.redirect("/launch")
    }

    //const result = await client.request("/Patient");
    //res.type('html').end(
      //  '<a href="/logout">Logout</a><hr/><pre>' +
      //  JSON.stringify(result.data, null, 4).replace(/</g, "&lt;")
      //  .replace(/>/g, "&gt;") + '</pre>'
    //);
    res.redirect("/");
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/launch")
    });
});

app.get("/refresh", async (req, res) => {
    const client = await smart.getClient(req);

    // Perhaps the server was restarted or lost it's session for some other reason
    if (!client) {
        console.log("No client found in session");
        return res.redirect("/launch")
    }

    await client.refresh();
    res.json(client.state);
});


app.get('/ingest', (req, res) => {
    // return ingest.fromFile('/Users/blaze/Documents/Intro to health informactics/Integrating-Insights-from-Non-Structured-Community-Data-into-EHRs/app/ingest/dpp-outputComma.csv')
    // return ingest.fromFile('app/ingest/dpp-outputComma.csv')
    var path = env === 'dev' ? 'app/ingest/dpp-outputComma.csv' : '/usr/src/app/ingest/dpp-outputComma.csv'
    return ingest.fromFile(path)
    .then((result) => {
        console.log('successfully ingested some data')
        res.send(result)
    })
    .catch((e) => {
        console.log(e);
        res.send( "Error: " + e.message );
    })
});

app.get('/drop', (req, res) => {
    observationModel.collection.drop()
})
app.post('/ingestFile',multerupload.any(), (req, res) => {
    var files = req.files
    var filesArray = req.files;
        async.each(filesArray,function(file,callback){
            if(file.mimetype == "text/csv"){
                ingest.fromFile('files/'+file.filename)
                .then((result) => {
                    console.log('successfully ingested some data file name : ' + file.filename)
                    res.send(result)
                })
                .catch((e) => {
                    console.log(e);
                    res.send( "Filename : " + file.filename + "Error: " + e.message );
                })
            }
         },function(err){
          if(err){
              console.log("error ocurred in each",err);
          }
        });
});

app.post('/ingestUrl', (req, res) => {
    var fs = require('fs');
    var filename = "files/" +  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    if(req.body.url.startsWith("https://")){
        var file = fs.createWriteStream(filename);
        https.get(req.body.url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                ingest.fromFile(filename)
                .then((result) => {
                    console.log('successfully ingested some data file name : ' + filename)
                    res.send(result)
                })
                .catch((e) => {
                    console.log(e);
                    res.send( "Error: " + e.message );
                })
            })
        })
    } else {
        console.log("dsadsa")
        var file = fs.createWriteStream(filename);
        _http.get(req.body.url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                ingest.fromFile(filename)
                .then((result) => {
                    console.log('successfully ingested some data file name : ' + filename)
                    res.send(result)
                })
                .catch((e) => {
                    console.log(e);
                    res.send( "Error: " + e.message )
                })
            })
        })
    }
});

app.post('/ingestData', (req, res) => {
    req.rawBody = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        req.rawBody += chunk;
    });
    req.on('end', function() {
        console.log(req.rawBody)
        ingest.fromData(req.rawBody)
        .then((result) => {
            console.log('successfully ingested some data')
            res.send(result)
        })
        .catch((e) => {
            console.log(e);
            res.send( "Error: " + e.message );
        })
    });

});

app.get('/data', (req, res) => {
    return observationModel.find({ 'subject.reference': '317T3f39YIhbXE4VaO'})
    .lean()
    .then(function (observations) {
        return Promise.mapSeries(observations, function (observation) {
            return healthcareserviceModel.findOne({ indetifier: observation.performer.reference })
                .then(function (healthcareservice) {
                    observation.healthcareservice= healthcareservice;
                    return observation
                })
        })
    })
    .then(function (observations) {
        res.send(observations);
    })
    .catch(function (e){
        console.log(e)
    })
    
});

app.get('/fhir', (req, res) => {
    return fhirAPI.readPatient()
        .then((response) => {
            // console.log(response);
            var patientName = response.name[0];
            res.write(JSON.stringify(patientName));
            fhirAPI.searchPatient()
                .then((response) => {
                    // console.log(response);
                    var patientMedications = [];
                    response.entry.forEach(function(re){
                        var rx = re.resource;
                        patientMedications.push(rx.medicationCodeableConcept.text);
                    });
                    res.write(JSON.stringify(patientMedications));
                    res.end();
                })
                .catch((error) => {
                    console.log(error);
                });
        });
});

app.get('/community_programs_dates_served',(req,res) => {
    return queries.community_programs_dates_served(req.query.patient_id,req.query.limit,req.query.sort)
            .then((response) => {
                console.log(response)
                res.send({"data" :response})
            })
});
app.get('/community_programs_measurements_obtained',(req,res) => {
    return queries.community_programs_measurements_obtained(req.query.patient_id,req.query.limit,req.query.sort)
            .then((response) => {
                console.log(response)
                res.send({"data" :response})
            })
});
app.get('/dimension_stats',(req,res) => {
    return queries.dimension_stats(req.query.patient_id,req.query.dimension,req.query.limit,req.query.sort)
            .then((response) => {
                console.log(response)
                res.send({"data" :response})
            })
});
app.get('/community_programs_dates_served_stats',(req,res) => {
    return queries.community_programs_dates_served_stats()
            .then((response) => {
                console.log(response)
                res.send({"data" :response})
            })
});
app.get('/dashboard',(req,res) => {
        fhirAPI.readPatient()
        .then((patient_response) => {
            var patientName = patient_response.name[0];
            Promise.all([
                fhirAPI.searchObservation(),
                // queries.dashboard(),
                observationModel.find({ 'subject.reference': '317T3f39YIhbXE4VaO'})
                .lean()
                .then(function (observations) {
                    return Promise.mapSeries(observations, function (observation) {
                        return healthcareserviceModel.findOne({ indetifier: observation.performer.reference })
                            .then(function (healthcareservice) {
                                observation.healthcareservice= healthcareservice;
                                return observation
                            })
                    })
                })
            ])
                .then((response) => {
                  fhirObservations = []
                  encounter = ""
                  response[0].entry.forEach(function(k) {
                    x = k.resource
                    x.label = "fhir"
                    fhirObservations.push(k.resource)
                    if('encounter' in k.resource){
                        encounter = k['resource']['encounter']['reference']
                    }
                  });
                //   fhirObservations.concat(response[1])
                  fhirAPI.getOrganizationByEncounter(encounter)
                  .then((re) =>{
                        fhirObservations.forEach(function(k){
                            k.healthcareservice = { programName: re.name }
                        })
                        res.write(JSON.stringify({
                            "patient":patient_response, 
                            "observation": fhirObservations,
                            "ourObservations": response[1]
                        }))
                        res.end()
                  });
        })
    })
});
// ingest.fromFile('./dpp-outputComma.csv')
//     .then(() => {
//         console.log('successfully ingested some data')
//     })
//     .catch((e) => {
//         console.log(e);
//         // process.exit(0);
//     })

app.get('/', (req, res) =>
    res.sendFile(__dirname + '/web/index.html')
);

http.listen(3000, function () {
    console.log('listening on *:3000');
});

db.once('open', function () {
});
