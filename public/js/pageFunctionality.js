let queue = [];

function getQueue() {
    $.get('https://arvind.io:8085/getqueue', result => {
        queue = result.queue;
        atFloor = result.atFloor;
        $('#queuecontents').html('');

        for (let key in queue) {
            $('#queuecontents').append('<div class="well"><strong>Id</strong>: ' + queue[key].beaconid + '<br><strong>From</strong>: ' + queue[key].from + '<br><strong>To</strong>: ' + queue[key].to + '<br><strong>Priority</strong>: ' + queue[key].priority + '</div>');
            console.log(atFloor);
        }
    });
}

$(() => {
    setInterval(getQueue, 200);
});
