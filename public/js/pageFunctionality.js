let queue = [];
let prevfloor = 0;
let atFloor;
let waiting;

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
            console.log(Math.abs(events[key].from - floor) + 6 + Math.abs(events[key].to = events[key].from));
            console.log(Math.abs(events[key].from - events[key].to));
            events[key].oseconds = (Math.abs(events[key].from - floor) + 6 + Math.abs(events[key].to = events[key].from)) / (Math.abs(events[key].from - events[key].to));
            floor = events[key].to;
        }

        floor = 0;
        events = events.sort(function (a, b) {
            return b.priority - a.priority;
        });
        for (var key in events) {
            console.log(Math.abs(events[key].from - floor) + 6 + Math.abs(events[key].to = events[key].from));
            console.log(Math.abs(events[key].from - events[key].to));
            events[key].pseconds = (Math.abs(events[key].from - floor) + 6 + Math.abs(events[key].to = events[key].from)) / (Math.abs(events[key].from - events[key].to));
            floor = events[key].to;
        }
        console.log(events.map(function(obj) {
            return obj.oseconds;
        }));
        console.log(events.map(function(obj) {
            return obj.pseconds;
        }));
    });
}

$(() => {
    setInterval(getQueue, 200);
});
