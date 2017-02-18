let queue = [];

function getQueue() {
    $.get('https://arvind.io:8085/getqueue', result => {
        queue = result.queue;
        atFloor = result.atFloor;
        $('#queuecontents').html('');

        for (let key in queue) {
            $('#queuecontents').append('<div class="well"><br><h4>Priority</h4>: ' + queue[key].priority + ' <strong>ID</strong>: ' + queue[key].beaconid + '<br><strong>From</strong>: ' + queue[key].from + ' <strong>To</strong>: ' + queue[key].to + '</div>');
            console.log(atFloor);
        }
    });
}

$(() => {
    setInterval(getQueue, 200);
});
