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

$(() => {
    setInterval(getQueue, 200);
});
