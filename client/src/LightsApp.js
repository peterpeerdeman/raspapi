import React, { Component } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Switch, Paper } from 'material-ui';

import {
      ApolloClient,
      gql,
      graphql,
      ApolloProvider,
} from 'react-apollo';

import {
    makeExecutableSchema,
    addMockFunctionsToSchema
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const client = new ApolloClient({
   networkInterface: mockNetworkInterface,
});

const lightsListQuery = gql`
   query LightListQuery {
     lights {
       id
       name
       status
     }
   }
 `;

const LightsList = ({ data: {loading, error, lights }}) => {
    this.handleToggle = () => {
        return;
    }
    if (loading) {
        return <p>Loading ...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    return (
        <List>
            { lights.map((light) => {
            return <ListItem>
                <ListItemText primary={light.name} />
                <ListItemSecondaryAction>
                    <Switch
                        onClick={event => this.handleToggle(light.status, light.id)}
                        checked={light.status}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            })}
        </List>
   );
 };

const LightsListWithData = graphql(lightsListQuery)(LightsList);

class LightsApp extends Component {
    render() {

        return (
            <ApolloProvider client={client}>
                <Grid container justify='center'>
                    <Grid item xs={12} md={6}>
                        <Paper style={{ padding: 20, marginTop: 20 }}>
                            <Typography type="headline" component="h3">
                                Lights
                            </Typography>
                            <LightsListWithData />
                        </Paper>
                    </Grid>
                </Grid>
            </ApolloProvider>
        );
    }
}

export default LightsApp;
