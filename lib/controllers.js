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
        }
    };
};

