const music = require('../modules/music');

module.exports.currentsong = async (parent, args, context, info) => {
    const result = await music.getCurrentSong();
    return result;
};
