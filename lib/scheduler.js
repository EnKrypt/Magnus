'use strict';

module.exports = function(start, queue, atFloor, moving, waiting, transit, countdown) {
    let elapsed = (Math.floor(Date.now() / 1000)) - start;
    if (queue.length) {
        let step = 1;
        moving.value = true;
        if ((!transit.value && queue[0].from < atFloor.value) || (transit.value && queue[0].to < atFloor.value)) {
            step = -1;
        }
        if ((!transit.value && queue[0].from == atFloor.value) || (transit.value && queue[0].to == atFloor.value)) {
            if (waiting.value) {
                if (countdown.value) {
                    countdown.value -= 1;
                } else {
                    countdown.value = 3;
                    waiting.value = false;
                    if (transit.value) {
                        queue.splice(0, 1);
                        console.log(elapsed);
                        if (!queue.length) {
                            moving = false;
                        }
                    }
                }
            } else {
                waiting.value = true;
            }
            if (!waiting.value) {
                if (transit.value) {
                    transit.value = false;
                } else {
                    transit.value = true;
                }
                if (queue.length) {
                    if ((!transit.value && queue[0].from < atFloor.value) || (transit.value && queue[0].to < atFloor.value)) {
                        step = -1;
                    }
                }
            }
        }
        if (moving && !waiting.value) {
            atFloor.value += step;
        }
    }
};
