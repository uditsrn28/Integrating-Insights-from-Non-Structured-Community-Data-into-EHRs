define(function (require) {

    var _ = require('lodash');
    return {
        init: function (patient) {
            var patientName = patient.fname + ' ' + patient.lname;
            $('#patient-header').html(patientName);
            $('.patient-name').html(patientName)

            $('#patient-data tr:last').after('<tr>' 
                + '<td>Gender: </td>'
                + '<td>' + patient.gender + '</td>' 
                +'</tr>');

            $('#patient-data tr:last').after('<tr>' 
                + '<td>Date of Birth: </td>'
                + '<td>' + new Date(patient.birthdate).toLocaleDateString("en-US") + '</td>' 
                +'</tr>');
        }

    }
});