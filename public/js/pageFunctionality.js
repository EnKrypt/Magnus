let queue = [];

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
        $($('#floor' + atFloor).css('background-color', 'green'));
        $($('#floor' + atFloor).css('color', 'white'));
    });
}

$(() => {
    setInterval(getQueue, 200);
});
