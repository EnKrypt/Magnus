'use strict';

module.exports = function(events, queue, pi) {
    return {
        test: (req, res) => {
            res.send('Magnus is running');
        },

        getevents: (req, res) => {
            res.json(events);
        },

        getqueue: (req, res) => {
            res.json(queue);
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
                }
            });

            if (!found) {
               events.push({
                   priority: 10,
                   from: from,
                   to: to,
                   beaconid: beaconid
               });
            }
        },

        approaching: (req, res) => {
            let beaconid = req.body.beaconid;

            events.forEach((event) => {
                if (event.beaconid == beaconid) {
                    queue.push(event);
                    queue = arrangeQueue(queue);
                }
            });
        },
    };
};

