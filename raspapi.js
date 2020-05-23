require('dotenv').config();

const express = require('express');
const app = express();
const fs = require( 'fs' );
const auth = require('basic-auth');
const bodyParser = require('body-parser');

const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        books: [Book]
        hello: String
    }
`;

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const resolvers = {
    Query: {
            hello: () => 'world',
            books: () => books,
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
});

//parsing
app.use(bodyParser.json({
    type: '*/*'
}));

//authorization
// app.use(function(req, res, next) {
//     var credentials = auth(req);
//     if (!credentials || credentials.name !== process.env.API_USER || credentials.pass !== process.env.API_PASS) {
//         res.set({
//             'WWW-Authenticate': 'Basic realm="simple-admin"'
//         });
//         res.sendStatus(401);
//     } else {
//         next();
//     }
// });
//
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
