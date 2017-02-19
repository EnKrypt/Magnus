let queue = [];
let prevfloor = 0;
let atFloor;
let waiting;
let traditionalData;
let optimizedData;

function getQueue() {
    $.get('https://arvind.io:8085/getqueue', result => {
        queue = result.queue;
        atFloor = result.atFloor;
        waiting = result.waiting;
        $('#queuecontents').html('');

        for (let key in queue) {
            $('#queuecontents').append('<div class="well queueitem"><h4>Priority: ' + queue[key].priority + '</h4><strong>ID</strong>: ' + queue[key].beaconid + '<br><strong>From</strong>: ' + queue[key].from + ' <strong>To</strong>: ' + queue[key].to + '</div>');
            console.log(atFloor);
        }
        $($('.queueitem')[0]).css('background-color', 'green');
        $($('.queueitem')[0]).css('color', 'white');

        if (waiting) {
            $($('#floor' + atFloor).css('background-color', 'orange'));
        } else {
            $($('#floor' + atFloor).css('background-color', 'green'));
            $($('#floor' + atFloor).css('color', 'white'));
        }
        if (prevfloor != atFloor) {
            $($('#floor' + prevfloor).css('background-color', '#f5f5f5'));
            $($('#floor' + prevfloor).css('color', 'black'));
        }
        prevfloor = atFloor;
    });
}

function getGraph() {
    $.get('https://arvind.io:8085/getevents', events => {
        var floor = 0;
        for (var key in events) {
            events[key].oseconds = Math.round((Math.abs(events[key].from - floor) + 6 + Math.abs(events[key].to - events[key].from)) / (Math.abs(events[key].from - events[key].to)) * 10) / 10;
            floor = events[key].to;
        }

        floor = 0;
        events = events.sort(function (a, b) {
            return b.priority - a.priority;
        });
        for (var key in events) {
            events[key].pseconds = Math.round((Math.abs(events[key].from - floor) + 6 + Math.abs(events[key].to - events[key].from)) / (Math.abs(events[key].from - events[key].to)) * 10) / 10;
            floor = events[key].to;
        }

        traditionalData = events.map(function(obj) {
            return obj.oseconds;
        });

        optimizedData = events.map(function(obj) {
            return obj.pseconds;
        });

        console.log(traditionalData);
        console.log(optimizedData);

        let tchart = $("#traditionalChart");
        let ochart = $("#optimizedChart");

        var traditionalChartdata = {
            labels: events.map(function(obj) {
                return obj.priority + '';
            }),
            datasets: [
                {
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    data: traditionalData
                }
            ]
        };

        var oChartdata = {
            labels: events.map(function(obj) {
                return obj.priority + '';
            }),
            datasets: [
                {
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                    data: optimizedData
                }
            ]
        };
        let chartt = new Chart(tchart, {
            type: 'bar',
            data: traditionalChartdata,
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Seconds (Normalized)"
                        },
                        display: true,
                        ticks: {
                            min: 0,
                            max: 5
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Priority"
                        }
                    }],
                },
                legend: {
                    display: false
                }
            }
        });

        let charto = new Chart(ochart, {
            type: 'bar',
            data: oChartdata,
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Seconds (Normalized)"
                        },
                        display: true,
                        ticks: {
                            min: 0,
                            max: 5
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Priority"
                        }
                    }],
                },
                legend: {
                    display: false
                }
            }
        });
    });
}

$(() => {
    setInterval(getQueue, 200);
    getGraph();
});
