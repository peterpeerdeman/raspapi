import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

const typeDefs = `
type Light {
    id: ID!
    name: String
    status: Boolean
}

type Query {
   lights: [Light]
}
`;

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
export { schema };
