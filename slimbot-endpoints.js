const downloads = require('./modules/downloads');

module.exports.init = function(slimbot) {
    // slimbot.setMyCommands({
    //     commands: [{
    //         command: 'test',
    //         description: 'test2'
    //     }]
    // }).then((response) => {
    //     console.log(response);
    // });
    let authorized_chatids = new Set();

    function loggedIn(chatid) {
        return authorized_chatids.has(chatid);
    }

    function login(chatid) {
        authorized_chatids.add(chatid);
    }

    slimbot.on('message', message => {
        console.log(message);
        if (message.text == '/help') {
            return slimbot.getMyCommands().then(function(response) {
                console.log(response);
                return slimbot.sendMessage(message.chat.id, JSON.stringify(response.result));
            });
        }
        if (message.text == '/login') {
            return slimbot.sendMessage(message.chat.id, 'please supply login credentials with "/login user:password"');
            // login(message.chat.id);
        }
        if (message.text.match(/\/login (\S+:\S+)/)) {
            const matches = message.text.match(/\/login (\S+):(\S+)/);
            console.log(matches);
            if (matches[1] == process.env.API_USER && matches[2] == process.env.API_PASS) {
                login(message.chat.id);
                return slimbot.sendMessage(message.chat.id, 'loggedin');
            } else {
                return slimbot.sendMessage(message.chat.id, 'wrong credentials');
            }
        }

        // check login
        if (!loggedIn(message.chat.id)) {
            return slimbot.sendMessage(message.chat.id, 'please login first');
        };

        // loggedin messages
        if (message.text.match(/\/search \S+/)) {
            const matches = message.text.match(/\/search (\S+)/);
            return downloads.search(matches[1]).then(function (response) {
                const reply = `Search results for '${matches[1]}'\n\n`;
                const buttons = response.map(function(current) {
                    return [{
                        text: current.name,
                        url: `https://katcr.to/${current.url}`,
                    }];
                });
                console.log(buttons);
                return slimbot.sendMessage(message.chat.id, reply, {
                    // parse_mode: "html",
                    reply_to_message_id: message.message_id,
                    reply_markup: JSON.stringify({
                        inline_keyboard: buttons
                    })
                });
            });
        }
        if (message.text.match(/\/magnet \S+/)) {
            const matches = message.text.match(/\/magnet (\S+)/);
            return downloads.getmagnet(matches[1]).then(function (response) {
                const reply = `magnet: response.magnet`;
                return slimbot.sendMessage(message.chat.id, reply, {
                    parse_mode: "Markdown",
                    reply_to_message_id: message.message_id
                });
            });
        }
    });
};
