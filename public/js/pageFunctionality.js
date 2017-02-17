let queue = [];

function getQueue() {
    $.get('https://arvind.io:8085/getqueue', result => {
        queue = result;
    });
}

$(() => {
    setInterval(getQueue, 200);
});
