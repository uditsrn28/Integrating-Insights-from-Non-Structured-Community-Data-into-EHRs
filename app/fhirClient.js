var fhir = require('fhir-kit-client');

var patient_id = "cc4ccf86-32e9-4b55-983f-bb093770d9fa"
const fhirClient = new fhir({
    baseUrl: 'https://r2.smarthealthit.org'
    });

function readPatient() {
    return fhirClient.read({ resourceType: 'Patient', id: patient_id});
}

function searchPatient() {
    return fhirClient.search({ resourceType: 'MedicationOrder', searchParams: {patient: 'smart-1137192' } });
}

function searchObservation(){
	return fhirClient.resourceSearch({
	  resourceType: 'Observation',
	  searchParams: { subject: patient_id }
	});
}

function searchOrganization(organization){
	return fhirClient.read({
	  resourceType: 'Organization',
	  id: organization.replace('Organization/','')
	});
}


function searchEncounter(encounter){
	return fhirClient.read({
	  resourceType: 'Encounter',
	  id: encounter.replace('Encounter/','')
	});
}

function getOrganizationByEncounter(encounter){
	return searchEncounter(encounter)
	.then(function(encounter_response) {
		return searchOrganization(encounter_response['serviceProvider']['reference'])
		.then(function(organization_response) {
			return organization_response
		})
	})
}

var fhirAPI = {
    readPatient: readPatient,
    searchPatient: searchPatient,
    searchObservation: searchObservation,
    searchOrganization: searchOrganization,
    getOrganizationByEncounter: getOrganizationByEncounter
};

module.exports = fhirAPI;