let queue = [];

function getQueue() {
    $.get('https://arvind.io:8085/getqueue', result => {
        queue = JSON.parse(result);
    });
}

$(() => {
    setInterval(getQueue, 200);
});
