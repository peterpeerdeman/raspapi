import {
  makeExecutableSchema,
} from 'graphql-tools';
import { resolvers } from './resolvers';

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

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
