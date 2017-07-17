import React, { Component } from 'react';
import { Grid, Typography, List, ListItem, ListItemText, Paper } from 'material-ui';

class LightsApp extends Component {
    render() {
        return (
            <Grid container justify='center'>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: 20, marginTop: 20 }}>
                        <Typography type="headline" component="h3">
                            Lights
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}

export default LightsApp;
