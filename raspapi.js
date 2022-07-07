require('dotenv').config();

const express = require('express');
const http = require('http');
const fs = require('fs');
const auth = require('basic-auth');
const bodyParser = require('body-parser');

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

// const Slimbot = require('slimbot');
// const slimbotEndpoints = require('./slimbot-endpoints.js');

const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req }) => {
            const token = req.headers.authorization || '';
            const correctAuth = `Basic ${new Buffer.from(
                process.env.API_USER + ':' + process.env.API_PASS,
                'utf-8'
            ).toString('base64')}`;

            if (token !== correctAuth)
                throw new AuthenticationError('you must be logged in');
            return {
                user: process.env.API_USER,
            };
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    //parsing
    app.use(
        bodyParser.json({
            type: '*/*',
        })
    );

    //authorization /api routes
    app.use('/api', function (req, res, next) {
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

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    await new Promise((resolve) =>
        httpServer.listen({ port: process.env.RASPAPI_PORT }, resolve)
    );
    console.log(
        `${new Date().toISOString()} raspapi listening at ${
            process.env.RASPAPI_PORT
        }`
    );
}

startApolloServer(typeDefs, resolvers);
