require('dotenv').config();

const express = require('express');
const app = express();
const fs = require('fs');
const auth = require('basic-auth');
const bodyParser = require('body-parser');

const destiny = require('./resolvers/destiny.js');
const car = require('./resolvers/car.js');
const cluster = require('./resolvers/cluster.js');
const music = require('./resolvers/music.js');

const { ApolloServer, gql } = require('apollo-server-express');

// const Slimbot = require('slimbot');
// const slimbotEndpoints = require('./slimbot-endpoints.js');

const typeDefs = gql`
    type Query {
        hello: String
        destiny: Destiny
        car: Car
        cluster: Cluster
        music: Music
    }

    type Destiny {
        clanmemberPresence: [DestinyPresence]
    }

    type DestinyPresence {
        name: String
        isOnline: Boolean
        timestamp: String
    }

    type Car {
        charge: CarCharge
    }

    type CarCharge {
        batteryLevel: Int
        timestamp: String
    }

    type Cluster {
        portTable: [ClusterPort]
    }

    type ClusterPort {
        name: String
        up: Boolean
        port_poe: Boolean
        port_idx: Int
        poe_enable: Boolean
        poe_power: String
        poe_current: String
        poe_voltage: String
        portconf_id: String
    }

    type Music {
        currentSong: CurrentSong
    }
    type CurrentSong {
        name: String
        file: String
        last_modified: String
        artist: String
        albumartist: String
        title: String
        album: String
        track: Int
        date: String
        genre: String
        time: Int
        duration: Float
        pos: Int
        id: Int
    }
    enum MusicCommand {
        PLAY
        PAUSE
        NEXT
        PREVIOUS
        STOP
    }

    type Mutation {
        cluster_scale(instances: Int!): [ClusterPort]
        music_control(command: MusicCommand!): Boolean
    }
`;

const resolvers = {
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        return {
            myProperty: true,
        };
    },
    playground: {
        settings: {
            'editor.theme': 'light',
        },
        tabs: [
            {
                endpoint: process.env.API_GRAPHQL,
                query: 'query {\n  hello\n}',
                name: 'Raspapi',
                headers: {
                    Authorization: `Basic ${new Buffer.from(
                        process.env.API_USER + ':' + process.env.API_PASS,
                        'utf-8'
                    ).toString('base64')}`,
                },
            },
            {
                endpoint: process.env.API_GRAPHQL,

                query: gql`
                    mutation {
                        cluster_scale(instances: 2) {
                            name
                        }
                    }
                `,
                name: 'Raspapi cluster mutation unifi',
                headers: {
                    Authorization: `Basic ${new Buffer.from(
                        process.env.API_USER + ':' + process.env.API_PASS,
                        'utf-8'
                    ).toString('base64')}`,
                },
            },
            {
                endpoint: process.env.API_GRAPHQL,
                query: gql`
                    query {
                        cluster {
                            portTable {
                                poe_power
                                poe_enable
                            }
                        }
                    }
                `,
                name: 'Raspapi cluster query',
                headers: {
                    Authorization: `Basic ${new Buffer.from(
                        process.env.API_USER + ':' + process.env.API_PASS,
                        'utf-8'
                    ).toString('base64')}`,
                },
            },
        ],
    },
});

//parsing
app.use(
    bodyParser.json({
        type: '*/*',
    })
);

//authorization
app.use(function (req, res, next) {
    var credentials = auth(req);
    if (
        !credentials ||
        credentials.name !== process.env.API_USER ||
        credentials.pass !== process.env.API_PASS
    ) {
        res.set({
            'WWW-Authenticate': 'Basic realm="simple-admin"',
        });
        res.sendStatus(401);
    } else {
        next();
    }
});

//pretty jsonresponses
app.use(function (req, res, next) {
    res.sendStatusJson = function (status) {
        res.status(status).send({ status: status });
    };
    next();
});

//routes
routes = fs.readdirSync('./routes');
routes.forEach(function (routeFile) {
    app.use('/api/' + routeFile, require('./routes/' + routeFile));
});

//graphql
server.applyMiddleware({ app });

//errorhandling
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        error: '500',
    });
    next(err);
});

// const slimbot = new Slimbot(process.env['TELEGRAM_BOT_TOKEN']);
// slimbotEndpoints.init(slimbot);
// slimbot.startPolling();

// hide h eaders
app.disable('x-powered-by');
app.listen(
    {
        port: process.env.RASPAPI_PORT,
    },
    () => {
        console.log(
            `${new Date().toISOString()} raspapi listening at ${
                process.env.RASPAPI_PORT
            }`
        );
    }
);
