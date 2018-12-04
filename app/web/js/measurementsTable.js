define(function (require) {

    var _ = require('lodash');
    return {
        init: function (observations) {
            _.each(observations, (ob) => {
                if (_.isNumber(_.get(ob, 'valueQuantity.value'))) {
                    var measurementType = '<td>' + _.get(ob, 'code.coding.0.display') + '</td>';
                    var measurementValue = '<td>' + Number.parseFloat(_.get(ob, 'valueQuantity.value')).toFixed(2) + ' ' +_.get(ob, 'valueQuantity.unit') + '</td>';
                    var measurementDate =  '<td>' + new Date(_.get(ob, 'effectiveDateTime')).toLocaleDateString("en-US") + '</td>';
                    var organization = '<td>' + (_.get(ob, 'healthcareservice.name') || 'Burgers University Medical Center')  + '</td>';
                    var frequency = '<td>' +  (_.get(ob, 'frequency') || 'monthly') + '</td>';// ||'&mdash;'
                    
                    $('#community-programs tr:last').after('<tr>' 
                        + measurementType 
                        + measurementValue 
                        + measurementDate 
                        + organization 
                        + frequency 
                        +'</tr>');
                }
            });
            $( "td:contains('Burgers University Medical Center')" ).parent().children().css('color', 'blue');

        }

    }
});