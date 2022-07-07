const expect = require('chai').expect;
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('../../typedefs');
const resolvers = require('../../resolvers');

describe('raspapi apollo server tests', () => {
    it('has a functional hello world resolver', async () => {
        const testServer = new ApolloServer({
            typeDefs,
            resolvers,
        });

        const result = await testServer.executeOperation({
            query: 'query { hello }',
        });

        expect(typeof result).to.equal('object');
        expect(result.data.hello).to.equal('world');
    });
});
