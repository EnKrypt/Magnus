let queue = [];

function getQueue() {
    $.get('https://arvind.io:8085/getqueue', result => {
        queue = result.queue;
        atFloor = result.atFloor;
        $('#queuecontents').html(JSON.stringify(queue));
        console.log(atFloor);
    });
}

$(() => {
    setInterval(getQueue, 200);
});
