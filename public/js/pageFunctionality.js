let queue = [];

function getQueue() {
    $.ajax({
      url: 'https://arvind.io:8085/getqueue',
      success: result => {
          queue = result;
      }
    });
}

$(document).ready(() => {
    setInterval(getQueue, 200);
});