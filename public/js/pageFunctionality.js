let queue = [];

function getQueue() {
    $.get('https://arvind.io:8085/getqueue', result => {
        queue = result;
        $('.queuecontents').html(JSON.stringify(queue));
    });
}

$(() => {
    setInterval(getQueue, 200);
});
