'use strict';

module.exports = function(start, queue, atFloor, moving, waiting, transit) {
    let elapsed = (Math.floor(Date.now() / 1000)) - start;
    if (queue.length) {
        let step = 1;
        moving.value = true;
        if ((!transit && queue[0].from == atFloor.value) || (transit && queue[0].to == atFloor.value)) {
            if (waiting.value) {
                waiting.value = false;
                queue.splice(0, 1);
            } else {
                waiting.value = true;
            }
        } else {
            if ((!transit && queue[0].from < atFloor.value)|| (transit && queue[0].to < atFloor.value)) {
                step = -1;
            }
        }
        if (!waiting.value) {
            atFloor.value += step;
        }
    } else {
        moving.value = false;
    }
};
