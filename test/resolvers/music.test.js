const expect = require('chai').expect;
const nock = require('nock');
const { ApolloServer, gql } = require('apollo-server-express');

process.env.MPD_HOST = 'localhost';
process.env.MPD_PORT = 12345;

const typeDefs = require('../../typedefs');
const resolvers = require('../../resolvers');

describe('music resolver tests', () => {
    // it('has a functional music resolver', async () => {
    //     const testServer = new ApolloServer({
    //         typeDefs,
    //         resolvers,
    //     });
    //
    //     nock('http://localhost:12345').get('/').query(true).reply(200);
    //     const result = await testServer.executeOperation({
    //         query: gql`
    //             query {
    //                 music {
    //                     currentSong {
    //                         title
    //                         artist
    //                         duration
    //                         album
    //                     }
    //                 }
    //             }
    //         `,
    //     });
    //
    //     console.log(result);
    //     expect(typeof result).to.equal('object');
    //     expect(result.data.hello).to.equal('world');
    // });
});
