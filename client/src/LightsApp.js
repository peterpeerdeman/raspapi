import React, { Component } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Switch, Paper } from 'material-ui';

import {
      ApolloClient,
      gql,
      graphql,
      ApolloProvider,
} from 'react-apollo';

const client = new ApolloClient();

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
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }
   return (
       <List>
            <ListItem>
                <ListItemText primary="Light 1" />
                <ListItemSecondaryAction>
                    <Switch
                        onClick={event => this.handleToggle(event, 'light1')}
                        checked={false}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </List>
   );
 };

const LightsListWithData = graphql(lightsListQuery)(LightsList);

class LightsApp extends Component {
    handleToggle() {
        return;
    }
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
