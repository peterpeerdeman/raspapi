const destiny = require('./resolvers/destiny.js');
const car = require('./resolvers/car.js');
const cluster = require('./resolvers/cluster.js');
const music = require('./resolvers/music.js');

module.exports = {
    Query: {
        hello: () => 'world',
        destiny: () => {
            return {
                clanmemberPresence: destiny.clanmemberPresence,
            };
        },
        car: () => {
            return {
                charge: car.charge,
            };
        },
        cluster: () => {
            return {
                portTable: cluster.portTable,
            };
        },
        music: () => {
            return {
                currentSong: music.currentsong,
            };
        },
    },
    Mutation: {
        cluster_scale: cluster.cluster_scale,
        music_control: music.music_control,
    },
};
