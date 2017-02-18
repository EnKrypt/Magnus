let queue = [];
let prevfloor = 0;
let atFloor;

function getQueue() {
    $.get('https://arvind.io:8085/getqueue', result => {
        queue = result.queue;
        atFloor = result.atFloor;
        $('#queuecontents').html('');

        for (let key in queue) {
            $('#queuecontents').append('<div class="well queueitem"><h4>Priority: ' + queue[key].priority + '</h4><strong>ID</strong>: ' + queue[key].beaconid + '<br><strong>From</strong>: ' + queue[key].from + ' <strong>To</strong>: ' + queue[key].to + '</div>');
            console.log(atFloor);
        }
        $($('.queueitem')[0]).css('background-color', 'green');
        $($('.queueitem')[0]).css('color', 'white');

        $($('#floor' + prevfloor).css('background-color', '#f5f5f5'));
        $($('#floor' + prevfloor).css('color', 'black'));

        if (atFloor == prevfloor) {
            $($('#floor' + atFloor).css('background-color', 'orange'));
        } else {
            $($('#floor' + atFloor).css('background-color', 'green'));
            $($('#floor' + atFloor).css('color', 'white'));
        }
        prevfloor = atFloor;
    });
}

$(() => {
    setInterval(getQueue, 200);
});
