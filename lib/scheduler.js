'use strict';

module.exports = function(start, queue, atFloor, moving, waiting, transit) {
    setInterval(() => {
        let elapsed = (Math.floor(Date.now() / 1000)) - start;
        if (queue.length) {
            let step = 1;
            moving.value = true;
            if ((!transit && queue[0].from == atFloor) || (transit && queue[0].to == atFloor)) {
                if (waiting.value) {
                    waiting.value = false;
                    queue.splice(0, 1);
                } else {
                    waiting = true;
                }
            } else {
                if ((!transit && queue[0].from < atFloor)|| (transit && queue[0].to < atFloor)) {
                    step = -1;
                }
            }
            if (!waiting) {
                atFloor += step;
            }
        } else {
            moving.value = false;
        }
    }, 1000);
};
