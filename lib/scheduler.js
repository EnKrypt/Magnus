'use strict';

module.exports = function(start, queue, atFloor, moving, waiting, transit) {
    let elapsed = (Math.floor(Date.now() / 1000)) - start;
    if (queue.length) {
        let step = 1;
        moving.value = true;
        if ((!transit.value && queue[0].from == atFloor.value) || (transit.value && queue[0].to == atFloor.value)) {
            if (waiting.value) {
                waiting.value = false;
                if (transit.value) {
                    queue.splice(0, 1);
                    if (!queue.length) {
                        moving = false;
                    }
                }
            } else {
                waiting.value = true;
            }
        } else {
            if ((!transit.value && queue[0].from < atFloor.value)|| (transit.value && queue[0].to < atFloor.value)) {
                step = -1;
            }
        }
        if ((!transit.value && queue[0].from == atFloor.value) || (transit.value && queue[0].to == atFloor.value)) {
            if (!waiting.value) {
                if (transit.value) {
                    transit.value = false;
                } else {
                    transit.value = true;
                }
            }
        }
        if (moving && !waiting.value) {
            atFloor.value += step;
        }
    }
};
