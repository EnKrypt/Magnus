'use strict';

module.exports = function (events, queue, moving, waiting, atFloor, pi) {

    var arrangeQueue = function (queue) {
        return queue.sort(function (a, b) {
            return b.priority - a.priority;
        })
    };

    return {
        test: (req, res) => {
            res.send('Magnus is running');
        },

        // For testing
        getevents: (req, res) => {
            res.json(events);
        },

        getqueue: (req, res) => {
            res.json({
                queue: queue,
                waiting: waiting.value,
                atFloor: atFloor.value
            });
        },


        postpi: (req, res) => {
            pi = req.body;
        },

        getpi: (req, res) => {
            res.send(pi);
        },

        emergency: (req, res) => {
            let beaconid = req.body.beaconid;
            let from = req.body.from;
            let to = req.body.to;

            let found = false;
            events.forEach((event) => {
                if (event.beaconid == beaconid) {
                    found = true;
                    event.priority = 10;
                    event.from = from;
                    event.to = to;
                    return res.json({ success: true });
                }
            });

            if (!found) {
                events.push({
                    priority: 10,
                    from: from,
                    to: to,
                    beaconid: beaconid
                });
                return res.json({ success: true });
            }
        },

        approaching: (req, res) => {
            let beaconid = req.body.beaconid;

            for (var key in events) {
                if (events[key].beaconid == beaconid) {
                    if (!moving.value) {
                        moving.value = true;
                    }
                    queue.push(events[key]);
                    queue = arrangeQueue(queue);
                    return res.json({ success: true });
                }
            }
            return res.status(400).json({ success: false , msg: "Beacon ID not in event list"});
        },

        testqueue: (req, res) => {
            for (var key in events) {
                queue.push(events[key]);
            }
            return res.json({ success: true });
        },

        testpriority: (req, res) => {
            for (var key in events) {
                queue.push(events[key]);
            }
            queue = arrangeQueue(queue);
            return res.json({ success: true });
        },
    };
};

