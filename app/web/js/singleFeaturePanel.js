define(function (require) {

    var _ = require('lodash');



    var initInitPopulateTable = function (observations) {
        return function (type) {
            var type = type || _.get(observations[0], 'code.coding.0.display');

            var obs = _.filter(observations, function (ob) {
                return _.get(ob, 'code.coding.0.display') === type
            });

            $("#single-measurement-table tr").each(function (i, e) {
                if (i != 0) $(e).remove();
                i++;
            });

            _.each(obs, (o) => {
                
                var multiValues = _.get(o, 'component') || [o];
                
                _.each(multiValues, (ob) => {
                    var measurementValue = '<td>' + Number.parseFloat(_.get(ob, 'valueQuantity.value')).toFixed(2) + ' ' +_.get(ob, 'valueQuantity.unit') + '</td>';
                    
                    var measurementDate = '<td>' + new Date(_.get(o, 'effectiveDateTime')).toLocaleDateString("en-US") + '</td>';
                    var organization = '<td>' + (_.get(o, 'healthcareservice.programName') || 'Burgers University Medical Center') + '</td>';
                    var method = '<td>' + (_.get(o, 'method') || '&mdash;') + '</td>';
    
                    $('#single-measurement-table tr:last').after('<tr>'
                        + measurementValue
                        + measurementDate
                        + method
                        + organization
                        + '</tr>');

                })
                // var measurementValue = (_.map(multiValues, (v) => '<td>' +  _.get(v, 'valueQuanity.value') + ' ' +_.get(ob, 'valueQuantity.unit') + '</td>').join("");
            });

            var measurements = _.map(obs, function (ob) {
                return _.get(ob, 'valueQuantity.value');
            });

            var dates = _.map(obs, function (ob) {
                return _.get(ob, 'effectiveDateTime');
            })

            var optionsHeight = {
                maintainAspectRatio: false,
                spanGaps: false,
                legend: {
                    display: false
                },
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false,
                        },
            
                        gridLines: {
                            display: false,
                            color: '#000',
                            lineWidth: 3
                        }
            
                    }],
                    yAxes: [{
                        ticks: {
                            suggestedMin: _.min(measurements),
                            suggestedMax: _.max(measurements),
                            display: false,
                        },
            
                        gridLines: {
                            display: false,
                            color: '#000',
                            lineWidth: 3
            
                        }
                    }]
                }
            };

            var ctx2 = document.getElementById("chartHeight");

            let chart2 = new Chart(ctx2, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: type,
                            fill: false,
                            data: measurements,
                            radius: 5,
                            borderColor: '#C0C0C0',
                            // backgroundColor: 'blue',
                        },
                    ],
                    labels: dates
                },
                options: optionsHeight
            });

            $( "td:contains('Synthetic Provider')" ).parent().children().css('color', 'blue');
        }
    };

    var populateTable = () => { };

    $("#select-header").change(function (event) {
        populateTable(event.currentTarget.value);
    });

    var initPopulateTable = function (observations) {
        populateTable = initInitPopulateTable(observations);
        populateTable();
    }

    return {
        initSelectDropdown: function (observations) {
            var obs = _.uniq(_.map(observations, function (ob) {
                return _.get(ob, 'code.coding.0.display');
            }));

            _.each(obs, function (measurementType) {
                var html = '<option value="' + measurementType + '">' + measurementType + '</option>';
                $('#select-header').append(html);
            });
        },
        initPopulateTable: initPopulateTable,
        populateTable: populateTable
    }
});