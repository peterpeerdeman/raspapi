import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import InboxIcon from 'material-ui-icons/Inbox';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import MenuIcon from 'material-ui-icons/Menu';
import React, { Component } from 'react';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import LightsApp from './LightsApp';

class Root extends Component {
    constructor(props) {
        this.state = {
            open: false
        };
    }
    handleClose() {
        this.setState({ open: false });
    };
    handleOpen() {
        this.setState({ open: true });
    };
    render() {
        const listStyle = {
            width: 250,
            flex: 'initial'
        };

        return (
            <div className="Root">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="contrast" aria-label="Menu" onClick={this.handleOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Typography type="title" color="inherit">
                            RaspAPI
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    onClick={this.handleClose}
                >
                    <div>
                        <List disablePadding style={listStyle}>
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Lights" />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <LightsApp>
                </LightsApp>
            </div>
            );
    }
}

export default Root;
