const music = require('../modules/music');

module.exports.currentsong = async (parent, args, context, info) => {
    const result = await music.getCurrentSong();
    return result;
};

module.exports.command = async (parent, args, context, info) => {
    const result = await music.getCurrentSong();
    return result;
};

module.exports.music_control = async (parent, args, context, info) => {
    switch (args.command) {
        case 'PLAY':
            await music.play();
            return true;
        case 'PAUSE':
            await music.pause();
            return true;
        case 'STOP':
            await music.stop();
            return true;
        default:
            throw new Error('this command is not supported');
    }
};
