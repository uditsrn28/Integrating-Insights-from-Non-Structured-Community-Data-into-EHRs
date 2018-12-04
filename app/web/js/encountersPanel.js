define(function (require) {

    var _ = require('lodash');

    var initInitPopulateTable = function (observations) {
        return function () {

            var obs = _.uniqBy(observations, (ob) => new Date(_.get(ob, 'effectiveDateTime')).toLocaleDateString("en-US"))
            $("#encounters-table tr").each(function (i, e) {
                if (i != 0) $(e).remove();
                i++;
            });

            _.each(obs, (o) => {
                if (!_.get(o, 'healthcareservice.name')) {
                    o.healthcareservice = { name : 'Burgers University Medical Center', programName: 'Diabetes Management Program' }
                }
            })
            
            _.each(obs, (ob) => {
                var measurementValue = '<td>' + _.get(ob, 'valueQuantity.unit') + '</td>';
                var program = '<td>' + _.get(ob, 'healthcareservice.programName') + '</td>';
                var measurementDate = '<td>' + new Date(_.get(ob, 'effectiveDateTime')).toLocaleDateString("en-US") + '</td>';
                var organization = '<td>' + _.get(ob, 'healthcareservice.name') + '</td>';
                var method = '<td>' + (_.get(ob, 'method') || '&mdash;') + '</td>';

                $('#encounters-table tr:last').after('<tr>'
                    + program
                    + organization
                    + measurementDate
                    + '</tr>');
            });

            

            var groupedByOrg = _.groupBy(obs, (o) => _.get(o, 'healthcareservice.name'));

            var totals = [];
            var years = []
            _.each(Object.keys(groupedByOrg), (org) => {
                totals[org] = {}
                var groupedByYear = _.groupBy(groupedByOrg[org], (organization) => {
                    return new Date(_.get(organization, 'effectiveDateTime')).getFullYear()
                });

                _.each(Object.keys(groupedByYear), (year) => {
                    years.push(year)
                    totals[org][year] = groupedByYear[year].length;
                });
            });

            years = _.uniq(years);
            measurements = []
            
            _.each(Object.keys(groupedByOrg), (org, i) => {
                measurements[i] = [];
                _.each(years, (year,j) => {
                    measurements[i][j] = totals[org][year] || 0
                });
            })

            console.log(measurements)

            var dates = _.map(obs, function (ob) {
                return _.get(ob, 'effectiveDateTime');
            })

            var options = {
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
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Year',
                            fontStyle: 'bold'

                        }

                    }],
                    yAxes: [{
                        ticks: {
                            suggestedMin: _.min(measurements[0], measurements[1]),
                            suggestedMax: _.max(measurements[0], measurements[1]) + 1,
                            display: false,
                        },

                        gridLines: {
                            display: false,
                            color: '#000',
                            lineWidth: 3

                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Sessions Attended',
                            fontStyle: 'bold'
                        }
                    }]
                }
            };

            var programNames = _.uniq(_.map(obs, (o) => _.get(o, 'healthcareservice.programName')[0]));
            console.log(programNames)
            var ctx = document.getElementById("encounters-chart");

            $('#Diabetes-management').html(_.sum(measurements[0]));
            $('#Weight-loss-program').html(_.sum(measurements[1]));

            let charty = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: programNames[0],
                        fill: false,
                        borderColor: '#C0C0C0',
                        data: measurements[0],
                        radius: 5,

                    },
                    {
                        label: programNames[1],
                        fill: false,
                        // borderColor: '#000000',
                        data: measurements[1],
                        radius: 5
                    },
                    {
                        label: programNames[2],
                        fill: false,
                        borderColor: '#707070',
                        data: measurements[2],
                        radius: 5
                    }],
                    labels: years
                },
                options: options
            });
            $( "td:contains('Burgers University Medical Center')" ).parent().children().css('color', 'blue');

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