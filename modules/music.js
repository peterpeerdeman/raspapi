const mpdapi = require('mpd-api');

const config = {
    host: process.env.MPD_HOST,
    port: process.env.MPD_PORT,
};

module.exports.getStatus = async function () {
    const client = await mpdapi.connect(config);
    const status = await client.api.status.get();
    return status;
};

module.exports.getCurrentSong = async function () {
    const client = await mpdapi.connect(config);
    const currentsong = await client.api.status.currentsong();
    return currentsong;
};

module.exports.play = async function () {
    const client = await mpdapi.connect(config);
    const result = await client.api.playback.play();
    return result;
};

module.exports.next = async function () {
    const client = await mpdapi.connect(config);
    const result = await client.api.playback.next();
    return result;
};

module.exports.previous = async function () {
    const client = await mpdapi.connect(config);
    const result = await client.api.playback.previous();
    return result;
};

module.exports.pause = async function () {
    const client = await mpdapi.connect(config);
    const result = await client.api.playback.pause();
    return result;
};

module.exports.stop = async function () {
    const client = await mpdapi.connect(config);
    const result = await client.api.playback.stop();
    return result;
};
