const destiny = require('../modules/destiny');

module.exports.clanmemberPresence = (parent, args, context, info) => {
    return destiny.getClanmemberPresence();
};
