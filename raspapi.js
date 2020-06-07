require('dotenv').config();

const express = require('express');
const app = express();
const fs = require( 'fs' );
const auth = require('basic-auth');
const bodyParser = require('body-parser');

const destiny_resolver = require('./resolvers/destiny.js').default;

const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        hello: String
        destinyPresence: [DestinyPresence]
    }

    type DestinyPresence {
        name: String
        isOnline: Boolean
        timestamp: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'world',
        destinyPresence: destiny_resolver
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        return {
            myProperty: true
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
                    'Authorization': `Basic ${new Buffer.from(process.env.API_USER + ":" + process.env.API_PASS, 'utf-8').toString("base64")}`
                }
            },
        ],
    },
});

//parsing
app.use(bodyParser.json({
    type: '*/*'
}));

//authorization
app.use(function(req, res, next) {
    var credentials = auth(req);
    if (!credentials || credentials.name !== process.env.API_USER || credentials.pass !== process.env.API_PASS) {
        res.set({
            'WWW-Authenticate': 'Basic realm="simple-admin"'
        });
        res.sendStatus(401);
    } else {
        next();
    }
});

//pretty jsonresponses
app.use(function(req, res, next) {
    res.sendStatusJson = function (status) {
        res.status(status).send({status: status});
    };
    next();
});

//routes
routes = fs.readdirSync('./routes');
routes.forEach( function( routeFile ) {
    app.use('/api/' + routeFile, require('./routes/' + routeFile));
});

//graphql
server.applyMiddleware({ app });

//errorhandling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        error: "500"
    });
    next(err);
});

// hide h eaders
app.disable('x-powered-by');

app.listen({
    port: process.env.RASPAPI_PORT
}, () => {
    console.log(`${new Date().toISOString()} raspapi listening at ${process.env.RASPAPI_PORT}`);
});
