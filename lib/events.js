/**
 * Created by adithya on 2/18/17.
 */


// {
//     priority: <0-10>,
//     from: <floor>,
//     to: <floor>,
//     time: <seconds from now>,
//     beaconid: <proximity polling identifier>,
// }

module.exports = [
    {
        priority: 0,
        from: 2,
        to: 15,
        // time: 7000,
        beaconid: 1
    },
    {
        priority: 7,
        from: 8,
        to: 1,
        // time: 12000,
        beaconid: 2
    },
    {
        priority: 9,
        from: 9,
        to: 17,
        // time: 16000,
        beaconid: 3
    },
    {
        priority: 6,
        from: 0,
        to: 5,
        // time: 18000,
        beaconid: 4
    },
    {
        priority: 8,
        from: 15,
        to: 9,
        // time: 20000,
        beaconid: 5
    },
    {
        priority: 3,
        from: 10,
        to: 5,
        // time: 25000,
        beaconid: 6
    },
    {
        priority: 2,
        from: 2,
        to: 10,
        // time: 27000,
        beaconid: 7
    },
    {
        priority: 10,
        from: 2,
        to: 7,
        // time: 30000,
        beaconid: 8
    },
    {
        priority: 3,
        from: 5,
        to: 12,
        // time: 35000,
        beaconid: 9
    },
];

