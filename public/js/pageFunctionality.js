let queue = [];

function getQueue() {
    $.get('https://arvind.io:8085/getqueue', result => {
        queue = result.queue;
        atFloor = result.atFloor;
        $('#queuecontents').html('');

        for (let key in queue) {
            $('#queuecontents').append('<div class="well"> Id: ' + queue[key].beaconid + ' From: ' + queue[key].from + ' To: ' + queue[key].to + ' Priority: ' + queue[key].priority + '</div>');
            console.log(atFloor);
        }
    });
}

$(() => {
    setInterval(getQueue, 200);
});
