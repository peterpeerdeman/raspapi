export const typeDefs = `
type Light {
    id: ID!                # "!" denotes a required field
    name: String
    status: Boolean
}
# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
    type Query {
        lights: [Light]    # "[]" means this is a list of channels
    }
`;
